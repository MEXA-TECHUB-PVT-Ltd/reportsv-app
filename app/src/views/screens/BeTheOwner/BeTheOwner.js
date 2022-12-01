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
  TextInput,
  List,
  Divider
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

function BeTheOwner({ route, navigation }) {
  // snackbar
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity

    onPress={() => navigation.navigate('BeTheOwnerDetail', { item: item })}

      style={{
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor:'#FC907D',
      }}
    >
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          alignItems: 'center',
          
          }}
        >
          <Headline style={{
            fontSize: 18,
            color: COLORS.White,
            fontWeight: 'bold',
          }}>Team Name</Headline>
          <Paragraph>{item.teamName}</Paragraph>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          alignItems: 'center',
          }}
        >
          <Headline style={{
            fontSize: 18,
            color: COLORS.White,
            fontWeight: 'bold',
          }}>Total Share</Headline>
          <Paragraph 
          >{item.shares}</Paragraph>
        </View>
        <Divider style={{ marginVertical: 10,borderWidth:.5,width:'90%' }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          alignItems: 'center',
          }}
        >
          <Headline style={{
            fontSize: 18,
            color: COLORS.White,
            fontWeight: 'bold',
          }}>Available Share</Headline>
          <Paragraph 
          >{item.available}</Paragraph>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          alignItems: 'center',
          }}
        >
          <Headline style={{
            fontSize: 18,
            color: COLORS.White,
            fontWeight: 'bold',
          }}>sold Share</Headline>
          <Paragraph 
          >{item.sold}</Paragraph>
        </View>

      </>
    </TouchableOpacity>
  )
  const getTeams = async () => {
    var InsertAPIURL = base_url + '/team/getAll.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,

    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response);
      })
      .catch(error => {
        alert('this is error' + error);
      });
  };
  useEffect(() => {
    getTeams();
  }, []);
  return (


    <View
    style={{
      flex: 1,
      backgroundColor: COLORS.dark
    }}
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
        <Appbar.Content title="Be the Owner"
        />
        {/* <Appbar.Action icon="plus" onPress={() => { }} /> */}
      </Appbar.Header>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </View>



  );
}

export default BeTheOwner;