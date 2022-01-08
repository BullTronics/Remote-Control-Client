export function connectToServer(ws, setWs, onSuccessCallbackFunction, onErrorCallbackFunction) {
    if(ws !== null) {
        return;
    }
    
    let url = `ws://${global.host}:${global.port}/handler?token=${global.token}`;
    let websocket = new WebSocket(url);
    setWs(websocket);

    websocket.onopen = () => {
        let message = "Server Connected";
        console.log(message);
        onSuccessCallbackFunction();
    };

    websocket.onmessage = (e) => {
        let message = e.data;
        //alert(message);
        console.log(message);
    };

    websocket.onerror = (e) => {
        // an error occurred
        alert(e.message);
        console.log("Error: ", e.message);
        onErrorCallbackFunction();
    };
    websocket.onclose = (e) => {
        // connection closed
        console.log("Closed: ", e.code, e.reason);
        setWs(null);
    };
}

export function sendMessage(ws, message) {
    if(ws == null) {
        alert("Server not connected");
        return;
    }
    ws.send(message);
}

export function disconnectServer(ws, setWs, onSuccessCallbackFunction, onErrorCallbackFunction) {
    if(ws !== null) {
        ws.close();
        ws = null;
        setWs(null);
    }
    onSuccessCallbackFunction();
}

export function isConnected(ws, setWs) {
    console.log(`SocketHandler.isConnected() -> `, ws);
    if(ws == null) {
        return false;
    } else {
        return true;
    }
}
