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
   Card,
   Dialog,
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
import { color } from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ProductDetail({ route, navigation }) {
  const {item,uniq_id}=route.params;
  console.log('uniq_id',uniq_id);
  const refRBSheetTags = useRef();
  const [user_id, setUser_id] = useState('');
  const [exsist, setExsist] = useState(false);
  const [btnText, setBtnText] = useState('Loading...');
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState('');
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
  //dialog 
  const [visible1, setVisible1] = React.useState(false);
  const showDialog = () => setVisible1(true);
  const hideDialog = () => setVisible1(false);
  // getAllProducts
  const addToCart = async () => {
    if(quantity=='' || quantity==0){
      setSnackDetails({
        text: 'Please enter quantity',
        backgroundColor: 'red',
      });
      onToggleSnackBar();
      return;
    }
    else {
      setBtnText('Adding in cart...');
      hideDialog();
      setloading(true);
      var InsertAPIURL = base_url + '/products/addtoCart.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          uniq_id: uniq_id,
          p_id: item.id,
          user_id: user_id,
          quantity: quantity,
        }),
      })
        .then(response => response.json())
        .then(response => {
          setloading(false);
          setSnackDetails({
            text: response[0].message,
            backgroundColor:'#05AA6D',
          });
          onToggleSnackBar();
          setExsist(true);
          console.log(response);
        })
        .catch(error => {
  
          alert('this is error' + error);
        });
    }
  };
  // Chck allready in cart
  const checkAlreadyinCart = async (id) => {
    setloading(true);
    var InsertAPIURL = base_url + '/products/checkAlreadyinCart.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        uniq_id: uniq_id,
        p_id: item.id,
        user_id: id,
      })
    })
      .then(response => response.json())
      .then(response => {
        setloading(false);
        setExsist(response[0].exsist);
        if(response[0].exsist==false) {
          setBtnText('Add to cart');
        }
        else {
          setBtnText('Go to cart');
        }
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
      checkAlreadyinCart(data.id);

    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }



  useEffect(() => {

    getData()
    // getAllProducts()
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
        <Appbar.Content title="Product Detail"
          // subtitle="Purchase your favorite products"
        />
        <Appbar.Action icon="cart" onPress={() => {
          navigation.navigate('Cart',{
            uniq_id:uniq_id,
          })
        }} />
      </Appbar.Header>
      
      <Dialog visible={visible1}
        style={{
          zIndex: 999,
        }}
      onDismiss={hideDialog}>
            <Dialog.Title>Add Quantity</Dialog.Title>
            <Dialog.Content>
              <TextInput 
              onChangeText={(text)=>setQuantity(text)}
              mode="outlined"
              keyboardType='numeric'
              maxLength={2}
              activeOutlineColor={COLORS.primary}
              />
            </Dialog.Content>
            <Dialog.Actions
            style={{
              justifyContent:'center',
            }}
            >
              <Button 
              color={COLORS.primary}
              onPress={
                ()=>{
                  addToCart()
                }
                // hideDialog
                }>Add to Cart</Button>
            </Dialog.Actions>
          </Dialog>
      <Card
      style={{
        width: width  - 10,
        marginHorizontal: 5,
        marginVertical: 15,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.greylight,
        zIndex: -9,
      }}
      >
        <Card.Cover source={{ uri: image_url + item.image_link }} 
        style={{
          height: 300,
        }}
        
        />
        <Card.Content>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
          >
          <Title>{item.name}</Title>
          <Title>$ {item.price} </Title>
          </View>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content> 
        <Card.Actions
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        > 
        {
          exsist ? <>
           <Button
          mode='outlined'
          color={COLORS.primary}
          style={{
            width: width / 2 - 20,
            borderWidth: 1,
            borderRadius: 25,
            marginVertical: 10,
            borderColor: COLORS.primary,
          }}
          contentStyle={{
            height: 40,
            backgroundColor: COLORS.white,
           
          }}
          onPress={() =>  {
            navigation.navigate('Cart',{
              uniq_id:uniq_id,
            })
            // postanAd()
            // showDialog()
          }}
          >


          <Text
            style={{
              color: COLORS.primary,
            }}
          >
            Go to Cart
          </Text>
        </Button>
          </> :
          <Button
          mode='contained'
          style={styles.btn}
          loading={loading}
          disabled={loading}
          contentStyle={styles.btnContent}
          onPress={() =>  {
            // postanAd()
            showDialog()
          }}
          >


          <Text
            style={styles.btnText}
          >
            {
              btnText
            }
          </Text>
        </Button>
        }
          
        </Card.Actions>
      </Card>
    </SafeAreaView>



  );
}

export default ProductDetail;
