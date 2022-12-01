import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
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
} from 'react-native-paper';
import COLORS from '../../consts/colors';
import base_url from '../../consts/base_url';
import STYLES from '../../styles';
import styles from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function LoginHeader(props) {


  useEffect(() => {

  }, []);
  return (
    <>
            
          {
            props.bkgImgType == 'forgetPass' ||
            props.bkgImgType == 'verify' ||
            props.bkgImgType == 'NewPass'
            ? null : <Image
            style={styles.img}
            source={require('../../assets/logo.png')}
          />
          }
          <ImageBackground source={
            props.bkgImgType == 'login' ?  require('../../assets/bkg_img/Login.png'): 
            props.bkgImgType == 'signup' ? 
            require('../../assets/bkg_img/register.png')  : 
            props.bkgImgType == 'forgetPass' ? 
            require('../../assets/bkg_img/forget.png') :
            props.bkgImgType == 'verify' ?
            require('../../assets/bkg_img/verify.png') :
            require('../../assets/bkg_img/newPassword.png')

           }
            resizeMode="contain"

            style={styles.bkgImg}>
          
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText,{
                fontSize: props.bkgImgType == 'signup' || 
                props.bkgImgType == 'NewPass' ? 24 : 30,
                textAlign:'center'
                
              }]}
            >{props.bkgImgText}</Text>
          </ImageBackground>
    </>
  );
}

export default LoginHeader;
