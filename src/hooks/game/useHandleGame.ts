import {useRef, useState} from "react";
import {Application, Graphics, Renderer, Sprite} from "pixi.js";
import {
    BALL_SPRITE,
    MAIN_BG_COLOR, MAIN_HERO, MAX_CATCHED, MAX_NUMBER_OF_BALLS, MIN_NUMBER_OF_BALLS, SMALL_BALL, YARD, YARD_SIZE,
} from "../../constants";
import {generateRandomNumber, isCircleOverlappingRectangle, isOverlapping, isOverlappingGraphics} from "../../utils";
import {ICatchedObject, ICoordinates, ISprite} from "../../types/figures";
import {IHandleGraphics} from "../../types/structures";
import useHandleGraphics from "../graphics/useHandleGraphics";

const useHandleGame = () => {
        const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
        const [score, setScore] = useState<number>(0)

        const intervalRef = useRef<NodeJS.Timeout | null>(null);
        const handleGraphics: IHandleGraphics = useHandleGraphics()

        const circlesGraphicsData: ISprite[] = []
        const catched: ICatchedObject[] = []
        let dragTarget: Sprite | null = null;
        let app: Application<Renderer<HTMLCanvasElement>>
        let rectangle: Graphics
        let bunny: Sprite

        async function startGame() {
            app = new Application();

            await app.init({
                background: MAIN_BG_COLOR,
                resizeTo: window,
                eventMode: 'passive', eventFeatures: {
                    move: true,
                    globalMove: false,
                    click: true,
                    wheel: true,
                }
            })

            app.stage.eventMode = 'static';
            app.stage.hitArea = app.screen;
            app.stage.on('pointerup', onDragEnd);
            app.stage.on('pointerupoutside', onDragEnd);
            app.stage.on('pointerdown', onClickMove);

            const parent: HTMLElement | null = document.getElementById('canvas_container')
            parent?.appendChild(app.canvas);

            rectangle = handleGraphics.createRectangle(YARD)
            app?.stage.addChild(rectangle);

            bunny = await handleGraphics.createSprite(MAIN_HERO)
            bunny.eventMode = 'static';
            bunny.on('pointerdown', onDragStart, bunny);
            app.stage.addChild(bunny);

            const circlesData = createCirclesData()

            for (const {x, y} of circlesData) {
                const circle = await handleGraphics.createSprite({...BALL_SPRITE, x, y})
                circlesGraphicsData.push(circle)
                circle.direction = Math.random() * Math.PI * 2;
                circle.speed = 2 + Math.random() * 2;

                app.stage.addChild(circle);
            }

            const circleBounds = handleGraphics.createCircleBounds(100, app)

            app.ticker.add(() => {
                for (let i = 0; i < circlesGraphicsData.length; i++) {
                    handleGraphics.rotateFigure(circlesGraphicsData[i], circleBounds, YARD_SIZE)
                }
            });

            intervalRef.current = setInterval(addNewCircle, generateRandomNumber(3000, 1000));

            setIsGameStarted(true)
        }

        const createCirclesData = () => {
            const circlesData: ICoordinates[] = []

            for (let i: number = 0; i < generateRandomNumber(MAX_NUMBER_OF_BALLS, MIN_NUMBER_OF_BALLS); i++) {
                let x: number, y: number;
                let overlap: boolean;
                do {
                    overlap = false;

                    x = Math.random() * window.innerWidth;
                    y = Math.random() * window.innerHeight;

                    if (isOverlapping(x, y, MAIN_HERO.x, MAIN_HERO.y, SMALL_BALL.radius, MAIN_HERO.radius)) {
                        overlap = true;
                        continue;
                    }

                    if (isCircleOverlappingRectangle(x, y, SMALL_BALL.radius, YARD_SIZE)) {
                        overlap = true;
                        continue;
                    }

                    for (let j: number = 0; j < circlesData.length; j++) {
                        const {x: cx, y: cy} = circlesData[j];
                        if (isOverlapping(x, y, cx, cy, SMALL_BALL.radius, SMALL_BALL.radius)) {
                            overlap = true;
                            break;
                        }
                    }
                } while (overlap);

                circlesData.push({x, y});
            }

            return circlesData
        }

        const addNewCircle = async () => {
            if (app) {
                let x: number, y: number;
                let overlap: boolean;
                do {
                    overlap = false;
                    x = Math.random() * window.innerWidth;
                    y = Math.random() * window.innerHeight;

                    if (isCircleOverlappingRectangle(x, y, SMALL_BALL.radius, YARD_SIZE)) {
                        overlap = true;
                    }
                } while (overlap);

                const circle = await handleGraphics.createSprite({...BALL_SPRITE, x, y})
                circlesGraphicsData.push(circle)
                circle.direction = Math.random() * Math.PI * 2;
                circle.speed = 2 + Math.random() * 2;
                app.stage.addChild(circle);
            }
        };

        function onDragEnd(): void {
            if (dragTarget) {
                app.stage.off('pointermove', onDragMove);
                dragTarget.alpha = 1;
                dragTarget = null;
            }
        }

        function onDragMove(event: { global: ICoordinates }): void {
            if (dragTarget) {
                dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);

                catched.forEach(({item, offset}) => {
                    item.position.set(
                        dragTarget!.position.x + offset.x,
                        dragTarget!.position.y + offset.y
                    );
                });

                catchBall(dragTarget)
                checkBallInYard()
            }
        }

        function onDragStart(this: Sprite): void {
            this.alpha = 0.5;
            dragTarget = this;
            app.stage.on('pointermove', onDragMove);
        }

        function onClickMove(event: { global: ICoordinates }): void {
            const {x, y} = event.global;
            const dx = x - bunny.x;
            const dy = y - bunny.y;

            bunny.position.set(x, y);

            catched.forEach(({item}) => {
                item.position.set(
                    item.position.x + dx,
                    item.position.y + dy
                );
            });

            catchBall(bunny)
            checkBallInYard()
        }

        function catchBall(mainHeroSprite: Sprite) {
            if (catched?.length < MAX_CATCHED) {
                const nearCircles: Sprite[] = circlesGraphicsData?.filter((item: Sprite) => isOverlappingGraphics(mainHeroSprite, item))

                if (nearCircles?.length && !catched.some(({item}) => item === nearCircles[0])) {
                    const newCircle: Sprite = nearCircles[0];
                    const offset: ICoordinates = {
                        x: newCircle.x - mainHeroSprite.x,
                        y: newCircle.y - mainHeroSprite.y
                    };
                    catched.push({item: newCircle, offset});
                    circlesGraphicsData.splice(circlesGraphicsData.indexOf(newCircle), 1);
                }
            }
        }

        function checkBallInYard() {
            catched.forEach(({item}, index) => {
                if (isOverlappingGraphics(item, rectangle)) {
                    app.stage.removeChild(item);
                    catched.splice(index, 1);
                    setScore(prevScore => prevScore + 1);
                }
            });
        }

        const endGame = () => {
            setIsGameStarted(false)
            setScore(0)
            app?.destroy({removeView: true})
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return {isGameStarted, startGame, endGame, score}

    }
;

export default useHandleGame;