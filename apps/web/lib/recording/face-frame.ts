



export interface FaceFrame {
    width : number ,
    height : number ,
    borderRadius : number,

    x: number , 
    y : number ,

}


export const FACE_FRAME_MIN_WIDTH = 0.01 ;
export const FACE_FRAME_MAX_WIDTH = 1;
export const FACE_FRAME_MIN_HEIGHT = 0.01;
export const FACE_FRAME_MAX_HEIGHT = 1;


export const FACE_FRAME_NUDGE_STEP = 0.025;


export const  DEFAULT_FACE_FRAME : FaceFrame = {
    width : 220 /1920,
    height : 220 / 1000,
    borderRadius : 1 ,
    x: (1920 -48 - 110)/1920,
    y : (1080 - 48 - 110 )  / 1080
 }


export interface FrameRect {
    x : number , 
    y : number,
    w : number ,
    h : number 
}


function clampWidth (width : number ) : number {
    return Math.min(FACE_FRAME_MAX_WIDTH , Math.max(FACE_FRAME_MIN_WIDTH , width))
}

function clampHeight(height: number): number {
  return Math.min(FACE_FRAME_MAX_HEIGHT, Math.max(FACE_FRAME_MIN_HEIGHT, height));
}

function clampBorderRadius(radius: number): number {
  return Math.min(1, Math.max(0, radius));
}


