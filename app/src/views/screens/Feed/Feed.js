import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl  ,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,

} from 'react-native';
import {
  Text,
  Button,
  Snackbar,
  Headline,
  ActivityIndicator,
  Colors,
  TouchableRipple,
  Dialog,
  Paragraph,
  FAB

} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
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
import styles from './styles';
import BrickList from 'react-native-masonry-brick-list';
import image_url from '../../../consts/image_url';
import { isConfiguredCheck } from 'react-native-reanimated/lib/reanimated2/core';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Feed({ route, navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllNews  ();
  }, []);


// FAB 
const [fab, setFab] = useState({ open: false });
  const onStateChange = ({ open }) => setFab({ open });
  const { open } = fab;
//
  const [value, setValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [news_id, setNews_id] = useState([]);
  const [user_id, setUser_id] = useState('');
  const [email, setEmail] = useState('');
  const [newsRate, setNewsRate] = useState('');
  const [author_id, setAuthor_id] = useState('');
  const [ratePerNews, setRatePerNews] = useState('');
  const [author_name, setAuthor_name] = useState('');
  // loading indicator
  const [loading, setloading] = useState(true);

  // dialog box
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  // get all category apis

  const getAllCategories = async () => {
    var InsertAPIURL = base_url + '/category/getAll.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      // body: JSON.stringify({
      //   EmailAddress: email,
      //   Password: password,

      // }),
    })
      .then(response => response.json())
      .then(response => {
        setCategories(response)
        // console.log('response', categories);

      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // get all news apis

  const getAllNews = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/news/getAll.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      // body: JSON.stringify({
      //   EmailAddress: email,
      //   Password: password,

      // }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false)
        if (response == null) {
          setNews([])
        } else {
          setNews(response)
          setRefreshing(false)
        }


      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const getAllNewsByCategoryId = async (cat_id) => {
    setloading(true)
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
        setloading(false)
        if (response == null) {
          setNews([])
        } else {
          setNews(response)
        }
        // console.log('response', response);

      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // get news rate 
  const getNewsRate = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/news/getRate.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
      // body: JSON.stringify({
      //   author_id: author_id,
      // }),
    })
      .then(response => response.json())
      .then(response => {
        // console.log('response', response);
        setNewsRate(response[0].amount)
      })
      .catch(error => {
        alert('this is error' + error);
      });

  };
  // detectSubscription
  const detectSubscription = async (author_id, user_id, title) => {
    showDialog()
    // setloading(true)
    var InsertAPIURL = base_url + '/news_subscription/detectSubscriptiononNews.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        author_id: author_id,
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        if (response[0].message == 'Subscription_Exsist') {
          setTimeout(() => {
            hideDialog()
            navigation.navigate('webDetail', {
              news_id: news_id,
              userid: user_id,
              title: title,
            })
          }, 1000);

        }
        else {
          setRatePerNews(response[0].ratePerNews)
          console.log('ratePerNews',response[0].ratePerNews)
          setAuthor_name(response[0].author_name)
          console.log('author_name',response[0].author_name)
          setTimeout(() => {
            setValue(false)
          }, 1000);
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
      setEmail(data.email);

    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  useEffect(() => {
    getData()
    getAllCategories()
    getAllNews()
    getNewsRate()


    return () => {
      setNews([]); // This worked for me
    };
  }, []);

  return (


    <SafeAreaView
      style={{
        backgroundColor: COLORS.dark,
        flex: 1,
      }}
    >


      <Dialog
      // react native paper dialog disable dismiss on touch outside
        dismissable={false}
        visible={visible} onDismiss={hideDialog}
        style={{
          zIndex: 99999,
        }}
      >{
          value == true ?

            <>
              <Dialog.Content
                style={{
                  alignSelf: 'center',
                  padding: 20,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Paragraph>Detecting Your Subscription ...</Paragraph>
                <Text
                  style={{
                    color: COLORS.red,
                    paddingVertical: 10,
                  }}
                >Don't Close the window</Text>
              </Dialog.Content>

            </>

            :

            <>
              <Dialog.Title
                style={{
                  alignSelf: 'center',
                }}
              >Paid Content</Dialog.Title>
              <Dialog.Content
                style={{
                  alignSelf: 'center',
                }}
              >
                <Paragraph>The Content is Locked</Paragraph>
              </Dialog.Content>
              <Dialog.Actions
                style={{
                  alignSelf: 'center',
                }}
              >
                <Button
                  color={COLORS.light}
                  onPress={hideDialog}>Close</Button>
                <Button
                  color={COLORS.primary}
                  onPress={() => {
                    hideDialog()
                    navigation.navigate('PaytoAuthor', {
                      author_id:author_id,
                      ratePerNews: ratePerNews,
                      user_id: user_id,
                      author_name: author_name,
                    })
                    // console.log('news_id',news_id);
                  }}>Pay to View</Button>
              </Dialog.Actions>
            </>
        }

      </Dialog>
      <FAB.Group
          style={{
            position: 'absolute',
            bottom: 60,
            zIndex: 9999,
          }}
          size={150}
          color={COLORS.white}
          fabStyle={{
            backgroundColor:COLORS.primary,
          }}
          open={open}
          visible
          icon={open ? 'close' : 'dots-vertical'}
          actions={[
            
            {
              icon: 'office-building',
              label: 'Agencia',
              color: COLORS.primary,
              onPress: () =>  navigation.navigate('Agencia'),
            },
            {
              icon: 'cash',
              label: 'Sponsor',
              color: COLORS.primary,
              onPress: () =>  navigation.navigate('Sponser'),
            },
            {
              icon: 'chess-king',
              label: 'Be The Owner',
              color: COLORS.primary,
              onPress: () => navigation.navigate('BeTheOwner'),
            },
            {
              icon: 'account',
              label: 'Become An Author',
              color: COLORS.primary,
              onPress: () =>  navigation.navigate('BecomeanAuthor'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      <View
        style={[styles.mainView,{
          zIndex:-9,
        }]}
      >


        <View style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Image source={
            require('../../../assets/logo.png')
          }
            resizeMode="contain"
            style={styles.imgBkg} />
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              width: '50%',
              marginRight: 10,
            }}
          >ReporteSV</Text>
          
          <TouchableOpacity
            style={[styles.liveBtn, {
              alignSelf: 'center'
            }]}
            onPress={() => {
              navigation.navigate('Products')
            }}
          >
            <Icon name="tshirt" size={20}
              color={COLORS.secondary} />
              <Text 
              style={{
                color:COLORS.secondary,
                fontSize:10,
                fontWeight:'bold',

              }}
              >Store</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}

          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={

            categories.length > 0 ?
              <TouchableOpacity
              activeOpacity={0.8}
                onPress={() => {
                  getAllNews();
                }}
                style={styles.renderTouch}
              >
                <Text style={[styles.renderText, {
                  backgroundColor: COLORS.white,
                  color: COLORS.dark,
                }]}>
                  All Category
                </Text>
              </TouchableOpacity> : null


          }
          contentContainerStyle={styles.contntContaner}

          renderItem={({ item }) => (
            <TouchableOpacity
            activeOpacity={0.8}
              onPress={() => {
                getAllNewsByCategoryId(item.id);
              }}
              style={styles.renderTouch}
            >
              <Text style={[styles.renderText, {
                backgroundColor: item.color,
              }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true}
        />
        {
          loading == true ? <ActivityIndicator animating={true} color={COLORS.primary} /> :

            news == null ?

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.white

                }}
              >
                <Text style={{
                  color: COLORS.white,
                }}>No News</Text>
              </View> :
              <View
                style={{
                  height: height * 0.72,
                  zIndex: -99,
                  // paddingBottom: 1,
                }}
              >
                <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                >
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
                        setNews_id(prop.id)
                        setValue(true)
                        setAuthor_id(prop.author_id)

                        if (prop.author_id != 0) {
                          
                          detectSubscription(prop.author_id, user_id, prop.title)
                        }
                        else {
                          navigation.navigate('webDetail', {
                            news_id: prop.id,
                            userid: user_id,
                            title: prop.title,
                          })
                        }


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
                              <Text style={styles.imgBkgGradientViewLeftHeading}>
                                {
                                  prop.span == 1 ? prop.title.substring(0, 6) + '.. ' : prop.title.substring(0, 30) + '...'
                                }
                                
                              </Text>


                                <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  width: '50%',
                                  marginTop: 5,
                                }}
                                >
                              <Text
                                style={styles.imgBkgGradientViewLeftTitle}
                              >{prop.date}
                               
                                </Text>
                              <Text
                                style={[styles.imgBkgGradientViewLeftTitle,{
                                  marginLeft: 5,
                                }]}
                              >
                               {
                                  prop.author_id == 0 ? null : <Icon name="lock" size={15}  color={COLORS.white} />
                              }
                                </Text>
                                </View>
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
                </ScrollView>

              </View>


        }


      </View>



    </SafeAreaView>



  );
}

export default Feed;
