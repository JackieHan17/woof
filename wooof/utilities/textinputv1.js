        <TextInput
          style={{flex:1,fontSize: 12, position: 'relative', top: 0, left:0,borderColor: '#E7E9ED',
          borderWidth: 1,borderRadius:3,paddingLeft:10}}
          placeholder={'電子郵件'}
          maxLength={30}
          multiline={false}
          placeholderTextColor="grey"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />


          <TextInput
          style={{flex:1,fontSize: 12,position: 'relative', marginTop: 20,marginBottom:20,left:0,borderColor: '#E7E9ED',
borderWidth: 1,borderRadius:3,paddingLeft:10}}
            placeholder={'密碼'}
            maxLength={12}
            multiline={false}
            placeholderTextColor="grey"
            password={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />


          import React, { Component } from 'react';
          import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView  } from 'react-native';
          import {
            SlidingTabNavigation,
            SlidingTabNavigationItem,
          } from '@expo/ex-navigation';
          import { Ionicons } from '@expo/vector-icons';

          export default class ProfileScreen extends Component {
            static route = {

            };

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
              var {container,pic_1,rule,answer,direction,introduce,line,intro_text,intro_fix} = styles;
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
                      <View style={styles.ccontainer}>
                        <View style={pic_1}>
                          <Image source={require('../assets/images/dog.png')} />
                        </View>
                          <View style={ direction }>
                            <Text style={rule}>名字 : </Text>
                            <Text style={answer}>陳彥樺</Text>
                          </View>
                          <View style={ direction }>
                            <Text style={rule}>性別 : </Text>
                            <Text style={answer}>不明</Text>
                          </View>
                          <View style={ direction }>
                            <Text style={rule}>年齡 : </Text>
                            <Text style={answer}>一個月大</Text>
                          </View>
                          <View style={ direction }>
                            <Text style={rule}>感覺狀態 : </Text>
                            <Text style={answer}>單身22年</Text>
                          </View>
                          <View>
                            <Text style={introduce}>簡介</Text>
                          </View>
                          <View style={line}></View>
                          <View style={intro_fix}>
                            <Text styke={intro_text}>關關雎鳩，在河之洲</Text>
                          </View>
                      </View>
                    </ScrollView>
                    </SlidingTabNavigationItem>
                    <SlidingTabNavigationItem id="second">
                    <ScrollView>
                      <View style={styles.ccontainer}>
                        <View style={pic_1}>
                          <Image source={require('../assets/images/owner.png')} />
                        </View>
                          <View style={ direction }>
                            <Text style={rule}>名字 : </Text>
                            <Text style={answer}>番仔c</Text>
                          </View>
                          <View style={ direction }>
                            <Text style={rule}>性別 : </Text>
                            <Text style={answer}>男人</Text>
                          </View>
                          <View>
                            <Text style={introduce}>簡介</Text>
                          </View>
                          <View style={line}></View>
                          <View style={intro_fix}>
                            <Text styke={intro_text}>姚窕淑女，君子好逑</Text>
                          </View>
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



            button: {
              margin: 16,
              color: '#0084FF',
            },

            selectedTab: {
              backgroundColor: '#0084FF',
            },
            ccontainer:{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            },
            direction:{
            flexDirection:"row",
            paddingTop:43,
          },
          pic_1:{
            alignItems: 'center',
            paddingTop:36,
          },
          rule:{
            alignItems:'center',
            justifyContent:'center',
            color:'#555555',
            fontWeight:'900',
            letterSpacing:3,
            fontSize:16,
            paddingRight:5,
          },
          answer:{
            alignItems:'center',
            justifyContent:'center',
            color:'#f38961',
            fontWeight:'900',
            letterSpacing:3,
            fontSize:16,
            paddingLeft:5,
          },
          welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
          },
          instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
          },
          introduce:{
            paddingTop:40,
            paddingBottom:20,
            fontSize:24,
            textAlign:'center',
            color:'#f38961',
            fontWeight:'900',
          },
          line:{
            width:311,
            height:3,
            backgroundColor:'#f38961',
            alignSelf:'center'
          },
          intro_fix:{
            alignItems:'center',
            padding:20
          },
          intro_text:{
            textAlign:'center',
            paddingTop:10,
            color:'#555555'

          }
          });
