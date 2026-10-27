import { captureRejectionSymbol } from "events";


export interface CaputreStream {
    screenStream: MediaStream

    webcamStream : MediaStream | null;

    micStream : MediaStream | null
}





export async function startCapture () : Promise<CaputreStream> {
    if (typeof  navigator.mediaDevices?.getDisplayMedia !== "function"){
        throw new Error (
            "Screen recording isnt supported on this browser or device. Try a different browser like chrome or Edge"
        )

    }


    const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video : {frameRate : 30, displaySurface : "monitor"}
    })



    let webcamStream : MediaStream | null = null;
    let micStream : MediaStream | null = null ;

    try {
        const combined = await navigator.mediaDevices.getUserMedia({
            video : { width :  400, height : 400}
        })
    
        webcamStream = new  MediaStream(combined.getVideoTracks())
        micStream = new MediaStream(combined.getAudioTracks())
    }
    catch {

    }

    return {screenStream, webcamStream ,  micStream}
}




export async function  stopStream(stream : MediaStream  | null |undefined  )    {
    stream?.getTracks().forEach((track) =>  track.stop())
} 