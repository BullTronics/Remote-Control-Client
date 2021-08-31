import { ToastAndroid } from 'react-native';
import {requestDispatcher} from './Controller';

export async function startRandomCursorMove(smoothMoveFlag) {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MiscControl","action":"RANDOM_CURSOR_MOVE_START", "data":{smoothMoveFlag}});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function stopRandomCursorMove() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MiscControl","action":"RANDOM_CURSOR_MOVE_STOP"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 3);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}
