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
  TextInput,
  Menu,
  Provider
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function BeTheOwnerDetail({ route, navigation }) {
  const { item, uniq_id } = route.params;
  const [user_id, setUser_id] = useState('');
  const [exsist, setExsist] = useState(false);
  const [btnText, setBtnText] = useState('Loading...');
  const [quantity, setQuantity] = useState('');
  const [colors, setColors] = useState(item.colors);
  // sizes
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const [xl, setXl] = useState(0);
  const [xxl, setXxl] = useState(0);
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
  // menu 
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisible2, setMenuVisible2] = useState(false);
  const [activeTextColor, setActiveTextColor] = useState('Select Color');
  const [activeTextSize, setActiveTextSize] = useState('Select Size');
  const [activeText, setActiveText] = useState();
  const [activeColor, setActiveColor] = useState();
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openMenu2 = () => setMenuVisible2(true);
  const closeMenu2 = () => setMenuVisible2(false);

  // getAllProducts
  const addToCart = async () => {
    
    if (activeText == '' || activeText == 0) {
      hideDialog()
      setSnackDetails({
        text: 'Please Select Size of a Product',
        backgroundColor: 'red',
      });
      onToggleSnackBar();
      return;
    }
    if (activeColor == '' || activeColor == 0) {
     
      setSnackDetails({
        text: 'Please Select Color of a Product',
        backgroundColor: 'red',
      });
      hideDialog()
      onToggleSnackBar();
      return;
    }
    if (quantity == '' || quantity == 0) {
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
      console.log(activeText,activeColor)
      var InsertAPIURL = base_url + '/products/addtoCart.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data =JSON.stringify({
        uniq_id:uniq_id,
        p_id:item.id,
        user_id:user_id,
        quantity:quantity,
        size:activeText,
        color:activeColor
      })
      // console.log(data)
      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: data
      })
        .then(response => response.json())
        .then(response => {
          setloading(false);
          setSnackDetails({
            text: response[0].message,
            backgroundColor: '#05AA6D',
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



  useEffect(() => {
    getData()
    // getAllProducts()
  }, []);

  return (

    <Provider>
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
          <Appbar.Content title="Sponser Detail"
          // subtitle="Purchase your favorite products"
          />
          
        </Appbar.Header>

       
        <ScrollView
          style={{
            zIndex: -9
          }}
        >

          <Card
            style={{
              width: width - 10,
              marginHorizontal: 5,
              marginVertical: 15,
              borderRadius: 5,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: COLORS.greylight,
              zIndex: -9,
            }}
          >
            <Card.Cover source={{ uri: image_url + item.image }}
              style={{
                height: 300,
              }}

            />
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}
              >
                <Title
                  style={{
                    color: COLORS.primary,
                    textTransform: "capitalize"
                  }}
                >{item.team_name}</Title>
              </View>
          
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
              >
                <Text>Total Share</Text>
                <Text>{item.total_share}</Text>
              </View>
              <Text
              style={{
                fontSize: 16,
                color:COLORS.primary
              }}
              >
                Share Available
              </Text>
              <Paragraph
              style={{
                padding:10
              }}
              >{item.description}</Paragraph>
              {
                item.shares.map((item,index)=>{
                  return(
                    <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      alignItems:'center',
                      marginBottom:5,
                      borderRadius:5,
                      borderBottomWidth:.5,
                      borderBottomColor:COLORS.greylight
                    }}
                    >
                      <Text>{item.share_name}</Text>
                      <Text>$ {item.share_price}</Text>
                      {
                        item.sold == 1 ? 
                        <View
                     
                      style={{
                        backgroundColor:COLORS.greylight,
                        padding:4,
                        borderRadius:5,
                        width:50,
                        alignItems:'center',
                        
                      }}
                      >
                      <Text
                      style={{
                        color:COLORS.light
                      }}
                      >Sold</Text>
                      </View>
                        :
                        <TouchableOpacity
                      activeOpacity={.6}
                      onPress={()=>{
                        // showDialog()
                        console.log(item)
                        navigation.navigate('BuyOwner',{
                          share_id:item.share_id,
                          price:item.share_price,
                          user_id:user_id,
                          share_name:item.share_name,
                        })
                      }}
                      style={{
                        backgroundColor:COLORS.primary,
                        padding:4,
                        borderRadius:5,
                        width:50,
                        alignItems:'center',
                        
                      }}
                      >
                      <Text
                      style={{
                        color:COLORS.white
                      }}
                      >Buy</Text>
                      </TouchableOpacity>
                      }
                      
                    </View>
                  )
                }
                )
              }
            </Card.Content>
           
           
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Provider>


  );
}

export default BeTheOwnerDetail;
