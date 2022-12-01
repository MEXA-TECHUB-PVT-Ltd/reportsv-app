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

import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginHeader from '../../../components/logins_comp/LoginHeader';
import Btn from '../../../components/button/Btn';
import FBBtn from '../../../components/button/FBBtn';
import styles from './styles';
import STYLES from '../../../components/button/styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Login({ navigation }) {

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
  const callLogin = async () => {
    setloading(true);
    if (password.length == 0 || email.length == 0) {
      setloading(false);
      setSnackDetails({
        text: 'Please fill all the fields',
        backgroundColor: COLORS.red,
      });
      onToggleSnackBar()
      // alert('Please fill all fields');
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

      var InsertAPIURL = base_url + '/user/login.php';
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

        }),
      })
        .then(response => response.json())
        .then(response => {
          setloading(false);
          console.log(response)
          if (response[0].error == true) {
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
              navigation.navigate('MyTabs',{ screen: 'Feed' })
           
          }
        })
        .catch(error => {
          setloading(false);
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
      console.log(JSON.parse(jsonValue))
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
          zIndex: 999,
          backgroundColor: snackDetails.backgroundColor,

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
            bkgImgType={'login'}
            bkgImgText={'LOGIN TO CONTINUE'}
          />

          <View style={styles.txtInptView}>
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder="Email ID"
              placeholderTextColor={COLORS.white}

              keyboardType="email-address"
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              onChangeText={text => setEmail(text)}
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
              autoCapitalize="none"
              autoCorrect={false}

              mode="Flat"
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forgetpass')
              }}
            >
              <Text
                style={styles.frgtpss}
              >Forget Password?</Text>
            </TouchableOpacity>

            <Button
              mode='contained'
              style={STYLES.btn}

              contentStyle={STYLES.btnContent}
              onPress={() => callLogin()}
              loading={loading}
              disabled={loading}
            >
              <Text
                style={STYLES.btnText}
              >
                Login
              </Text>
            </Button>

            {/* <FBBtn text="login" /> */}

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
              >Don’t have account?  </Text>
              <TouchableOpacity
                style={{
                  left: '5%',
                }}
                onPress={() => {
                  navigation.navigate('Signup')
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.white,
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>



  );
}

export default Login;
