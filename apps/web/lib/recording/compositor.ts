


export interface ScreenCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}


export interface CompositorOptions {
    width :  number ,  
    height : number
}


const NO_CROP : ScreenCrop  =  {top : 0, bottom : 0 , left  : 0 , right : 0}

const TARGET_FPS = 30;


const FRAME_MARGIN = 0.06
const FRAME_RADIUS  = 0.025




function tickerWorkerSource(intervalMs: number): string {
  return `
    let id = null;
    self.onmessage = (e) => {
      if (e.data === "start") {
        if (id !== null) return;
        id = setInterval(() => self.postMessage("tick"), ${intervalMs});
      } else if (e.data === "stop") {
        if (id !== null) { clearInterval(id); id = null; }
      }
    };
  `;
}


