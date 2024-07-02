import {Application, Assets, Graphics, Rectangle, Renderer, Sprite, Texture} from "pixi.js";
import {ICircle, IRectangle, IRectangleSize, ISprite, ISpriteData} from "../../types/figures";

const useHandleGraphics = () => {

    const createCircle = (circleData: ICircle): Graphics => {
        const {
            x,
            y,
            radius,
            color,
            strokeColor,
            strokeWidth
        } = circleData

        const circle: Graphics = new Graphics();
        circle.circle(x, y, radius);
        circle.fill(color, 1)
        circle.stroke({width: strokeWidth, color: strokeColor});
        return circle;
    };

    const createRectangle = (rectangleData: IRectangle): Graphics => {
        const {
            x,
            y,
            width,
            height,
            color,
            strokeColor,
            strokeWidth
        } = rectangleData

        const rectangle: Graphics = new Graphics();
        rectangle.rect(x, y, width, height);
        rectangle.fill(color);
        rectangle.stroke({width: strokeWidth, color: strokeColor});

        return rectangle
    }

    const createSprite = async (spriteData: ISpriteData): Promise<ISprite> => {
        const {
            textureLink,
            y,
            x,
            cursor,
            anchor,
            scale
        } = spriteData

        const texture: Texture = await Assets.load(textureLink);
        const sprite: Sprite = new Sprite(texture);

        sprite.cursor = cursor;
        sprite.anchor.set(anchor);
        sprite.scale.set(scale);
        sprite.x = x;
        sprite.y = y;

        return sprite
    }

    const createCircleBounds = (circleBoundsPadding: number, app: Application<Renderer<HTMLCanvasElement>>): Rectangle => {
        return new Rectangle(
            -circleBoundsPadding,
            -circleBoundsPadding,
            app.screen.width + circleBoundsPadding * 2,
            app.screen.height + circleBoundsPadding * 2,
        );
    }

    const rotateFigure = (figure: ISprite, figureBounds: Rectangle, avoidingObject?: IRectangleSize): void => {
        figure.direction! += figure.speed! * 0.01;
        figure.x += Math.sin(figure.direction!) * figure.speed!;
        figure.y += Math.cos(figure.direction!) * figure.speed!;


        if (avoidingObject) {
            const dx = figure.x - Math.max(avoidingObject.x, Math.min(figure.x, avoidingObject.x + avoidingObject.width));
            const dy = figure.y - Math.max(avoidingObject.y, Math.min(figure.y, avoidingObject.y + avoidingObject.height));
            if ((dx * dx + dy * dy) < (40 * 40)) {
                const angle = Math.atan2(dy, dx);
                const dist = 40 - Math.sqrt(dx * dx + dy * dy);
                figure.x += dist * Math.cos(angle);
                figure.y += dist * Math.sin(angle);
            }
        }

        if (figure.x < figureBounds.x) {
            figure.x += figureBounds.width;
        } else if (figure.x > figureBounds.x + figureBounds.width) {
            figure.x -= figureBounds.width;
        }

        if (figure.y < figureBounds.y) {
            figure.y += figureBounds.height;
        } else if (figure.y > figureBounds.y + figureBounds.height) {
            figure.y -= figureBounds.height;
        }
    }

    return {
        createCircle,
        createRectangle,
        createSprite,
        createCircleBounds,
        rotateFigure
    }
};

export default useHandleGraphics;