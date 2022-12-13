import 'react-native-gesture-handler';
import React, { useState, useEffect,useRef } from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginHeader from '../../../components/logins_comp/LoginHeader';
import Btn from '../../../components/button/Btn';
import STYLES from '../../../components/button/styles';
import FBBtn from '../../../components/button/FBBtn';
import styles from './styles';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Signup({ navigation }) {
  // snackbar
  const [visible, setVisible] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // variables
  const [loading, setloading] = useState(false);
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // register api call
  const signUp = async link => {
    setloading(true);
    if (userName.length == 0 || password.length == 0 || email.length == 0) {
      setloading(false);
      setSnackDetails({
        text: 'Please fill all the fields',
        backgroundColor: COLORS.red,
      });
      onToggleSnackBar()
      // alert('Please fill all fields');
    }
    else if (password.length < 8) {
      setloading(false);
      setSnackDetails({
        text: 'Password must be 8 characters long',
        backgroundColor: COLORS.red,
      });
      onToggleSnackBar()
      
    }

    else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ) {
      setloading(false);
   
      setSnackDetails({
        text: 'Please enter a valid email address',
        backgroundColor: COLORS.red,
      });
      onToggleSnackBar()
    }
    else {

      var InsertAPIURL = base_url + '/user/register.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          EmailAddress: email,
          Password: password,
          UserName: userName,
        }),
      })
        .then(response => response.json())
        .then(response => {
          setloading(false);
          // console.log(response)
          if(response[0].error==true) {
            setSnackDetails({
              text: response[0].message,
              backgroundColor: COLORS.red,
            });
            onToggleSnackBar()
          }
          else {
            setSnackDetails({
              text: response[0].message,
              backgroundColor: COLORS.success,
            });
            onToggleSnackBar()
            storeData(response[0])
            getData()
            setTimeout(() => {
              navigation.navigate('Login')
            }, 2000);
          }
        })
        .catch(error => {

          alert('this is error' + error);
        });
    }
  };
  // store user data in async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userDetail', jsonValue)
      // console.log('userDetail', jsonValue)
    }
    catch (e) {
      // saving error
      alert('Error : ' + e);
    }
  }
  // get user data from async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetail')
      // console.log(JSON.parse( AsyncStorage.getItem('userDetail')))
    const data = JSON.parse(jsonValue)
      // return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
  }, []);
  return (


    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark,

      }}
    >
      <Snackbar
        visible={visible}
        style={{
          zIndex:999,
          backgroundColor:snackDetails.backgroundColor,
         
        }}
       
        duration={1000}
        onDismiss={onDismissSnackBar}
        >
       {snackDetails.text}
      </Snackbar>
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
          <LoginHeader navigation={navigation}
            bkgImgType={'signup'}
            bkgImgText={'REGISTER TO CONTINUE'}
          />

          <View style={styles.txtInptView}>
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder="User Name"
              placeholderTextColor={COLORS.white}

              keyboardType="email-address"
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              onChangeText={text => setuserName(text)}
            />
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder="Email ID"
              placeholderTextColor={COLORS.white}
              underlineColor='white'
              activeUnderlineColor='white'

              onChangeText={text => setEmail(text)}

              mode="Flat"
            />
            <TextInput
              style={[styles.txtInpt, {
                marginVertical: '5%',
              }]}
              color={'white'}
              placeholder="Password"
              placeholderTextColor={COLORS.white}
              secureTextEntry={true}
              underlineColor='white'
              activeUnderlineColor='white'
              mode="Flat"
              onChangeText={text => setPassword(text)}
              
            />
             



            <Button
              mode='contained'
              style={STYLES.btn}

              contentStyle={STYLES.btnContent}
              onPress={() => signUp()}
              loading={loading}
              disabled={loading}
            >
              <Text
                style={STYLES.btnText}
              >
                Register
              </Text>
            </Button>


            <Text
              style={styles.orView}
            >- or -</Text>
            <View
              style={
                styles.SgnOrIntxt

              }
            >
              <Text

                style={{
                  color: COLORS.white,
                }}
              >Already have an Account? </Text>
              <TouchableOpacity
                style={{
                  left: '5%',
                }}
                onPress={() => {
                  navigation.navigate('Login')
                }}
              >
                <Text
                  style={styles.signinTxt}
                >
                  Signin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>



  );
}

export default Signup;
