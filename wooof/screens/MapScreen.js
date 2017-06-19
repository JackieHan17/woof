import React, { Component } from 'react';
import { Platform, View, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Icon } from 'react-native-elements';

export default class MapScreen extends React.Component {
  static route = {
    navigationBar: {
    title: 'woof!',
      backgroundColor: '#f5dd90',
      tintColor: '#f38961',
      height:60
    },
  };

  state = {
    mapLoaded: false,
    region: {
      longitude: 121.544637,
      latitude: 25.024624,
      longitudeDelta: 0.01,
      latitudeDelta: 0.02
    },
    errorMessage: null
  }


  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  _getLocationAsync = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.02
      }
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          showsUserLocation={this.props.showsUserLocation}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
        </MapView>
        <TouchableOpacity onPress={this._getLocationAsync}>
        <Image 
        source={require('../assets/icons/app-icon.png')}
        fadeDuration={0}
        style={{width: 60,
                height: 60,
                backgroundColor: 'transparent',
                position: 'absolute',
                right: 20,
                bottom: 40
          }}
        />
        </TouchableOpacity>
      </View>
    );
  }
}
