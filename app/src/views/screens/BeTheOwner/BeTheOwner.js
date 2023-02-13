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
  Appbar,
  List,
  Divider,
  Title,
   Card
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
// use is focused
import { useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function BeTheOwner({ route, navigation }) {
  const focus=useIsFocused();
  const refRBSheetTags = useRef();
  const [user_id, setUser_id] = useState('');
  const [data, setData] = useState([]);
  const [uniq_id, setUniq_id] = useState('');
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

  // getAllProducts
  const getAllProducts = async () => {
    setloading(true);
    var InsertAPIURL = base_url + '/team/getAll.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
      // body: JSON.stringify({
      //   news_id: news_id,
      //   user_id: user_id,
      // }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false);
        setData(response);
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  

  // get user data from async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetail')
      const data = JSON.parse(jsonValue)
      setUser_id(data.id)
      

    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={{
      width: width / 2 - 10,
      marginHorizontal: 5,
      marginVertical: 5,
    }}
    activeOpacity={0.8}
    onPress={() => navigation.navigate('BeTheOwnerDetail', { item: item})}
    >
      <Card
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.greylight,
      }}
      >
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
        {/* <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content> */}
        <Card.Cover source={{ uri: image_url + item.image }} 
        style={{
          height: 100,
        }}
        
        />
        <Card.Actions
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <Text
          style={{
            fontSize: 12,
            color: COLORS.grey,
            fontWeight: '900',
          }}
          >{item.team_name}</Text>
        </Card.Actions>
        <Card.Actions
        
        >
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: COLORS.greylight,
            width: '100%',
          }}
          >
          <Text
          style={{
            fontSize: 12,
            color: COLORS.grey,
            fontWeight: '900',
          }}
          >{
            language == 'en' ? 'Total Share' : 'participación total'
          }
            </Text>
          <Text
          style={{
            fontSize: 12,
            color: COLORS.grey,
            fontWeight: '900',
          }}
          >{item.total_share}</Text>
          </View>
        
        </Card.Actions>
      </Card>
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
    getData()
    getAllProducts()
    return () => { 
          setData([])
        }
  }, [focus]);
  return (


    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
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
        <Appbar.Content title={
          language == 'english' ? 'Be the Owner' : 'Ser el dueño'
        }
          subtitle={
            language == 'english' ? 'Sponser the best Team' : 'Patrocina el mejor equipo'
          }
        />
        
        <Appbar.Action icon="history" onPress={() => {
          navigation.navigate('MyTeamBuyed',{
            user_id: user_id,
          })
        }} />
      </Appbar.Header>
      {
        loading ? (
          <ActivityIndicator animating={loading}
            color={COLORS.primary}
            style={{ position: 'absolute', top: height / 2, left: width / 2, zIndex: 9999 }} />
        ) : 
        <>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          style={{ 
             flex: 1 ,
            marginHorizontal: 5,
          
          }}
        />
        </>

      }
      </SafeAreaView>



  );
}

export default BeTheOwner;
