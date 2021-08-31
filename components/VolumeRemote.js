import React, {useEffect} from 'react';

import {
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Slider from '@react-native-community/slider';

import {muteSystem, unmuteSystem, setVolume, getVolume} from './../services/VolumeControl'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

var initVar;
export function VolumeRemote({ navigation }) {
  const [isMute, setIsMute] = React.useState(false);
  const [volume, onChangeVolume] = React.useState("0");
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
    getVolume().then((status)=>{onChangeVolume(status.volume); setIsMute(status.isMute);});
  }, [initVar]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isMute === true ? <Text style={{color: isDarkMode ? 'white' : 'black'}}>System On Mute</Text> : null}
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '45%',
          }}
          onPress={() => muteSystem().then((status)=>{onChangeVolume(status.volume); setIsMute(status.isMute);})}>
          <FontAwesomeIcon icon={ faVolumeMute } size={ 100 }/>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          margin: 5,
          padding: 10,
          width: '45%',
        }}
          onPress={() => unmuteSystem().then((status)=>{onChangeVolume(status.volume); setIsMute(status.isMute);})}>
        <FontAwesomeIcon icon={ faVolumeUp } size={ 100 }/>
      </TouchableOpacity>
      </View>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => setVolume(value).then((status)=>{setIsMute(status.isMute);})}
        value={Number(volume)}
      />
    </View>
  );
}