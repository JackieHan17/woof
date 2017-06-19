import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView  } from 'react-native';
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import Router from '../navigation/Router';
export default class ProfileScreen extends Component {
  static route = {

  };
  state = {
    username: null,
    petname: null,
    gender: null,
    petgender: null,
    emotion: null,
    info: null,
    age:null,
  };
  componentDidMount() {
    this.setUserInfo();
  }

  setUserInfo = async () => {
    const { currentUser } = firebase.auth();
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      let snapshot = await dbUserid.once('value');
      let username = snapshot.val().username || " ";
      let petname = snapshot.val().petname || " ";
      let gender= snapshot.val().gender || " ";
      let petgender = snapshot.val().petgender || " ";
      let age = snapshot.val().age || " ";
      let info = snapshot.val().info || " ";

      this.setState({ username, petname, petgender, age, gender,info});
    } catch (err) { }

  }

  onSignOut = () => {
    firebase.auth().signOut();
    this.props.navigator.push(Router.getRoute('LogIn'));
  }
  _goToFirstTab = () => {
    this.props.navigation.performAction(({ tabs, stacks }) => {
      tabs('sliding-tab-navigation').jumpToTab('first');
    });
  };

  _goToSecondTab = () => {
    this.props.navigation.performAction(({ tabs, stacks }) => {
      tabs('sliding-tab-navigation').jumpToTab('second');
    });
  };

  _renderLabel = ({ route }) => {
    let title;
    if (route.key === 'first') {
      title = '寵物';
    } else if (route.key === 'second') {
      title = '主人';
    }

    return <Text style={styles.tabLabel}>{title.toUpperCase()}</Text>;
  };

  render() {
    const { username, petname, petgender, age, gender,info} = this.state;
    var { photofix , profilebox , box ,textdec , textdec2 , line , photobox } = styles;
    return (
      <View style={styles.container}>
        <SlidingTabNavigation
          id="sliding-tab-navigation"
          navigatorUID="sliding-tab-navigation"
          initialTab="first"
          renderLabel={this._renderLabel}
          barBackgroundColor="#f5dd90"
          indicatorStyle={styles.tabIndicator}>
          <SlidingTabNavigationItem id="first">
          <ScrollView>
          <View >
    <Image style={photofix}
    source={require('../assets/images/corgiphoto.png')}
  />
    <Text style={{textAlign:'center',color:'#00D9D1',fontSize:14,fontWeight:'bold'}}>
      柯基
        </Text>
      <Text style={{textAlign:'center',color:'#C0C0C0',fontSize:12}}>
       I have detailed below the{"\n"} most cost effective
        </Text>
        <View style={profilebox}>
          <View style={box}>
            <Text style={textdec}>性別
              </Text>
              <Text style={textdec2}>
                母
                </Text>
            </View>
                    <View style={line}>
                      </View>
            <View style={box}>
            <Text style={textdec}>年齡
              </Text>
              <Text style={textdec2}>
                1 歲
                </Text>
              </View>
              <View style={line}>
                </View>
              <View style={box}>
              <Text style={textdec}>感情狀態
                </Text>
                <Text style={textdec2}>
                  單身
                  </Text>
                </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={photobox}>
          <Image
        source={require('../assets/images/add.png')}
      />
            </View>
            <View style={photobox}>
            <Image
          source={require('../assets/images/2.png')}
        />
              </View>
              <View style={photobox}>
              <Image
            source={require('../assets/images/3.png')}
          />
                </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={photobox}>
                <Image
              source={require('../assets/images/4.png')}
            />
                  </View>
                  <View style={photobox}>
                  <Image
                source={require('../assets/images/5.png')}
              />
                    </View>
                    <View style={photobox}>
                    <Image
                  source={require('../assets/images/6.png')}
                />
                      </View>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <View style={photobox}>
                      <Image
                    source={require('../assets/images/7.png')}
                  />
                        </View>
                        <View style={photobox}>
                        <Image
                      source={require('../assets/images/8.png')}
                    />
                          </View>
                          <View style={photobox}>
                          <Image
                        source={require('../assets/images/9.png')}
                      />
                            </View>
                            </View>
    </View>

          </ScrollView>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="second">
          <ScrollView>
          <View>

    <Image style={photofix}
    source={require('../assets/images/manpro.png')}
  />
    <Text style={{textAlign:'center',color:'#00D9D1',fontSize:14,fontWeight:'bold'}}>
      柯基
        </Text>
      <Text style={{textAlign:'center',color:'#C0C0C0',fontSize:12}}>
       I have detailed below the{"\n"} most cost effective
        </Text>
        <View style={profilebox}>
          <View style={box}>
            <Text style={textdec}>性別
              </Text>
              <Text style={textdec2}>
                男
                </Text>
            </View>
                    <View style={line}>
                      </View>
            <View style={box}>
            <Text style={textdec}>年齡
              </Text>
              <Text style={textdec2}>
                1 歲
                </Text>
              </View>
              <View style={line}>
                </View>
              <View style={box}>
              <Text style={textdec}>感情狀態
                </Text>
                <Text style={textdec2}>
                  單身
                  </Text>
                </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={photobox}>
          <Image
        source={require('../assets/images/add.png')}
      />
            </View>
            <View style={photobox}>
            <Image
          source={require('../assets/images/2.png')}
        />
              </View>
              <View style={photobox}>
              <Image
            source={require('../assets/images/3.png')}
          />
                </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={photobox}>
                <Image
              source={require('../assets/images/4.png')}
            />
                  </View>
                  <View style={photobox}>
                  <Image
                source={require('../assets/images/5.png')}
              />
                    </View>
                    <View style={photobox}>
                    <Image
                  source={require('../assets/images/6.png')}
                />
                      </View>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <View style={photobox}>
                      <Image
                    source={require('../assets/images/7.png')}
                  />
                        </View>
                        <View style={photobox}>
                        <Image
                      source={require('../assets/images/8.png')}
                    />
                          </View>
                          <View style={photobox}>
                          <Image
                        source={require('../assets/images/9.png')}
                      />
                            </View>
                            </View>
    </View>
    <View style={styles.btnfblogfix}>
    <TouchableOpacity style={styles.btnfblog} onPress={this.onSignOut}>
      <Text style={styles.btnfblogtext}>登出</Text>
    </TouchableOpacity>
    </View>
          </ScrollView>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',

  },

  tabLabel: {
    margin: 13,
    paddingTop:12,
    fontSize: 14,
    color: '#f38961',
  },

  tabIndicator: {
    backgroundColor: '#f38961',
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


  button: {
    margin: 16,
    color: '#0084FF',
  },

  selectedTab: {
    backgroundColor: '#0084FF',
  },
  photofix:{
      alignSelf:'center',
      marginTop:90,
      marginBottom:12
    },
    profilebox:{
      height:60,
      width:375,


      flexDirection:'row'
    },
    box:{
      width:123,
      height:60,

    },
    textdec:{
      textAlign:'center',
      lineHeight:30,
      fontSize:12,
      color:'#737373'
    },
    textdec2:{
      textAlign:'center',
      lineHeight:30,
      fontSize:14,
      color:'#F76C5E',
      fontWeight:'bold'
    },
    line:{
      width:1,
      height:36,
      backgroundColor:'#979797',
      marginTop:17
    },
    photobox:{
      height:125,
      width:125,
      backgroundColor:'green'
    }

});
