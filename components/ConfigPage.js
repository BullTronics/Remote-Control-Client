import React from 'react';

import {
  SafeAreaView,
  useColorScheme,
  View,
  TextInput,
  Text,
  Button,
  Alert,
} from 'react-native';

import {storeConfigData, loadConfigData} from './../services/Util';

var initVar;
export function ConfigPage({ navigation }) {
  const [host, onChangeHost] = React.useState(global.host);
  const [port, onChangePort] = React.useState(global.port);
  const [token, onChangeToken] = React.useState(global.token);

  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(()=>{
    loadConfigData().then(()=>{
      onChangeHost(global.host);
      onChangePort(global.port);
      onChangeToken(global.token);
    });
  }, [initVar]);

  return (
    <SafeAreaView>
      <View
        style={{height: '100%'}}>
        <View
          style={{
            margin: '5%'
          }}>
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Hostname:</Text>
          <TextInput
            onChangeText={onChangeHost}
            value={host}
            style={{
              backgroundColor: isDarkMode ? 'white' : 'gray',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
              color: !isDarkMode ? 'white' : 'black'
            }}
          />
          
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Port:</Text>
          <TextInput
            onChangeText={onChangePort}
            value={port}
            style={{
              backgroundColor: isDarkMode ? 'white' : 'gray',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
              color: !isDarkMode ? 'white' : 'black'
            }}
          />
          
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Token:</Text>
          <TextInput
            onChangeText={onChangeToken}
            value={token}
            style={{
              backgroundColor: isDarkMode ? 'white' : 'gray',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
              color: !isDarkMode ? 'white' : 'black'
            }}
          />
        </View>

        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Button onPress={()=>{
              storeConfigData(host, port, token).then(Alert.alert("Remote Control", "Hostname, Port and Token Stored"));
            }} title="Save"/>
        </View>
      </View>
    </SafeAreaView>
  );
}