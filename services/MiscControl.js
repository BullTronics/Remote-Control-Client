import {sendMessage} from './SocketHandler';

export function startRandomCursorMove(ws, delayInSecond, durationInMinute, stepInMiliSecond, pauseInSecond) {
    console.log(`delayInSecond: ${delayInSecond}, durationInMinute: ${durationInMinute}, stepInMiliSecond: ${stepInMiliSecond}, pauseInSecond: ${pauseInSecond}`);
    let msg = [
        {
            "seqNum": 1,
            "action":"CURSOR_RANDOM_MOVE_START",
            "data": {
                "delay": parseInt(delayInSecond * 1000),
                "duration": parseInt(durationInMinute * 60 * 1000),
                "step": parseInt(stepInMiliSecond),
                "pause": parseInt(pauseInSecond * 1000)
            }
        }
    ];
    sendMessage(ws, JSON.stringify(msg));
}

export function stopRandomCursorMove(ws) {
    let msg = [
        {
            "seqNum": 1,
            "action":"CURSOR_RANDOM_MOVE_STOP",
            "data": {
            }
        }
    ];
    sendMessage(ws, JSON.stringify(msg));
}
