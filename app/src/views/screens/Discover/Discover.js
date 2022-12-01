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

} from 'react-native-paper';
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
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import BrickList from 'react-native-masonry-brick-list';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Tab = createMaterialTopTabNavigator();






// top tab bar end

function Discover({ navigation }) {
  const [news, setNews] = useState([]);
  const [newsAuthor, setNewsAuthor] = useState([]);
  const [user_id, setUser_id] = useState('');
  const isFocused = useIsFocused();
  const [value, setValue] = useState('');
  const [currentCatName, setCurrentCatName] = useState('');
  const [category, setCategory] = useState([]);
  const [authors, setAuthors] = useState([]);
  // snackbar
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });

  // bottom sheet 
  const refRBSheet = useRef();
  const refRBSheetAuthor = useRef();
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const getAllFollowCategory = async (user_id) => {
    // setloading(true)
    var InsertAPIURL = base_url + '/follow/getAllFollowCategory.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // setloading(false)
        // console.log('response', response);
        if (response[0].error == true) {
          setCategory('')
        } else {
          setCategory(response)
        }


      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const getAllFollowAuthor = async (user_id) => {
    // setloading(true)
    var InsertAPIURL = base_url + '/authors/getAll.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // setloading(false)
        // console.log('response', response);
          setAuthors(response)
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const unfollowaCategory = async (id) => {
    // setloading(true)
    var InsertAPIURL = base_url + '/follow/unfollowaCategory.php';
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
        // setloading(false)
        console.log('response', response);
        if (response[0].error == false) {
          alert(response[0].message)
          getData()
        } else {

          getData()
        }


      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const unfollowanAuthor = async (id) => {
    // setloading(true)
    var InsertAPIURL = base_url + '/follow/unfollowanAuthor.php';
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
        // setloading(false)
        console.log('response', response);
        if (response[0].error == false) {
          //  alert(response[0].message)
          getData()
        } else {

          getData()
        }


      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // get all news by cat id 
  const getAllNewsByCategoryId = async (cat_id) => {

    var InsertAPIURL = base_url + '/news/getByCategoryId.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        cat_id: cat_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        refRBSheet.current.open();
        setNews(response);
        // console.log('response', response);

      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // get all news by cat id 
  
  // get user data from async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetail')
      const data = JSON.parse(jsonValue)
      setUser_id(data.id)
      // getAllNews(data.id)
      // console.log('user id is', data.id)
      getAllFollowCategory(data.id)
      getAllFollowAuthor(data.id)
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  useEffect(() => {

    getData()
  }, [isFocused]);
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

        }}

        duration={1000}
        onDismiss={onDismissSnackBar}
      >
        {snackDetails.text}
      </Snackbar>
      <View
        style={styles.mainView}
      >

        <ImageBackground source={
          require('../../../assets/bkg_img/discvr.png')
        }
          resizeMode="contain"
          style={styles.imgBkg}>
          <Text
            adjustsFontSizeToFit={true}
            style={styles.bkgImgText}
          >DISCOVER</Text>
        </ImageBackground>
        <Headline
          style={styles.headline}
        >
          My Followed Category
        </Headline>
        <FlatList
          data={category}
          ListEmptyComponent={() => (
            <View
              style={{

                flexDirection: 'row',
                marginTop: 40,

                width: width,

              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: width / 1.1,
                }}
              >
                <Icon name="exclamation-circle" size={30} color={COLORS.light} />
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 13,
                    marginVertical: 10,
                  }}
                >
                  Not Followed Category Found
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View
              style={{

                flexDirection: 'row',
                marginTop: 40,

                width: width,

              }}
            >
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'flex-start',
                  width: width / 1.1,
                }}
              >
                <Headline
                  style={styles.headline}
                >
                   Author
                </Headline>
                <FlatList
                  data={authors}
                  // flatlist hide scroll bar
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <View
                      style={{

                        flexDirection: 'row',
                        marginTop: 40,

                        width: width,

                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          width: width / 1.1,
                        }}
                      >
                        <Icon name="exclamation-circle" size={30} color={COLORS.light} />
                        <Text
                          style={{
                            color: COLORS.light,
                            fontSize: 13,
                            marginVertical: 10,
                          }}
                        >
                          Not Followed any Author
                        </Text>
                      </View>
                    </View>
                  )}


                  renderItem={({ item }) => (
                    <View
                      style={styles.renderViewFollowTag}>
                      <TouchableOpacity
                        onPress={() => {
                          item.subscribed== true ?  
                          navigation.navigate('FeedByAuthor', {
                            author_id: item.id,
                          }) : 
                          navigation.navigate('MakePayAuthor', {
                            author_id: item.id,
                            ratePerNews: item.ratePerNews,
                            user_id: user_id,
                            email: item.email,
                          })
                          
                        }}
                      >
                        <Text style={styles.renderViewFollowTagTxt}>
                          {item.name}</Text>
                        <Text style={[styles.renderViewFollowTagTxt,{
                          color:COLORS.light,
                        }]}>
                          Rate Per News : Rs.{item.ratePerNews} </Text>
                      </TouchableOpacity>
                          {
                            item.subscribed== true ? 
                           
                        <Icon name="check-circle" size={20} color={COLORS.success} />
                      
                            :
                            <TouchableOpacity
                        onPress={
                          // () => unfollowanAuthor(item.item_id)
                          () => navigation.navigate('MakePayAuthor', {
                            author_id: item.id,
                            ratePerNews: item.ratePerNews,
                            user_id: user_id,
                            email: item.email,
                          })
                        }
                      >
                        <Icon name="plus-circle" size={20} color={COLORS.white} />
                      </TouchableOpacity>
                          }
                      
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          )}


          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contntContaner}

          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // getAllNewsByCategoryId(item.item_id);
                setCurrentCatName(item.name)
                getAllNewsByCategoryId(item.id)

              }}
              style={styles.renderTouch}
            >
              <View style={[styles.renderView, {
                backgroundColor: item.id % 2 != 0 ? COLORS.secondary : COLORS.primary,
              }]}>
                <View
                  style={styles.renderView2}
                >
                  <Image source={{
                    uri: image_url + item.image
                  }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: COLORS.white,
                    }}
                  />
                  <TouchableOpacity
                    onPress={
                      () => unfollowaCategory(item.item_id)
                    }
                  >
                    <Icon name={'minus-circle'} size={20} style={styles.shadow} color={'white'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.renderText}>
                  {item.name} {item.item_id}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />

      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.9)"
          },
          draggableIcon: {
            backgroundColor: "rgba(0,0,0,0)"
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.dark,
            height: height / 1.1,
            borderWidth: 1,

          }

        }}

      >
        <View
          style={{
            marginHorizontal: '4%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '2%',
              marginBottom: '4%',
              alignItems: 'center',
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText, {
                fontSize: 13,
              }]}
            >News By Category :   </Text>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close()
              }}
            >
              <Icon name="times-circle" size={20}
                color={COLORS.white}
                style={{

                }}
              />
            </TouchableOpacity>

          </View>



        </View>

        <BrickList
          data={news}
          listemptyComponent={<Text>Empty</Text>}
          renderItem={(prop) => {

            return (<TouchableRipple key={prop.id} style={{
              width: prop.span == 1 ? '92%' : '95%',
              marginLeft: prop.span == 1 ? '3%' : '2%',
              paddingVertical: '2%',
              borderRadius: 2,
              // backgroundColor: 'red',
              height: '100%',
            }}
              onPress={() => {
                refRBSheet.current.close()
                navigation.navigate('webDetail', {
                  news_id: prop.id,
                  userid: user_id,
                  title: prop.title,
                })

              }}
            >
              <ImageBackground source={{
                uri: image_url + prop.thunbnail_link
              }}

                resizeMode="cover"
                style={[styles.imgBkg3, {
                  width: '100%',
                  height: '100%',
                  // marginHorizontal: 10,      
                }]}>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,.9)']}
                  style={styles.linearGradient}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={[styles.imgBkgGradientViewLeft, {
                        width: prop.span == 2 ? '85%' : '65%',

                      }]}
                    >
                      <Text style={styles.imgBkgGradientViewLeftHeading}>{
                        prop.span == 1 ? prop.title.substring(0, 10) + '...' : prop.title.substring(0, 30) + '...'

                        // prop.title.length > 10 ?  : 
                      }</Text>

                      <Text
                        style={styles.imgBkgGradientViewLeftTitle}
                      >{prop.date} {prop.id}</Text>

                    </View>
                    <View
                      style={{
                        top: prop.span == 2 ? '6%' : '15%',
                      }}
                    >


                      <View
                        style={styles.imgBkgGradientViewRightRow}
                      >
                        <Text
                          style={styles.imgBkgGradientViewRightRowTxt}
                        >
                          {prop.total_comment}
                        </Text>
                        <Icon name="comments" size={20}
                          color={COLORS.white} />
                      </View>
                    </View>


                  </View>

                </LinearGradient>
              </ImageBackground>
            </TouchableRipple>)
          }}
          columns={2}
        />
      </RBSheet>



    </SafeAreaView>



  );
}

export default Discover;
