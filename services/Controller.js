var CryptoJS = require("crypto-js");

var iv = CryptoJS.enc.Hex.parse("");

const encryptData = (text) => {
    var key = CryptoJS.enc.Utf8.parse(global.secret);
    return CryptoJS.AES.encrypt(text, key, {iv: iv, mode: CryptoJS.mode.ECB});
}

export const requestDispatcher = (requestObject) => {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 2000, 'Request timed out');
    });

    let url = `http://${global.host}:${global.port}/Command`;
    let requestObjectStr = JSON.stringify(requestObject);
    let signature = encryptData(requestObjectStr);

    console.log(`requestObjectStr: ${requestObjectStr}`);
    console.log(`signature: ${signature}`);

    const request = fetch(url, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        'signature': signature,
                                    },
                                    body: requestObjectStr
                                });

    return Promise.race([timeout, request])
                    .then(response => response.json())
                    .catch(error => alert('Either Server is not reachable or is not Responding.' + error));
}
