import React from 'react';
import { ScrollView, StyleSheet,Text,View} from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import Expo, { Components, Permissions } from 'expo';
export default class QrcodeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: '掃朋友',
      backgroundColor: '#f5dd90',
      tintColor: '#f38961',
      height:60
    },
  };
state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{flex: 1}}>
          <Components.BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = (data) => {
    alert(JSON.stringify(data));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
