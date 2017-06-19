import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';


export default class RootNavigation extends React.Component {


  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="Map">
        <TabNavigationItem
          id="Map"
          renderIcon={isSelected => this._renderIcon('map', isSelected)}>
          <StackNavigation initialRoute="Map" />
        </TabNavigationItem>

        <TabNavigationItem
          id="Friends_List"
          renderIcon={isSelected => this._renderIcon('users', isSelected)}>
          <StackNavigation initialRoute="Friends_List" />
        </TabNavigationItem>
        <TabNavigationItem
          id="Qrcode"
          renderIcon={isSelected => this._renderIcon('qrcode', isSelected)}>
          <StackNavigation initialRoute="Qrcode" />
        </TabNavigationItem>
        <TabNavigationItem
          id="Profile"
          renderIcon={isSelected => this._renderIcon('user-o', isSelected)}>
          <StackNavigation initialRoute="Profile" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={20}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
