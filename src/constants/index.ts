import {ISmallBall, IRectangle, IRectangleSize, ISpriteData} from "../types/figures";

export const MAIN_HERO: ISpriteData = {
    x: 100,
    y: 100,
    textureLink: 'https://pixijs.com/assets/bunny.png',
    cursor: 'pointer',
    anchor: 0.5,
    scale: 3,
    radius: 50
}

export const BALL_SPRITE: ISpriteData = {
    x: 0,
    y: 0,
    textureLink: 'https://pixijs.com/assets/rt_object_06.png',
    cursor: 'pointer',
    anchor: 0.5,
    scale: .4,
    radius: 20
}

export const SMALL_BALL: ISmallBall = {
    radius: 20,
    color: 'rgb(255,255,255)',
    strokeColor: '#BBE9FF',
    strokeWidth: 1
}

export const YARD_SIZE: IRectangleSize = {
    x: window.innerWidth - 300,
    y: window.innerHeight - 250,
    offsetX: window.innerWidth - 300,
    offsetY: window.innerHeight - 250,
    height: 200,
    width: 250,
}

export const YARD: IRectangle = {
    ...YARD_SIZE,
    color: '#F9D689',
    strokeColor: '#F5E7B2',
    strokeWidth: 2
}

export const MAX_NUMBER_OF_BALLS: number = 20
export const MIN_NUMBER_OF_BALLS: number = 10
export const MAIN_BG_COLOR: string = '#81A263'
export const MAX_CATCHED: number = 5