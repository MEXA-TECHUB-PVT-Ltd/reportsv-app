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
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Cart({ route, navigation }) {
  const {uniq_id}=route.params;
  const isFocused = useIsFocused();
  const refRBSheetTags = useRef();
  const [user_id, setUser_id] = useState('');
  const [email, setEmail] = useState('');
  const [total, setTotal] = useState('');
  const [name, setName] = useState('');
  const [shipping_address, setShipping_address] = useState('');
  const [data, setData] = useState([]);
  
  const [saved, setSaved] = useState(0);
  const [liked, setLiked] = useState(0);
  // bottom sheet 
  const refRBSheet = useRef();
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
  const getAllItemsinCart = async () => {
    setloading(true);
    var InsertAPIURL = base_url + '/products/getAllItemsinCart.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        uniq_id: uniq_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false);
        // console.log('response', response);
        
        if(response.cart==null) {
          setData([]);
        }
        else {
          
          setData(response.cart);
          setTotal(response.total);
        }

      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // checkout
  const checkout = async () => {
    if(shipping_address=='' || name=='') {
      setSnackDetails({
        text: 'Please fill all fields',
        backgroundColor: 'red',
      });
      onToggleSnackBar();
    } else {
      setloading(true);
      var InsertAPIURL = base_url + '/products/createOrder.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
        uniq_id:uniq_id,
        user_id:user_id,
        name:name,
        shipping_address:shipping_address,
        total_price:total,
        }),
      })
        .then(response => response.json())
        .then(response => {
          setloading(false);
          if(response[0].order_status=='pending_payment') {
          console.log('response', response);
          navigation.navigate('MakePaymentOrder',{
            uniq_id:uniq_id,
            total_price:total,
            user_id:user_id,
            email:email,
          });
          }
        })
        .catch(error => {
  
          alert('this is error' + error);
        });
    }
    

  };
  //delete item from cart
  const deleteItemFormCart = async (id) => {
    setloading(true);
    var InsertAPIURL = base_url + '/products/deleteItemFormCart.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
      id:id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false);
        console.log('response', response);
        getAllItemsinCart();
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
      setEmail(data.email)

    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }


  const renderItem = ({ item }) => (
    <>
    <List.Item
    title={
      <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
      }}
      >
        {item.name}
      </Text>
    }
    description={
      <View style={{
        flexDirection: 'row',
        width:250,
        justifyContent: 'space-between',
        marginTop:15
      }}>
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      }}>
      
      <Text style={{
        color: COLORS.light,
      }}>Price : </Text>
      <Text style={{
        marginHorizontal:5,
        color: COLORS.light,
      }}>$ {item.price}</Text>
    </View>
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      }}>
      
      <Text style={{
        color: COLORS.light,
      }}>Quantity : </Text>
      <Text style={{
        marginHorizontal:5,
        color: COLORS.light,
      }}>{item.quantity}</Text>
    </View>
    </View>
    }
    left={props => <Image source={{uri:image_url+item.image_link}} style={{width:50,height:50}} />}
    right={props => 
    <TouchableOpacity
    onPress={()=>{
      deleteItemFormCart(item.id)  
    }}
    >
    <List.Icon {...props} color={COLORS.red} size={30} icon="delete" />
    </TouchableOpacity>
    }
  />
  <Divider />
  </>
  );

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
    getAllItemsinCart()
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
          navigation.navigate('Products')
        }}
        />
        <Appbar.Content title={
          language=='en' ? 'Cart' : 'Carro'
        }
        subtitle={'Order # '+uniq_id}
          
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
          ListFooterComponent={
            data.length > 0 ? (
              <View
            style={{
              bottom:0,
              // position:'absolute',
              width:width-40,
              zIndex:999,
              justifyContent:'center',
            }}
            >
            <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            >
                <Headline>Total :</Headline>
                <Headline>$ {total}</Headline>
            </View>
            <View
            style={{
              
            }}
            >
             <TextInput 
              label={
                language=='en' ? 'Your Name' : 'Tu nombre'
              }
              onChangeText={(text)=>setName(text)}
              mode="outlined"
              activeOutlineColor={COLORS.primary}
              style={{
                marginLeft:'8%'
              }}
              />
             <TextInput 
              label={
                language=='en' ? 'Shipping Address' : 'Dirección de envío'
              }
              onChangeText={(text)=>setShipping_address(text)}
              mode="outlined"
              multiline={true}
              activeOutlineColor={COLORS.primary}
              style={{
                marginLeft:'8%',
                marginTop:10
              }}
              />
            </View>
            <View
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            >
                <Button
          mode='contained'
          style={styles.btn}
          loading={loading}
          disabled={loading}
          contentStyle={styles.btnContent}
          onPress={() =>  {
            // postanAd()
            // showDialog()
            checkout()
          }}
          >


          <Text
            style={styles.btnText}
          >
            {
              language=='en' ? 'Checkout' : 'Revisa'
            }
          </Text>
        </Button>
            </View>
            </View>
            ):null
            
          }
          ListEmptyComponent={
            <View
            style={{
              flex:1,
              justifyContent:'center',
              alignItems:'center'
            }}
            >
              <Text
              style={{
                fontSize:20,
                marginTop:width/1.2
              }}
              >{
                language=='en' ? 'No Items in Cart' : 'No hay artículos en el carrito'
              }</Text>
            </View>
          }
        />
      }
     
      </SafeAreaView>



  );
}

export default Cart;

