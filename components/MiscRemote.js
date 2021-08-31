import React, {useState} from 'react';

import {
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {startRandomCursorMove, stopRandomCursorMove} from './../services/MiscControl'

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faStop, faPlay} from '@fortawesome/free-solid-svg-icons'

export function MiscRemote({ navigation }) {
  const [isRunning, setIsRunning] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isRunning === true ? <Text style={{color: isDarkMode ? 'white' : 'black'}}>Autocursor Movement On</Text> : null}
      <View style={{flexDirection: 'row', alignSelf:'center'}}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            margin: 5,
            padding: 10,
            width: '45%',
          }}
          onPress={() => startRandomCursorMove(isEnabled).then((status)=>{setIsRunning(true);})}>
          <FontAwesomeIcon icon={ faPlay } size={ 100 }/>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#DDDDDD",
              margin: 5,
              padding: 10,
              width: '45%',
            }}
            onPress={() => stopRandomCursorMove().then((status)=>{setIsRunning(false);})}>
          <FontAwesomeIcon icon={ faStop } size={ 100 }/>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10, alignItems: 'center', alignContent: 'center'}}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{color: isDarkMode ? 'white' : 'black'}}>Enable Smooth Cursor Move{'\n'}
        (Works only in primary Monitor)</Text>
      </View>
    </View>
  );
}