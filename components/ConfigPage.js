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

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {storeConfigData, loadConfigData} from './../services/Util';

var initVar;
export function ConfigPage({ navigation }) {
  const [host, onChangeHost] = React.useState(global.host);
  const [port, onChangePort] = React.useState(global.port);
  const [secret, onChangeSecret] = React.useState(global.secret);

  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(()=>{
    loadConfigData().then(()=>{
      onChangeHost(global.host);
      onChangePort(global.port);
      onChangeSecret(global.secret);
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
              backgroundColor: 'black',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
              marginBottom: 20
            }}
          />
          
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Port:</Text>
          <TextInput
            onChangeText={onChangePort}
            value={port}
            style={{
              backgroundColor: 'black',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
            }}
          />
          
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Secret:</Text>
          <TextInput
            onChangeText={onChangeSecret}
            value={secret}
            style={{
              backgroundColor: 'black',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
            }}
          />
        </View>

        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Button onPress={()=>{
              storeConfigData(host, port, secret).then(Alert.alert("Remote Control", "Hostname, Port and Secret Stored"));
            }} title="Save"/>
        </View>
      </View>
    </SafeAreaView>
  );
}