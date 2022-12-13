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

function ProductDetail({ route, navigation }) {
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
        if (response[0].exsist == false) {
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
          <Appbar.Content title="Product Detail"
          // subtitle="Purchase your favorite products"
          />
          <Appbar.Action icon="cart" onPress={() => {
            navigation.navigate('Cart', {
              uniq_id: uniq_id,
            })
          }} />
        </Appbar.Header>

        <Dialog visible={visible1}
          style={{
            zIndex: 999,
          }}
          onDismiss={hideDialog}>
          <Menu
            visible={menuVisible2}
            onDismiss={closeMenu2}
            style={{
              width: '70%',
              alignSelf: 'center',
              paddingTop: '20%',
              marginLeft: '6%',
              height: 200
            }}
            anchor={<TouchableOpacity
              style={{
                marginHorizontal: '4%',
                padding: '6%',
                backgroundColor: 'red',
                marginTop: '5%',
                width: '85%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: COLORS.light
              }}
              onPress={openMenu2}>
              <Text>{activeTextSize}</Text>
            </TouchableOpacity>}>
            {
              item.s == 1 ?
                <Menu.Item
                  style={{
                    flexDirection: 'row',
                    width: width,
                    textAlign: 'flex-start',
                  }}
                  onPress={
                    () => {
                      setActiveTextSize('small')
                      setActiveText('s')
                      closeMenu2()
                    }}
                  title={'Small'} />
                : null
            }
            {
              item.m == 1 ?
                <Menu.Item
                  style={{
                    flexDirection: 'row',
                    width: width,
                    textAlign: 'flex-start',
                  }}
                  onPress={
                    () => {
                      setActiveTextSize('Medium')
                      setActiveText('m')
                      closeMenu2()
                    }}
                  title={'Medium'} />
                : null
            }
            {
              item.l == 1 ?
                <Menu.Item
                  style={{
                    flexDirection: 'row',
                    width: width,
                    textAlign: 'flex-start',
                  }}
                  onPress={
                    () => {
                      setActiveTextSize('Large')
                      setActiveText('l')
                      closeMenu2()
                    }}
                  title={'Large'} />
                : null
            }
            {
              item.xl == 1 ?
                <Menu.Item
                  style={{
                    flexDirection: 'row',
                    width: width,
                    textAlign: 'flex-start',
                  }}
                  onPress={
                    () => {
                      setActiveTextSize('X Large')
                      setActiveText('xl')
                      closeMenu2()
                    }}
                  title={'X Large'} />
                : null
            }
            {
              item.xxl == 1 ?
                <Menu.Item
                  style={{
                    flexDirection: 'row',
                    width: width,
                    textAlign: 'flex-start',
                  }}
                  onPress={
                    () => {
                      setActiveTextSize('XX Large')
                      setActiveText('xxl')
                      closeMenu2()
                    }}
                  title={'XX Large'} />
                : null
            }

          </Menu>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            style={{
              width: '70%',
              alignSelf: 'center',
              marginTop: '17%',
              marginLeft: '6%',
              height: 200
            }}
            anchor={<TouchableOpacity
              style={{
                marginHorizontal: '4%',
                padding: '6%',
                backgroundColor: 'red',
                marginTop: '5%',
                width: '85%',
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: COLORS.light
              }}
              onPress={openMenu}>
              <Text>{activeTextColor}</Text>
            </TouchableOpacity>}>
            {/* {
              colors.map((index,n) => {
                return(
                  <Menu.Item onPress={() => {}} title={n.color} />
                )
              })
             } */}
            <FlatList
              style={{
                paddingBottom: 10,
                width: "100%"
              }}
              ListEmptyComponent={() => {
                return (
                  <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width - 100,
                      backgroundColor: COLORS.greylight,
                      textAlign: 'center',
                    }}
                    onPress={() => {
                      setActiveColor('')
                      setActiveTextColor('No Color for this Product')
                      closeMenu()
                    }} title={
                      <Text
                        style={{
                          color: COLORS.light,
                          fontSize: 13
                        }}
                      >No Colors for This Product</Text>
                    } />

                )
              }}
              data={colors}
              renderItem={({ item }) => {
                return (
                  <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                        setActiveColor(item.color)
                        setActiveTextColor(
                          <View
                            style={{
                              backgroundColor: item.color,
                              width: 200,
                              height: 30,
                              borderRadius: 5,
                              color: item.color,
                              alignSelf: 'center'
                            }}
                          ></View>
                        )
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: item.color,
                            width: 130,
                            height: 30,
                            borderRadius: 5,
                            color: item.color,
                            alignSelf: 'flex-start'
                          }}
                        >
                          S
                        </Text>

                      </View>
                    } />

                )
              }}
              keyExtractor={item => item.id}
            />
          </Menu>
          <Dialog.Content>
            <TextInput
              style={{
                marginTop: 10
              }}
              onChangeText={(text) => setQuantity(text)}
              mode="outlined"
              keyboardType='numeric'
              maxLength={2}
              placeholder={'Add Quantity'}
              activeOutlineColor={COLORS.primary}
            />
          </Dialog.Content>
          <Divider style={{
            width: width - 100,
            height: 1,
            alignSelf: 'center',
            borderWidth: .5,
            borderColor: COLORS.light
          }} />
          <Dialog.Actions
            style={{
              justifyContent: 'center',
            }}
          >
            <Button
              color={COLORS.primary}
              onPress={
                () => {
                  addToCart()
                }
                // hideDialog
              }>Add to Cart</Button>
          </Dialog.Actions>
        </Dialog>
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
                  paddingTop: 10,
                }}
              >
                <Title
                  style={{
                    color: COLORS.primary,
                    textTransform: "capitalize"
                  }}
                >{item.name}</Title>
                <Title>$ {item.price} </Title>
              </View>
              <Headline
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >Colors Available :</Headline>
              <FlatList
                style={{
                  paddingBottom: 10
                }}
                ListEmptyComponent={() => {
                  return (
                    <Text
                      style={{
                        flexDirection: 'row',
                        width: width - 50,
                        backgroundColor: COLORS.greylight,
                        textAlign: 'center',
                        padding: 10,
                        borderRadius: 5,
                        color: COLORS.light

                      }}
                    >No Colors for This Product</Text>
                  )
                }}
                data={colors}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => {
                  return (
                    <Text
                      style={{
                        backgroundColor: item.color,
                        padding: '1%',
                        width: 30,
                        height: 30,
                        textAlign: 'center',
                        borderRadius: 5,
                        color: item.color,
                        borderColor: COLORS.dark,
                        marginHorizontal: 5
                      }}
                    >
                      S
                    </Text>
                  )
                }}
                keyExtractor={item => item.id}
              />
              <View>
                <Headline
                  style={{
                    fontSize: 16
                  }}
                >Sizes Available :</Headline>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    marginHorizontal: 5
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: item.s == 1 ? COLORS.secondary : COLORS.greylight,
                      padding: '2%',
                      width: 50,
                      textAlign: 'center',
                      borderRadius: 5,
                      color: item.s == 1 ? COLORS.white : COLORS.dark,
                      borderWidth: item.s == 1 ? 0 : 1,
                      borderColor: COLORS.light
                    }}
                  >
                    S
                  </Text>
                  <Text
                    style={{
                      backgroundColor: item.m == 1 ? COLORS.secondary : COLORS.greylight,
                      padding: '2%',
                      width: 50,
                      textAlign: 'center',
                      borderRadius: 5,
                      color: item.m == 1 ? COLORS.white : COLORS.dark,
                      borderWidth: item.m == 1 ? 0 : 1,
                      borderColor: COLORS.light,
                      marginLeft: 10
                    }}
                  >
                    M
                  </Text>
                  <Text
                    style={{
                      backgroundColor: item.l == 1 ? COLORS.secondary : COLORS.greylight,
                      padding: '2%',
                      width: 50,
                      textAlign: 'center',
                      borderRadius: 5,
                      color: item.l == 1 ? COLORS.white : COLORS.dark,
                      borderWidth: item.l == 1 ? 0 : 1,
                      borderColor: COLORS.light,
                      marginLeft: 10
                    }}
                  >
                    L
                  </Text>
                  <Text
                    style={{
                      backgroundColor: item.xl == 1 ? COLORS.secondary : COLORS.greylight,
                      padding: '2%',
                      width: 50,
                      textAlign: 'center',
                      borderRadius: 5,
                      color: item.xl == 1 ? COLORS.white : COLORS.dark,
                      borderWidth: item.xl == 1 ? 0 : 1,
                      borderColor: COLORS.light,
                      marginLeft: 10
                    }}
                  >
                    XL
                  </Text>
                  <Text
                    style={{
                      backgroundColor: item.xxl == 1 ? COLORS.secondary : COLORS.greylight,
                      padding: '2%',
                      width: 50,
                      textAlign: 'center',
                      borderRadius: 5,
                      color: item.xxl == 1 ? COLORS.white : COLORS.dark,
                      borderWidth: item.xxl == 1 ? 0 : 1,
                      borderColor: COLORS.light,
                      marginLeft: 10
                    }}
                  >
                    XXL
                  </Text>

                </View>

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
                    onPress={() => {
                      navigation.navigate('Cart', {
                        uniq_id: uniq_id,
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
                    onPress={() => {
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
        </ScrollView>
      </SafeAreaView>
    </Provider>


  );
}

export default ProductDetail;
