import { ToastAndroid } from 'react-native';
import {requestDispatcher} from './Controller';

export async function muteSystem() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"VolumeControl","action":"MUTE"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function unmuteSystem() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"VolumeControl","action":"UNMUTE"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function setVolume(level) {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"VolumeControl","action":"SET_VOLUME","data":{"level":level}});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function getVolume() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"VolumeControl","action":"STATUS"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 3);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}
