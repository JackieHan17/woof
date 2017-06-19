import React, { Component } from 'react';
import { View,ScrollView,AsyncStorage,Picker, TextInput, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Confirm from '../components/Confirm';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import Router from '../navigation/Router';
import { Facebook, Components,Constants,Svg } from 'expo';
import { Madoka } from 'react-native-textinput-effects';
export default class Setting1Screen extends React.Component {
  static route = {
    navigationBar: {
      title: '用戶',
      backgroundColor: '#f5dd90',
      tintColor: '#f38961',
      height:60
    },
  };
  state = {
    petname: null,
    petgender: '公',
    age: null,
    emotion: null,
    saving: false
  };
  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  };

  async componentWillMount() {
    const { currentUser } = firebase.auth();
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      let snapshot = await dbUserid.once('value');
      let petname = snapshot.val().petname;
      let petgender = snapshot.val().petgender;
      let age = snapshot.val().age;
      let emotion = snapshot.val().emotion;

      this.setState({ petname, petgender, age, emotion,});
    } catch (err) { }
  }

  onSaveInfo = async () => {
    this.setState({ saving: true });
    const { currentUser } = firebase.auth();
    const { petname, petgender, age, emotion} = this.state;
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    await dbUserid.set({ petname, petgender, age, emotion});
    this.setState({ saving: false });
    this.props.navigator.push(Router.getRoute('Setting2'));
  }


  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 30 }} />;
    }

    return (
      <Button
        title='下一步'
        buttonStyle={styles.LoginButton}
        onPress={this.onSaveInfo}
      />
    );
  }




  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/icons/set1.png')} style={styles.image_icon} />
        <View style = {styles.formStyle}>
                <Picker style={{marginTop:120,marginBottom:-60}}
                  selectedValue={this.state.petgender}
                  onValueChange={petgender => this.setState({ petgender })}
                >
                  <Picker.Item label="公" value="公" />
                  <Picker.Item label="母" value="母" />
                </Picker>
              <Madoka
              borderRadius={3}
              borderColor={'#F5DD91'}
              labelStyle={{ color: '#B9B9B9',fontSize:14 }}
              inputStyle={{ color: '#f4a197',fontSize:12}}
              label={'名字'}
              maxLength={30}
              multiline={false}
              placeholderTextColor="grey"
              value={this.state.petname}
              onChangeText={petname => this.setState({ petname })}
              />
              <Madoka
              borderRadius={3}
              borderColor={'#F5DD91'}
              labelStyle={{ color: '#B9B9B9',fontSize:14 }}
              inputStyle={{ color: '#f4a197',fontSize:12}}
              label={'年齡'}
              maxLength={30}
              multiline={false}
              placeholderTextColor="grey"
              value={this.state.age}
              onChangeText={age => this.setState({ age })}
              />
              <Madoka
              borderRadius={3}
              borderColor={'#F5DD91'}
              labelStyle={{ color: '#B9B9B9',fontSize:14 }}
              inputStyle={{ color: '#f4a197',fontSize:12}}
              label={'感情狀態'}
              maxLength={30}
              multiline={false}
              placeholderTextColor="grey"
              value={this.state.emotion}
              onChangeText={emotion => this.setState({ emotion })}
              />

          </View>
              <View style={styles.line}></View>
              {this.renderButton()}


        <FormValidationMessage>{this.state.error}</FormValidationMessage>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image_icon:{
  position: 'absolute',
  top: 50,
},
  formStyle: {
    marginTop:0,
    width:320,
    height:300,

  },
  input:{
    fontSize:12,
    borderColor:'#F38961',
  },
  LoginButton: {
    alignItems: 'center',
    width: 290,
    height: 44,
    backgroundColor: '#F38961',
    justifyContent: 'center',
    flexDirection:'row',
    borderRadius: 100,
  },
  line:{
  height:1,
  width:300,
  backgroundColor:'#CFCFCF',
  alignSelf:'center',
  marginTop:250,
  marginBottom:10
},
  textfix:{
  color:'#B9B9B9',
  fontSize:12,
  textAlign:'center'
},
btnfblogfix:{
  height:53,
  width:320,
  borderRadius:30,
  backgroundColor:'rgba(255,255,255,0)',
  overflow:'hidden',
  alignSelf:'center',
  marginTop:10
},
btnfblog:{
  width:320,
  height:53,
  backgroundColor:'#38B5ED',
  position:'absolute',
  borderRadius:10,
  alignSelf:'center'
},
btnfblogtext:{
  textAlign:'center',
  marginLeft:30,
  marginTop:-22,
  color:'white',
  fontWeight:"bold",
  backgroundColor:"rgba(255,255,255,0)",

},
});
