import React from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faMousePointer, faCog, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '@react-navigation/native';

export function HomePage({ navigation }) {

  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./../images/logo.png')}/>
      <Text style={{color: colors.text, fontSize: 30}}>{global.brand.title}</Text>
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
        <View style={{
            alignItems: "center",
            margin: 5,
            padding: 10,
            width: '30%',
          }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
          }}
          onPress={() => {navigation.navigate('MediaRemote')}}>
          <FontAwesomeIcon icon={ faPlay } size={ 100 }/>
        </TouchableOpacity>
        <Text style={{color: colors.text, fontSize: 10}}>Media</Text>
        </View>

        
        <View style={{
            alignItems: "center",
            margin: 5,
            padding: 10,
            width: '30%',
          }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
          }}
          onPress={() => {navigation.navigate('MiscRemote')}}>
          <FontAwesomeIcon icon={ faMousePointer } size={ 100 }/>
        </TouchableOpacity>
        <Text style={{color: colors.text, fontSize: 10}}>Random Cursor</Text>
        </View>


        <View style={{
            alignItems: "center",
            margin: 5,
            padding: 10,
            width: '30%',
          }}>
        <TouchableOpacity
          style={{
            margin: 5,
            padding: 10,
            backgroundColor: "#DDDDDD",
          }}
          onPress={() => {navigation.navigate('VolumeRemote')}}>
          <FontAwesomeIcon icon={ faVolumeUp } size={ 100 }/>
        </TouchableOpacity>
        <Text style={{color: colors.text, fontSize: 10}}>Volume</Text>
        </View>

      </View>
      <View style={{flexDirection: 'row', alignSelf:'center'}}>

        
      <View style={{
            alignItems: "center",
            margin: 5,
            padding: 10,
            width: '30%',
          }}>
            
        <TouchableOpacity
          style={{
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
          }}
          onPress={() => {navigation.navigate('ConfigPage')}}>
          <FontAwesomeIcon icon={ faCog } size={ 100 }/>
        </TouchableOpacity>
        
        <Text style={{color: colors.text, fontSize: 10}}>Config</Text>
        </View>

      </View>
    </View>
  );
}