import * as React from 'react';

import {View, Image, StyleSheet, Text, useColorScheme, TouchableHighlight} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { NavigatorStack } from './NavigatorStack';
import { ConfigPage } from './ConfigPage';
import { MediaRemote } from './MediaRemote';
import { VolumeRemote } from './VolumeRemote';
import { MiscRemote } from './MiscRemote';
import { AboutPage } from './AboutPage';
import { PrivacyPage } from './PrivacyPage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faHome, faBuilding, faVolumeUp, faUserSecret, faPlay, faMouse, faBars } from '@fortawesome/free-solid-svg-icons';

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
  
  const scheme = useColorScheme();
  return (
    <Drawer.Navigator
      initialRouteName="NavigatorStack"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="NavigatorStack" component={NavigatorStack} options={{title:"Home", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faHome } size={ 20 } color={color}/>}} />
      <Drawer.Screen name="MediaRemote" component={MediaRemote} options={{title:"Media Remote", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faPlay } size={ 20 } color={color}/>}} />
      <Drawer.Screen name="VolumeRemote" component={VolumeRemote} options={{title:"Volume Remote", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faVolumeUp } size={ 20 } color={color}/>}} />
      <Drawer.Screen name="MiscRemote" component={MiscRemote} options={{title:"Misc Remote", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faMouse } size={ 20 } color={color}/>}} />
      <Drawer.Screen name="ConfigPage" component={ConfigPage} options={{title:"Server Config", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faCog } size={ 20 } color={color}/>}} />
      <Drawer.Screen name="About" component={AboutPage} options={{title:"About", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faBuilding } size={ 20 } color={color}/>}} />
      <Drawer.Screen name="Privacy" component={PrivacyPage} options={{title:"Privacy", drawerIcon: ({color}) => <FontAwesomeIcon icon={ faUserSecret } size={ 20 } color={color}/>}} />
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
