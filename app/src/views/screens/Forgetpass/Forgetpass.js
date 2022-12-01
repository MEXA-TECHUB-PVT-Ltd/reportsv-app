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
  TouchableRipple
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginHeader from '../../../components/logins_comp/LoginHeader';
import Btn from '../../../components/button/Btn';
import FBBtn from '../../../components/button/FBBtn';
import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Forgetpass({ navigation }) {
  const [loading, setloading] = useState(true);


  useEffect(() => {

  }, []);
  return (


    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark,

      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: '5%',
        }}
      >
        <View
          style={styles.mainView}
        >
          <TouchableOpacity
            style={styles.btnback}
            onPress={()=>{
              navigation.goBack()
            }}
          >
          <Icon name="chevron-left" size={20} 
          color={COLORS.secondary} />
          </TouchableOpacity> 

          <LoginHeader navigation={navigation}
            bkgImgType={'forgetPass'}
            bkgImgText={'FORGET PASSWORD'}
          
          />
            <Text
            style={styles.forgetTxt}
            >
            Please, enter your email address.
            </Text>
            <Text
            style={styles.forgetTxt}
            >
          You will receive
a 4 Digit Code to create a new password.
            </Text>
          <View style={styles.txtInptView}>
            
            <TextInput
              style={[styles.txtInpt,{
                marginTop:40
              }]}
              color={'white'}
              placeholder="Email ID"
              placeholderTextColor={COLORS.white}
              secureTextEntry={true}
              underlineColor='white'
              activeUnderlineColor='white'

              mode="Flat"
            />
            
            
            
            <Btn text="continue"
            navigateTo='VerifyCode'
            navigation={navigation}  
            />
            
           

           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>



  );
}

export default Forgetpass;
