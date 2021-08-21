import * as React from 'react';
import { Text, View, Image, useColorScheme, Button, Linking, TouchableHighlight } from 'react-native';

import { useTheme } from '@react-navigation/native';

export function AboutPage({ navigation }) {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./../images/logo.png')}/>
      <Text style={{color: colors.text, fontSize: 30}}>{global.brand.title}</Text>
      <TouchableHighlight onPress={()=>{Linking.openURL(global.brand.url.home);}}>
        <Text style={{color: colors.text, fontSize: 10}}>{global.brand.url.home}</Text>
      </TouchableHighlight>
    </View>
  );
}