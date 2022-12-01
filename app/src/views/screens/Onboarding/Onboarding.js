import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,

  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from 'react-native';
import {
  Text,
  Button,
  Snackbar,
  Headline,
  ActivityIndicator,
  Colors,
  TouchableRipple,

} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginHeader from '../../../components/logins_comp/LoginHeader';
import Btn from '../../../components/button/Btn';
import STYLES from '../../../components/button/styles';
import FBBtn from '../../../components/button/FBBtn';
import styles from './styles';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Onboarding({ navigation }) {

  // variables
  const [loading, setloading] = useState(true);




  // get user data from async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetail')
      console.log('onboarding Check : ',JSON.parse(jsonValue))
      
      if (JSON.parse(jsonValue) != null) {
        setTimeout(() => {
        navigation.navigate('MyTabs',{ screen: 'Feed' })
        }, 2000);
      }
      else {
        setTimeout(() => {
        navigation.navigate('Login')
        }, 2000);
      }
      // return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData()
  }, []);
  return (


    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark,

      }}
    >


      <View
        style={styles.mainView}
      >
        <ImageBackground source={
          require('../../../assets/logo.png')

        }
          resizeMode="contain"

          style={{
            width: 120,
            height: 120,
            bottom: 50,
          }}>
        </ImageBackground>
        <ActivityIndicator animating={loading} color={COLORS.primary} />




      </View>

    </SafeAreaView>



  );
}

export default Onboarding;
