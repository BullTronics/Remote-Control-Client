import React, {useEffect} from 'react';

import {
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {nextMedia, pauseMedia, playMedia, previousMedia, volumeDecrease, volumeIncrease} from './../services/MediaControl'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVolumeMute, faVolumeUp, faStepForward, faStepBackward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

export function MediaRemote({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '18%',
          }}
          onPress={() => previousMedia()}>
          <FontAwesomeIcon icon={ faStepBackward } size={ 50 }/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '18%',
          }}
          onPress={() => playMedia()}>
          <FontAwesomeIcon icon={ faPlay } size={ 50 }/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '18%',
          }}
          onPress={() => pauseMedia()}>
          <FontAwesomeIcon icon={ faPause } size={ 50 }/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '18%',
          }}
          onPress={() => nextMedia()}>
          <FontAwesomeIcon icon={ faStepForward } size={ 50 }/>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '30%',
          }}
          onPress={() => volumeDecrease()}>
          <FontAwesomeIcon icon={ faVolumeMute } size={ 100 }/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '30%',
          }}
          onPress={() => volumeIncrease()}>
          <FontAwesomeIcon icon={ faVolumeUp } size={ 100 }/>
        </TouchableOpacity>
      </View>
    </View>
  );
}