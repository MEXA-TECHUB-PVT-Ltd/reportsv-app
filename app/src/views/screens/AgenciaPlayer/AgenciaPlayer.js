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
import { IgnorePattern } from 'react-native/Libraries/LogBox/LogBox';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Sponser({ route, navigation }) {
  const {item } = route.params;
  // snackbar
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [negociate, setNegociate] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comments, setComments] = useState('');
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  
  
  const getAllbyPlayer = async () => {
    setActive('player')
    var InsertAPIURL = base_url + '/agencia/getAllbyPlayer.php';
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
        setData(response);
      })
      .catch(error => {
        alert('this is error' + error);
      });
  };
  
  useEffect(() => {
    // getAllbyPlayer();
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
        <Appbar.Content title="Sponsor to Player"
        subtitle={item.name+' , '+ item.price+'$'}
        />
        {/* <Appbar.Action icon="plus" onPress={() => { }} /> */}
      </Appbar.Header>
      
        <TextInput
          style={[styles.txtInpt,{
            marginTop: 30,
          }]}
          color={'white'}
          placeholder="Negociate"
          placeholderTextColor={COLORS.dark}
          underlineColor={COLORS.primary}
          activeUnderlineColor={COLORS.primary}
          onChangeText={(text) => setNegociate(text)}
          value={negociate}
        />
        <TextInput
          style={[styles.txtInpt,{
            marginTop: 20,
          }]}
          color={'white'}
          placeholder="Name"
          placeholderTextColor={COLORS.dark}
          underlineColor={COLORS.primary}
          activeUnderlineColor={COLORS.primary}
          onChangeText={(text) => setName(text)}
          value={name}
        />
    </View>



  );
}

export default Sponser;
