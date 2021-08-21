import * as React from 'react';
import { Button, View,Text, Linking } from 'react-native';

export function PrivacyPage({ navigation }) {
  Linking.openURL(global.brand.url.privacy);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => Linking.openURL(global.brand.url.privacy)}
        title="Open in Browser"
      />
      <Text></Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Back"
      />
    </View>
  );
}