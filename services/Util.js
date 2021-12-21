import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadConfigData() {
    global.brand = {
        title: "BullTronics",
        url: {
            home: "https://BullTronics.com",
            privacy: "https://BullTronics.com/privacy-policy.html"
        }
    }

    try {
        let host = await AsyncStorage.getItem('host');
        let port = await AsyncStorage.getItem('port');
        let token = await AsyncStorage.getItem('token');
        if(host === null || port === null || token === null || host == "" || port == "" || token == "") {
            global.host = "10.0.2.2";
            global.port = "8080";
            global.token = "12345";
        } else {
            global.host = host;
            global.port = port;
            global.token = token;
        }

        console.log(`Config Data Loaded`);
        console.log(`host: ${host}, global.host: ${global.host}`);
        console.log(`port: ${port}, global.port: ${global.port}`);
        console.log(`token: ${token}, global.token: ${global.token}`);
        return;
    } catch (error) {
        console.error(error);
    }
}

export async function storeConfigData(host, port, token) {
    try {
        await AsyncStorage.setItem('host', host);
        await AsyncStorage.setItem('port', port);
        await AsyncStorage.setItem('token', token);
        global.host = host;
        global.port = port;
        global.token = token;

        console.log("Config Data Stored");
        console.log(`host: ${host}, global.host: ${global.host}`);
        console.log(`port: ${port}, global.port: ${global.port}`);
        console.log(`token: ${token}, global.token: ${global.token}`);
        return;
    } catch (error) {
        console.error(error);
    }
}
