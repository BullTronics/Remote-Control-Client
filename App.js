import React from 'react';
import { useContext } from "react";

import {Modal, useColorScheme, Text, View, ActivityIndicator, TouchableOpacity, Button, Image, StyleSheet, TextInput} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import SplashScreen from 'react-native-splash-screen';

import { ConfigPage } from './components/ConfigPage';

import {connectToServer, disconnectServer, isConnected} from './services/SocketHandler';

import { SocketContext } from "./services/SocketContext";

import {stopRandomCursorMove, startRandomCursorMove} from './services/MiscControl';
import { pressKey, notSupported } from './services/MediaControl';

import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';

const Tab = createBottomTabNavigator();

function headerBar(setShowSpinner) {
  const isDarkMode = useColorScheme() === 'dark';
  const { ws, setWs } = useContext(SocketContext);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={{padding: 5, paddingRight: 20, width: '100%', backgroundColor: !isDarkMode ? 'rgba(0,100,200,0.4)' : 'rgba(255,255,255,0.1)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{padding: 5, flexDirection: 'row', alignItems:'center' }}>
          <Image source={require('./images/logo.png')} style={{width: 40, height: 40}}/>
        </View>
        <View style={{padding: 5, flexDirection: 'column', alignItems:'flex-end' }}>
          {ws !== null ? 
              <TouchableOpacity onPress={() => {
                setShowSpinner(true);
                disconnectServer(ws, setWs, () => {
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

function HomeScreen() {
  const { ws, setWs } = useContext(SocketContext);
  const [showSpinner, setShowSpinner] = React.useState(false);
  return (
    <View style={{height: '100%', backgroundColor: 'gray'}}>
      {showSpinner === true ? loadingModal() : null}
      {headerBar(setShowSpinner)}
      <View style={{height: '100%', margin: 5, padding: 5}}>
        <View style={{width: '100%', height: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={()=>{
              notSupported(ws, 0);
            }} style={styles.button}>
              <Ionicons name={'volume-low-outline'} size={80} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              notSupported(ws, 50);
            }} style={styles.button}>
              <Ionicons name={'volume-high-outline'} size={80} color={'white'} />
            </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={()=>{
              notSupported(ws, 0);
            }} style={styles.button}>
              <Ionicons name={'play-back-outline'} size={80} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              notSupported(ws, 0);
            }} style={styles.button}>
              <Ionicons name={'play-outline'} size={80} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              notSupported(ws, 0);
            }} style={styles.button}>
              <Ionicons name={'play-forward-outline'} size={80} color={'white'} />
            </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: '40%'}}>
          <View style={{width: '100%', height: '33.33%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>{
              pressKey(ws, 'UP');
            }} style={styles.button}>
              <Ionicons name={'chevron-up-outline'} size={100} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: '33.33%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>{
              pressKey(ws, 'LEFT');
            }} style={styles.button}>
              <Ionicons name={'chevron-back-outline'} size={100} color={'white'} />
            </TouchableOpacity>
            <View style={{width: 100}}></View>
            <TouchableOpacity onPress={()=>{
              pressKey(ws, 'RIGHT');
            }} style={styles.button}>
              <Ionicons name={'chevron-forward-outline'} size={100} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: '33.33%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>{
              pressKey(ws, 'DOWN');
            }} style={styles.button}>
              <Ionicons name={'chevron-down-outline'} size={100} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function MouseScreen() {
  const { ws, setWs } = useContext(SocketContext);
  const [showSpinner, setShowSpinner] = React.useState(false);

  const [durationInMinute, onChangeDuration] = React.useState('1');
  const [delayInSecond, onChangeDelay] = React.useState('1');
  const [pauseInSecond, onChangePause] = React.useState('5');
  const [stepInSecond, onChangeStep] = React.useState('50');
  
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <View style={{height: '100%'}}>
      {showSpinner === true ? loadingModal() : null}
      {headerBar(setShowSpinner)}
      <View style={{height: '100%', margin: 5, padding: 5}}>
      <View
          style={{
            margin: '5%'
          }}>
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Duration (mins):</Text>
          <TextInput
            onChangeText={onChangeDuration}
            keyboardType='numeric'
            value={durationInMinute}
            style={{
              backgroundColor: isDarkMode ? 'white' : 'gray',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
              color: !isDarkMode ? 'white' : 'black'
            }}
          />
          
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Delay (secs):</Text>
          <TextInput
            onChangeText={onChangeDelay}
            keyboardType='numeric'
            value={delayInSecond}
            style={{
              backgroundColor: isDarkMode ? 'white' : 'gray',
              borderColor:'gray',
              borderWidth: 1,
              padding: 5,
              margin: 5,
              color: !isDarkMode ? 'white' : 'black'
            }}
          />
          
          <Text style={{color: isDarkMode ? 'white' : 'black'}}>Pause (secs):</Text>
          <TextInput
            onChangeText={onChangePause}
            keyboardType='numeric'
            value={pauseInSecond}
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
        <View style={{width: '100%', height: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={()=>{
                startRandomCursorMove(ws, delayInSecond, durationInMinute, stepInSecond, pauseInSecond);
              }} style={{...styles.button, width: 100, height: 100, alignItems: 'center'}}>
              <Icon name={'rocket'} size={80} color={'white'} />
                <Text style={{color: !isDarkMode ? 'white' : 'black'}}>Start</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                stopRandomCursorMove(ws);
              }} style={{...styles.button, width: 100, height: 100, alignItems: 'center'}}>
                <Icon name={'mouse-pointer'} size={80} color={'white'} />
                <Text style={{color: !isDarkMode ? 'white' : 'black'}}>Stop</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const scheme = useColorScheme();
  SplashScreen.hide();

  const [ws, setWs] = React.useState(null);

  return (
    <SocketContext.Provider value={{ws, setWs}}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'game-controller' : 'game-controller-outline';
              } else if (route.name === 'Cursor') {
                iconName = focused ? 'pulse-outline' : 'pulse-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Server') {
                iconName = focused ? 'download-outline' : 'download-outline';
              } else if (route.name === 'Privacy') {
                iconName = focused ? 'glasses-outline' : 'glasses-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Cursor" component={MouseScreen} />
          <Tab.Screen name="Settings" component={ConfigPage} />
          <Tab.Screen name="Privacy" component={PrivacyPage} />
          <Tab.Screen name="Server" component={AboutPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SocketContext.Provider>
  );
};

function snackBar() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isAlreadyConnected, setIsAlreadyConnected] = React.useState(isConnected());

  return (
    <View style={{position:'absolute', bottom: 0, width: '100%', alignItems: 'center' }}>
      <View style={{padding: 5, paddingLeft: 10, paddingRight: 10, width: '90%', height: 50, backgroundColor: !isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)', borderRadius: 10, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{color:'white'}}>
          {isAlreadyConnected == true ? "Connected to Server" : "Server not connected"}
        </Text>
        <Button
          onPress={()=> {
            if(isAlreadyConnected != true) {
              connectToServer(()=>{ 
                setIsAlreadyConnected(isConnected());
               });
            } else {
              disconnectServer(()=>{ 
                setIsAlreadyConnected(isConnected());
               });
            }
          }}
          title={isAlreadyConnected == true ? "Disconnect" : "Connect"}
          color="#841584"
          accessibilityLabel="Connect to Remote Control Server"
        />
      </View>
    </View>
  );
}

function loadingSpinner() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator style={{
                                  width: '100%',
                                  height: '100%',
                                }} size="large" color="#00ff00" />
    </View>
  );
}
