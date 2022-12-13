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
  TextInput,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  Button,
  Snackbar,
  Headline,
  ActivityIndicator,
  Colors,
  TouchableRipple,
  Paragraph,
  Appbar
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function BuySpace({ route, navigation }) {
  const webviewRef = useRef();

  const refRBSheetTags = useRef();
  const { 
        sponser_id,
        price,
        user_id,
        share_name,
        space_want
   } = route.params;

  const [cat_id, setCat_id] = useState('');
  
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(0);
  const [liked, setLiked] = useState(0);
  // bottom sheet 
  const refRBSheet = useRef();
  
  // bottom sheet end
  // snackbar
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // flatlsit end
  // send data to webview
  function sendDataToWebView() {
    webviewRef.current.postMessage('Data from React Native App');
  }

  function onMessage(data) {
    if(data.nativeEvent.data=='record_updated'){
      navigation.navigate('Sponser')
    }
  }
  
  
  
  

  


  
  
  // get user data from async storage
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('userDetail')
  //     const data = JSON.parse(jsonValue)
  //     setUser_id(data.id)

  //   } catch (e) {
  //     alert('Failed to fetch the data from storage')
  //   }
  // }
  useEffect(() => {

    // getData()
    // sendDataToWebView()
  }, []);
  return (


    <SafeAreaView
      style={{

        backgroundColor: COLORS.dark,
        flex: 1,
      }}
    >
      <Snackbar
        visible={visible}
        style={{
          zIndex: 999,
          backgroundColor: snackDetails.backgroundColor,
          marginBottom: '15%',
        }}

        duration={1000}
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
        <Appbar.Content title="Sponser Space"
        // subtitle="News Details"
        />


      </Appbar.Header>


      <WebView
        ref={webviewRef}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        automaticallyAdjustContentInsets={true}
        onMessage={onMessage}
        style={{
          height: height,
          width: width,
        }}
        




        source={{ uri: 'https://teamsuit.co/reportSv/2/api/BuySpace/?type=authorPay&share_name='+share_name+'&price='+price+'&user_id='+user_id+'&space_want='+space_want+'&sponser_id='+sponser_id }} />

    </SafeAreaView>



  );
}

export default BuySpace;
