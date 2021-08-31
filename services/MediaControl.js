import { ToastAndroid } from 'react-native';
import {requestDispatcher} from './Controller';

export async function pauseMedia() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MediaControl","action":"PAUSE"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function playMedia() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MediaControl","action":"PLAY"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function nextMedia() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MediaControl","action":"NEXT"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function previousMedia() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MediaControl","action":"PREVIOUS"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function volumeIncrease() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MediaControl","action":"VOLUME_INC"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}

export async function volumeDecrease() {
    try {
        let jsonResponse = await requestDispatcher({"timestamp":new Date().getTime(),"command":"MediaControl","action":"VOLUME_DEC"});
        console.log("response: ", jsonResponse);
        ToastAndroid.show(jsonResponse.message, 2);
        return jsonResponse.data;
    } catch (error) {
        return {volume: 0, isMute: false};
    }
}
