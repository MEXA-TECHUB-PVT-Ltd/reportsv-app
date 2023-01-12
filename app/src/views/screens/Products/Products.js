import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Products({ route, navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getAllProducts  ();
  }, []);


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
    var InsertAPIURL = base_url + '/products/getAll.php';
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
        setRefreshing(true);
        setloading(false);
        setData(response);
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const getOrderId = async (id) => {
    setloading(true);
    var InsertAPIURL = base_url + '/products/getOrderId.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setUniq_id(response[0].uniq_id);
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
      getOrderId(data.id)

    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={{
      width: width / 3 - 10,
      marginHorizontal: 5,
      marginVertical: 5,
    }}
    activeOpacity={0.8}
    onPress={() => navigation.navigate('ProductDetail', { item: item, uniq_id: uniq_id })}
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
        <Card.Cover source={{ uri: image_url + item.image_link }} 
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
          >{item.name}</Text>
          <Text
          style={{
            fontSize: 12,
            color: COLORS.grey,
            fontWeight: '900',
          }}
          >$ {item.price}</Text>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );

  useEffect(() => {

    getData()
    getAllProducts()
  }, []);
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
        <Appbar.Content title="Store"
          subtitle="Purchase your favorite products"
        />
        <Appbar.Action icon="history" onPress={() => {
          navigation.navigate('OrderHistory',{
            user_id: user_id,
          })
        }} />
        <Appbar.Action icon="cart" onPress={() => {
          navigation.navigate('Cart',{
            uniq_id: uniq_id,
          })
        }} />
      </Appbar.Header>
      {
        loading ? (
          <ActivityIndicator animating={loading}
            color={COLORS.primary}
            style={{ position: 'absolute', top: height / 2, left: width / 2, zIndex: 9999 }} />
        ) : <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
        pullToRefresh={refreshing}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          style={{ 
            //  /flex: 1 ,
            // marginHorizontal: 5,
          
          }}
        />

      }
      </SafeAreaView>



  );
}

export default Products;
