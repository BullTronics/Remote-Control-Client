import React from 'react';
import { useContext } from "react";

import {
  SafeAreaView,
  useColorScheme,
  View,
  TextInput,
  Text,
  Button,
  Alert,
} from 'react-native';
import {Modal, ActivityIndicator, TouchableOpacity, Image, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SocketContext } from "./../services/SocketContext";

import {connectToServer, disconnectServer, isConnected} from './../services/SocketHandler';

import {storeConfigData, loadConfigData} from './../services/Util';

var initVar;
function headerBar(setShowSpinner) {
  const isDarkMode = useColorScheme() === 'dark';
  const { ws, setWs } = useContext(SocketContext);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={{padding: 5, paddingRight: 20, width: '100%', backgroundColor: !isDarkMode ? 'rgba(0,100,200,0.4)' : 'rgba(255,255,255,0.1)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{padding: 5, flexDirection: 'row', alignItems:'center' }}>
          <Image source={require('./../images/logo.png')} style={{width: 40, height: 40}}/>
        </View>
        <View style={{padding: 5, flexDirection: 'column', alignItems:'flex-end' }}>
          {ws !== null ? 
              <TouchableOpacity onPress={() => {
                setShowSpinner(true);
                disconnectServer(ws, setWs, () => {
                  setShowSpinner(false);
                }, ()=>{
                  setShowSpinner(false);
                });
              }} style={{ padding: 5}}>
                <Icon name={'link'} size={30} color={'green'} />
              </TouchableOpacity> 
            : 
              <TouchableOpacity onPress={() => {
                setShowSpinner(true);
                connectToServer(ws, setWs, () => {
                  setShowSpinner(false);
                 }, ()=>{
                  setShowSpinner(false);
                });
              }} style={{ padding: 5}}>
                <Icon name={'unlink'} size={30} color={'red'} />
              </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
}

function loadingModal() {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={true}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Connecting...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: "#808080"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export function ConfigPage({ navigation }) {
  const [host, onChangeHost] = React.useState(global.host);
  const [port, onChangePort] = React.useState(global.port);
  const [token, onChangeToken] = React.useState(global.token);
  const [showSpinner, setShowSpinner] = React.useState(false);

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
      {showSpinner === true ? loadingModal() : null}
      {headerBar(setShowSpinner)}
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