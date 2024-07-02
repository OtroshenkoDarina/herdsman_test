import {IRectangleSize} from "../types/figures";
import {Bounds, Graphics, Sprite} from "pixi.js";

export const generateRandomNumber = (max: number, min: number): number => {
    return Math.floor(Math.random() * max) + min
}

export const isOverlapping = (x1: number, y1: number, x2: number, y2: number, radius1: number, radius2: number): boolean => {
    const distance: number = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < radius1 + radius2;
};

export const isCircleOverlappingRectangle = (cx: number, cy: number, radius: number, rectangle: IRectangleSize): boolean => {
    const closestX: number = Math.max(rectangle.x, Math.min(cx, rectangle.x + rectangle.width));
    const closestY: number = Math.max(rectangle.y, Math.min(cy, rectangle.y + rectangle.height));
    const distance: number = Math.sqrt((cx - closestX) ** 2 + (cy - closestY) ** 2);
    return distance < radius;
};

export function isOverlappingGraphics(object1: Graphics | Sprite, object2: Graphics | Sprite): boolean {
    const bounds1: Bounds = object1.getBounds();
    const bounds2: Bounds = object2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}