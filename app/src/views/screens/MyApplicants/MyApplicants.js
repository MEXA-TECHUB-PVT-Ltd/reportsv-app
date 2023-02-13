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

  FlatList,
  TouchableWithoutFeedback,
  Linking
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
  Appbar,
  List,
  Divider,
  Title,
   Card,
   TextInput,
   Badge
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
import { color } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function MyApplicants({ route, navigation }) {
  const isFocused = useIsFocused();  
  const [data, setData] = useState([]);
  const {item,user_id}= route.params;
  console.log('item', item.id);
  const flatListRef=useRef();
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

  // getAllProducts
  const getAllOrderofUser = async () => {
    setloading(true);
    var InsertAPIURL = base_url + '/agencia/getApplicantsByJobId.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        agencia_id: item.id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false);
        console.log('response', response);
        if(response==null) {
          setData([]);
        }
        else {
          setData(response); 
        }
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const deleteJob = async (id) => {
    setloading(true);
    var InsertAPIURL = base_url + '/agencia/deleteJob.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false);
        if(response[0].error==false) {
          setSnackDetails({
            text: 'Job Deleted Successfully',
            backgroundColor: COLORS.success,
          });
          onToggleSnackBar();
          getAllOrderofUser()
        } else {
          setSnackDetails({
            text: 'Error in Deleting Job',
            backgroundColor: COLORS.green,
          });
        }
        
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => {
      navigation.navigate('AgenciaDetail', {
        item: item,
      });
    }}
    >
    <List.Item
    title={
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:width*0.70,
        // width: width * 0.76,
        // backgroundColor: COLORS.red,
      }}
      >
      <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
      }}
      >{
        language=='en'?'User':'Usuaria'
      } : {item.name}
      </Text>
     
    
      </View>
    }
    description={()=>{
      return(
        <View>
        <Text>{
          language=='en'?'Contact':'Contacto'
          } : {item.contact}</Text>
        <Text>
          {
            language=='en'?'Applied at':'Aplicado en'
          } : {item.comment}</Text>
        <Text>
          {
            language=='en'?'Comments':'Comentarios'

          }
           : {item.comment}</Text>
      </View>
      )
    }}
   
  />
  <Divider 
  style={{
    backgroundColor: COLORS.greylight,
    height:1
  }}
  />
  </TouchableOpacity>
  );
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
   
    getAllOrderofUser()
    // getData()
    return () => {
      setData({}); // This worked for me
      
    };
  }, [isFocused]);
  return (


    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
      }}
    >
      {/* react narive floating button */}
      
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
          navigation.goBack();
        }}
        />
        <Appbar.Content title={item.job_title}
        subtitle={item.job_type}

        />
        
       
      </Appbar.Header>
      {
        loading ? (
          <ActivityIndicator animating={loading}
            color={COLORS.primary}
            style={{ position: 'absolute', top: height / 2, left: width / 2, zIndex: 9999 }} />
        ) : <FlatList
        ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          
          style={{ 
             flex: 1 ,
            marginHorizontal: 5,
          }}
         
          ListEmptyComponent={()=>{
             return (<View
             style={{
              alignContent:'center',
              justifyContent:'center',
              alignItems:'center',
              alignSelf:'center',
              width:width,
              height:height/1.2
            }}
             >
              <Text
              style={{
                alignSelf:'center'
              }}
              >{
                language=='en' ? 'No Applications Yet' : 'Aún no hay aplicaciones'
              }</Text>
          </View>)
          }}
          />
      }
      </SafeAreaView>



  );
}

export default MyApplicants;

