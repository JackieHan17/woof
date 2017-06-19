import React, { Component } from 'react';
import { View, Picker, AsyncStorage, ScrollView, TextInput, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Confirm from '../components/Confirm';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import Router from '../navigation/Router';
import { Facebook, Components,Constants,Svg } from 'expo';
import { Madoka } from 'react-native-textinput-effects';
export default class Setting2Screen extends React.Component {
  static route = {
    navigationBar: {
      title: '用戶',
      backgroundColor: '#f5dd90',
      tintColor: '#f38961',
      height:60
    },
  };
  state = {
    username: null,
    gender: '男',
    info: null,
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
      let username = snapshot.val().username;
      let gender = snapshot.val().gender;
      let info = snapshot.val().info;

      this.setState({ username,gender,info});
    } catch (err) { }
  }

  onSaveInfo = async () => {
    this.setState({ saving: true });
    const { currentUser } = firebase.auth();
    const { username, gender, info} = this.state;
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    await dbUserid.set({ username, gender, info});
    this.setState({ saving: false });
    this.props.navigator.push(Router.getRoute('rootNavigation'));
  }


  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 30 }} />;
    }

    return (
      <Button
        title='完成'
        buttonStyle={styles.LoginButton}
        onPress={this.onSaveInfo}
      />
    );
  }




  render() {
    return (
      <View style={styles.container}>
          <View style={ styles.direction }>
            <Image source={require('../assets/icons/set10.png')} style={styles.image_icon} />
            <Image source={require('../assets/icons/set2.png')} style={styles.image_icon2} />
          </View>

        <View style = {styles.formStyle}>
                <Picker style={{marginTop:-50,marginBottom:-60}}
                  selectedValue={this.state.gender}
                  onValueChange={gender => this.setState({ gender })}
                >
                  <Picker.Item label="男" value="男" />
                  <Picker.Item label="女" value="女" />
                </Picker>
              <Madoka
              borderRadius={3}
              borderColor={'#F5DD91'}
              labelStyle={{ color: '#B9B9B9',fontSize:14 }}
              inputStyle={{ color: '#f4a197',fontSize:12}}
              label={'姓名'}
              maxLength={30}
              multiline={false}
              placeholderTextColor="grey"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              />
              <FormLabel>簡介</FormLabel>
              <FormInput
                autoCorrect={false}
                placeholder='簡介'
                value={this.state.info}
                onChangeText={info => this.setState({ info })}
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
  alignItems: 'center',
  marginRight:10,
},
image_icon2:{
alignItems: 'center',
  marginLeft:10,
},
  formStyle: {
    marginTop: 50,
    width:320,
    height:200,

  },
  input:{
    fontSize:12,
    borderColor:'#F38961',
  },
  direction:{
  flexDirection:"row",
  paddingTop:50
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
