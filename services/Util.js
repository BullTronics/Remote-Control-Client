import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadConfigData() {
    try {
        let host = await AsyncStorage.getItem('host');
        let port = await AsyncStorage.getItem('port');
        let secret = await AsyncStorage.getItem('secret');
        if(host == null || port == null || host == "" || port == "") {
            global.host = "10.0.2.2";
            global.port = "33986";
            global.secret = "a4e1112f45e84f785358bb86ba750f48";
        } else {
            global.host = host;
            global.port = port;
            global.secret = secret;
        }

        console.log(`Config Data Loaded`);
        console.log(`host: ${host}, global.host: ${global.host}`);
        console.log(`port: ${port}, global.port: ${global.port}`);
        console.log(`secret: ${secret}, global.secret: ${global.secret}`);
        return;
    } catch (error) {
        console.error(error);
    }
}

export async function storeConfigData(host, port, secret) {
    let aesKey = secret;
    while(aesKey.length !== 32) {
        if(aesKey.length < 32) {
            aesKey = "f" + aesKey;
        } else {
            aesKey = aesKey.slice(0, aesKey.length - 1);
        }
    }
    try {
        await AsyncStorage.setItem('host', host);
        await AsyncStorage.setItem('port', port);
        await AsyncStorage.setItem('secret', aesKey);
        global.host = host;
        global.port = port;
        global.secret = aesKey;

        console.log("Config Data Stored");
        console.log(`host: ${host}, global.host: ${global.host}`);
        console.log(`port: ${port}, global.port: ${global.port}`);
        console.log(`secret: ${secret}, aesKey: ${aesKey}, global.secret: ${global.secret}`);
        return;
    } catch (error) {
        console.error(error);
    }
}
