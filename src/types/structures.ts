import {Application, Graphics, Rectangle, Renderer} from "pixi.js";
import {ICircle, IRectangle, IRectangleSize, ISprite, ISpriteData} from "./figures";

export interface IHandleGame {
    isGameStarted: boolean,
    startGame: () => void,
    endGame: () => void,
    score: number
}

export interface IHandleGraphics {
    createCircle: (circleData: ICircle) => Graphics,
    createRectangle: (rectangleData: IRectangle) => Graphics,
    createSprite: (spriteData: ISpriteData) => Promise<ISprite>,
    createCircleBounds: (circleBoundsPadding: number, app: Application<Renderer<HTMLCanvasElement>>) => Rectangle,
    rotateFigure: (figure: ISprite, figureBounds: Rectangle, avoidingObject?: IRectangleSize) => void
}