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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Login({ navigation }) {
  const isFocused = useIsFocused();
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bitcoinWallet, setBitcoinWallet] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [card, setCard] = useState('');
  const [authorRate, setAuthorRate] = useState('');

  // register api call
  const callLogin = async () => {
    setloading(true);
    if (password.length == 0 || email.length == 0 || name.length == 0 || bitcoinWallet.length == 0 || paypalEmail.length == 0 || card.length == 0 || authorRate.length == 0) {
      setloading(false);
      setSnackDetails({
        text:language=='en'?'Please fill all the fields':'Por favor llene todos los campos',
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

      var InsertAPIURL = base_url + '/authors/register.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name:name,
          email:email,
          password:password,
          bitcoinWallet:bitcoinWallet,
          paypalEmail:paypalEmail,
          card:card,
          authorRate:authorRate,
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
            setTimeout(() => {
              navigation.goBack()  
            }, 2000);
            
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
  // langauge 
const [language, setLanguage] = useState(null);
const storeLanguage = async (value) => {
  try {
    await AsyncStorage.setItem('language', value)
  } catch (e) {
    // saving error
  }
}
const getLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('language')
    console.log(value)
    setLanguage(value)
  } catch(e) {
    // error reading value
  }
}
  useEffect(() => {
    getLanguage()
  }, [isFocused]);
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
         
          <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            width:'80%',
            marginVertical: '5%',
            alignItems:'center',
            alignSelf:'flex-start', 
          }}
          >
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignSelf:'flex-start',
          }}
          >
            <Icon name="arrow-left" size={30} color={COLORS.white} />
          </TouchableOpacity>
            <Headline style={{
              color: COLORS.white,
              
            }}>{
              language == 'en' ? 'Become an Author' : 'Conviértete en autora'
            }</Headline>
          </View>
          <View style={styles.txtInptView}>
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder={
                language == 'en' ? 'Name' : 'Nombre'
              }
              placeholderTextColor={COLORS.light}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder={
                language == 'en' ? 'Email ID' : 'Identificación de correo electrónico'
              }
              
              placeholderTextColor={COLORS.light}

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
                marginVertical: '1%',
              }]}
              color={'white'}
              placeholder={
                language == 'en' ? 'Password' : 'Contraseña'
              }
              placeholderTextColor={COLORS.light}
              secureTextEntry={true}
              underlineColor='white'
              activeUnderlineColor='white'
              autoCapitalize="none"
              autoCorrect={false}

              mode="Flat"
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder={
                language == 'en' ? 'Bitcoin Wallet' : 'Billetera de Bitcoin'
              }
              placeholderTextColor={COLORS.light}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              onChangeText={text => setBitcoinWallet(text)}
            />
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder={
                language == 'en' ? 'Paypal Email' : 'Correo electrónico de Paypal'
              }
              placeholderTextColor={COLORS.light}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              onChangeText={text => setPaypalEmail(text)}
            />
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder={
                language == 'en' ? 'Card No' : 'No de tarjeta'
              }
              placeholderTextColor={COLORS.light}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              keyboardType="numeric"
              mode="Flat"
              onChangeText={text => setCard(text)}
            />
            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder={
                language == 'en' ? 'Author Rate' : 'Tasa de autor'
              }
              keyboardType="numeric"
              placeholderTextColor={COLORS.light}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              onChangeText={text => setAuthorRate(text)}
            />
            

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
              >{
                language == 'en' ? 'Create Account' : 'Crear una cuenta'
              }
                
              </Text>
            </Button>

            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>



  );
}

export default Login;
