import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity,ListView,Image} from 'react-native';
import { createRouter, NavigationProvider } from '@expo/ex-navigation';
import Router from '../navigation/Router';
const image1 = require('../assets/images/geasy.jpg')
const image2 = require('../assets/images/eminem.jpg')
const image3 = require('../assets/images/kyle.jpg')
const image4 = require('../assets/images/devon.jpg')
const data = [{
  "id": 1,
  "first_name": "G Eazy",
  "message": "I just need to be alone",
  "image": image1
}, {
  "id": 2,
  "first_name": "Eminem",
  "message": "Fuck off",
  "image": image2
}, {
  "id": 2,
  "first_name": "Kyle",
  "message": "Lame NI**As hide your girls",
  "image": image3
}, {
  "id": 2,
  "first_name": "Devon Baldwin",
  "message": "Where the Avacados at tho?",
  "image": image4
}]

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Friends_ListScreen extends React.Component {
  static route = {
    navigationBar: {
      title: '好友',
      backgroundColor: '#f5dd90',
      tintColor: '#f38961',
      height:60
    },
  };
    constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(data),
    }
  }
  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  };
  render() {
    const { username, petname, petgender, age, gender,info} = this.state;
    const {card , card2,cardpic ,cardperfix1,cardperfix2,textfix}= styles;
    return (
      <View>
      <View style = { card } >
          <View style={cardpic}>
            <Image
              source={require('../assets/images/cardcorgi.png')}
                />
            </View>
            <Image style={cardperfix1}
              source={require('../assets/images/cardper1.png')}
                />
                <Image style={cardperfix2}
                  source={require('../assets/images/cardper2.png')}
                    />
                        <Text style={textfix}> 柯基 <Text style ={[{color:'#00D9D1'}]}>  &  </Text> 陳彥樺 </Text>
        </View>
        <View style = { card2 } >
            <View style={cardpic}>
              <Image
                source={require('../assets/images/cardcorgi2.png')}
                  />
              </View>
              <Image style={cardperfix1}
                source={require('../assets/images/cardper3.png')}
                  />
                  <Image style={cardperfix2}
                    source={require('../assets/images/cardper4.png')}
                      />
                          <Text style={textfix}> 拉芙 <Text style ={[{color:'#00D9D1'}]}>  &  </Text> 韓皓光 </Text>
          </View>

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
  card:{
  width:172,
  height:194,
  marginTop:66,
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  marginLeft:10,
  shadowColor: '#000000',
  shadowOffset: {
      width: 0,
      height:0
    },
    shadowRadius: 2,
    shadowOpacity: .5
},
card2:{
  position:'absolute',
  width:172,
  height:194,
  marginTop:66,
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  marginLeft:193,
  shadowColor: '#000000',
  shadowOffset: {
      width: 0,
      height:0
    },
    shadowRadius: 2,
    shadowOpacity: .5
},
cardpic:{
  width:172,
  height:155,
  backgroundColor:'white',
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
},
cardperfix1:{
  position:'absolute',
  marginTop:130,
  marginLeft:30
},
cardperfix2:{
  position:'absolute',
  marginTop:130,
  marginLeft:100
},
textfix:{
  backgroundColor:'rgba(255,255,255,0)',
  fontWeight:'bold',
  fontSize:12,
  color:'#707070',
  textAlign:'center',
  marginTop:18
}

});
