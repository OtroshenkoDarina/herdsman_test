import {Sprite} from "pixi.js";

export interface ICircle {
    x: number
    y: number
    radius: number
    color: string
    strokeColor: string
    strokeWidth: number
}

export interface IRectangleSize {
    x: number
    y: number
    offsetX: number
    offsetY: number
    height: number
    width: number
}

export interface IRectangle extends IRectangleSize {
    color: string,
    strokeColor: string,
    strokeWidth: number
}

export interface ISmallBall {
    radius: number
    color: string
    strokeColor: string
    strokeWidth: number
}


export interface ISpriteData {
    x: number
    y: number
    textureLink: string
    cursor: string
    anchor: number
    scale: number
    radius: number
}

export interface ICoordinates {
    x: number,
    y: number
}

export interface ICatchedObject {
    item: Sprite,
    offset: ICoordinates
}

export interface ISprite extends Sprite {
    direction?: number,
    speed?: number
}