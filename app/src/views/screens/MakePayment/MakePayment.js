import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,

  Snackbar,
  Headline,
  ActivityIndicator,
  Colors,
  TouchableRipple,
  Paragraph,
  Appbar,
  TextInput
} from 'react-native-paper';
import VideoPlayer from 'react-native-video-player';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import STYLES from '../../../styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginHeader from '../../../components/logins_comp/LoginHeader';
import Btn from '../../../components/button/Btn';
import FBBtn from '../../../components/button/FBBtn';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import BrickList from 'react-native-masonry-brick-list';
import styles from './styles';
import { WebView } from 'react-native-webview';
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function MakePayment({ route, navigation }) {
  const { confirmPayment, loading } = useConfirmPayment();

  const { payment_type,news_id, uniq_id, user_id, total_price, email } = route.params;
  
  // snackbar
  const [visible, setVisible] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);


  const fetchPaymentIntentClientSecret = async () => {
    setSnackDetails({
      text: 'Processing...',
      backgroundColor: COLORS.primary,
    });
    onToggleSnackBar()
    const response = await fetch(base_url + '/charge-payment/create-payment-intent.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
        amount: JSON.parse(total_price) * 100,
      }),
    });

    const clientSecret = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: email,
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      alert(error.localizedMessage);
    } else if (paymentIntent) {
      // console.log(paymentIntent.status);
      if (paymentIntent.status == 'Succeeded') {
        console.log('Payment confirmation success');
        if(payment_type==undefined) {
          var InsertAPIURL = base_url + '/userAd/update_payment.php';
          var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };
  
          await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              transiction_id: paymentIntent.id,
              uniq_id: uniq_id,
  
            }),
          })
            .then(response => response.json())
            .then(response => {
  
              if (response[0].error == false) {
                console.log('Payment confirmation success');
                setSnackDetails({
                  text: response[0].message,
                  backgroundColor: COLORS.success,
                });
                onToggleSnackBar()
                setTimeout(() => {
                  navigation.navigate('MyTabs', {
                    screen: 'Feed',
                  });
                }, 2000);
              }
            })
            .catch(error => {
              alert('this is error' + error);
            });
        }
        else {
            

          // payment for subscription
          var InsertAPIURL = base_url + '/news_subscription/addNewsSubscription.php';
          var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };
  
          await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              news_id: news_id,
              user_id:user_id,
              payment_id: paymentIntent.id,
             }),
          })
            .then(response => response.json())
            .then(response => {
                // console.log('response : ',response);
                // console.log('payment : ',paymentIntent.paymentMethodId);
                setSnackDetails({
                  text: response[0].message,
                  backgroundColor: COLORS.success,
                });
                onToggleSnackBar()
                setTimeout(() => {
                  navigation.navigate('webDetail', {
                    news_id: news_id,
                    userid: user_id,
                    title: 'News Detail',
                    navigation_to: 'Feed',
                  })
                }, 2000);
            })
            .catch(error => {
              alert('this is error' + error);
            });
        }
        
      }
      else {
        console.log('Payment confirmation error');
        
      }
      ;
    }
  };
  useEffect(() => {
  }, []);
  return (


    <StripeProvider
      publishableKey="pk_test_GvYOyjmRofbuOT9ktYnFMzpk009IrqBrUp"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Snackbar
        visible={visible}
        style={{
          zIndex: 999,
          backgroundColor: snackDetails.backgroundColor,
        }}

        duration={2000}
        onDismiss={onDismissSnackBar}
      >
        {snackDetails.text}
      </Snackbar>
      <Appbar.Header
        style={{
          backgroundColor: COLORS.dark,
        }}
      >
        <Appbar.BackAction onPress={() => {
          navigation.goBack()
        }}
        />
        <Appbar.Content title="Confirm Your Payment"
        />


      </Appbar.Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#f4f3f5',
        }}
      >
        <Image source={{ uri: 'https://img.lovepik.com/free-png/20210919/lovepik-credit-card-png-image_400515492_wh1200.png' }} style={{ width: 100, height: 100, marginTop: 20 }} />
        <Headline
          style={{
            marginTop: 20,
          }}
        >You Need to Pay : {total_price} $</Headline>
        <TextInput
          style={[styles.txtInpt, {
            marginVertical: '5%',
          }]}
          color={COLORS.dark}
          placeholder="Your Email"
          placeholderTextColor={COLORS.dark}
          underlineColor={COLORS.greylight}
          activeUnderlineColor={COLORS.dark}
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          disabled
          mode="Flat"

        />
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '1234 4567 8910 1112',
          }}
          cardStyle={{
            backgroundColor: COLORS.greylight,
            textColor: '#000000',
            borderColor: COLORS.light,
            borderRadius: 5,

          }}
          style={{
            width: '90%',
            height: 50,
            marginVertical: 10,

          }}

        // onCardChange={(cardDetails) => {
        //   console.log('cardDetails', cardDetails);
        // }}
        />
        <TouchableOpacity

          style={{
            borderRadius: 50,
            color: COLORS.white,
            backgroundColor: COLORS.primary,
            marginTop: '10%',
            width: '90%',
            padding: '5%',
            alignItems: 'center',
            fontFamily: 'JosefinSans-Bold',
          }}

          contentStyle={{


          }}
          onPress={() => handlePayPress()}
          disabled={loading}
        >
          <Text
            style={{
              fontFamily: 'JosefinSans-Bold',
              color: COLORS.white,
            }}
          >
            Pay Now
          </Text>
        </TouchableOpacity>
        {/* <Button 
             onPress={handlePayPress}
              title="Pay"
              
              disabled={loading} /> */}
      </View>


    </StripeProvider>



  );
}

export default MakePayment;
