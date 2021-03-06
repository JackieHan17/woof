import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage, ScrollView, TextInput, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Confirm from '../components/Confirm';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import Router from '../navigation/Router';
import { Facebook, Components,Constants,Svg } from 'expo';
import { Madoka } from 'react-native-textinput-effects';
export default class SignInScreen extends React.Component {
  static route = {
    navigationBar: {
      title: '註冊',
      backgroundColor: '#f5dd90',
      tintColor: '#f38961',
      height:60
    },
  };
  state = {
    email: null,
    password: null,
    error: ' ',
    loading: false,
    showModal: false,
    showSpinner: false,
    token: null,
    status: 'Not Login...'
  };
  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  };
  facebookLogin = async () => {
    console.log('Testing token....');
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      console.log('Already having a token...');
      this.setState({ token });

      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      this.setState({ status: `Hello ${(await response.json()).name}` });
      console.log(response);

    } else {
      console.log('DO NOT having a token...');
      this.doFacebookLogin();
    }
  };

  doFacebookLogin = async () => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '138849050003446',
      {
        permissions: ['public_profile'],
        behavior: 'web'
      });

    if (type === 'cancel') {
      console.log('Login Fail!!');
      return;
    }

    await AsyncStorage.setItem('fb_token', token);
    this.setState({ token });
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    this.setState({ status: `Hello ${(await response.json()).name}` });
    console.log(response);
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      console.log(`currentUser = ${currentUser.uid}`);
      this.props.navigator.push(Router.getRoute('rootNavigation'));
    } catch (err) {

    }
  };

  onCreateUser = async () => {
    const { email, password } = this.state;
    try {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false,
      });

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { currentUser } = firebase.auth();
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      await dbUserid.set({petgender: "", username: "",petname:"", gender: "",age:"",emotion:"",info:"",});
      this.setState({ showSpinner: false });
      this.props.navigator.push(Router.getRoute('Setting1'));
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        loading: false,
      });
    }
  }


  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 30 }} />;
    }

    return (
      <Button
        title='下一步'
        buttonStyle={styles.LoginButton}
        onPress={this.onCreateUser}
      />
    );
  }

  async componentDidMount() {
    await AsyncStorage.removeItem('fb_token');
  }



  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/icons/woof.png')} style={styles.image_icon} />
        <View style = {styles.formStyle}>
              <Madoka
              borderRadius={3}
              borderColor={'#F5DD91'}
              labelStyle={{ color: '#B9B9B9',fontSize:14 }}
              inputStyle={{ color: '#f4a197',fontSize:12}}
              label={'電子郵件'}
              maxLength={30}
              multiline={false}
              placeholderTextColor="grey"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              />
              <Madoka
              borderRadius={3}
              borderColor={'#F5DD91'}
              labelStyle={{ color: '#B9B9B9',fontSize:14 }}
              inputStyle={{ color: '#f4a197',fontSize:12}}
              label={'密碼'}
              maxLength={12}
              multiline={false}
              placeholderTextColor="grey"
              password={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
              {this.renderButton()}
          </View>
              <View style={styles.line}></View>
              <Text style={styles.textfix}>你可以用</Text>
                <View style={styles.btnfblogfix}>
                <TouchableOpacity style={styles.btnfblog} onPress={this.facebookLogin}>
                  <Image style={{marginLeft:77,marginTop:19}}
                  source={require('../assets/images/fblogo.png')}/>
                  <Text style={styles.btnfblogtext}>使用facebook登入</Text>
                </TouchableOpacity>
                </View>

        <FormValidationMessage>{this.state.error}</FormValidationMessage>
        <Spinner
          visible={this.state.showSpinner}
        />
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
    marginTop: 100,
    width:320,
    height:250,

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
  marginTop:150,
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
