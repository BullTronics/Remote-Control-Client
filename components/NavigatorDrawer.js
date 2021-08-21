import * as React from 'react';

import {View, Image, StyleSheet, Text} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { NavigatorStack } from './NavigatorStack';
import { AboutPage } from './AboutPage';
import { PrivacyPage } from './PrivacyPage';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({progress, ...rest}) {

  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.container}>
        {global.user.gender === 'FEMALE' ? (
          <Image
            style={styles.favIcon}
            source={require('./../images/default-female-profile.png')}
          />
        ) : (
          <Image
            style={styles.favIcon}
            source={require('./../images/default-male-profile.png')}
          />
        )}

        <Text style={styles.userWelcomeText}>
          Hello
        </Text>
      </View>
      <DrawerItemList {...rest} />

    </DrawerContentScrollView>
  );
}

export default function NavigatorDrawer() {
  global.user = {
    gender: 'MALE',
    firstName: 'User'
  };
  return (
    <Drawer.Navigator
      initialRouteName="NavigatorStack"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="NavigatorStack" component={NavigatorStack} options={{title:"Home"}} />
      <Drawer.Screen name="About" component={AboutPage} options={{title:"About"}} />
      <Drawer.Screen name="Privacy" component={PrivacyPage} options={{title:"Privacy"}} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 150, 255, 1)',
    marginBottom: 50,
    borderBottomRightRadius: 50,
    marginTop: -5,
    flex: 1,
    padding: 10,
  },
  favIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
    borderBottomRightRadius: 20,
  },
  userWelcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
