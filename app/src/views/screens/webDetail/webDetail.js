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
  Appbar
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function LiveStream({ route, navigation }) {
  const scrollRef = useRef();
  const webviewRef = useRef();

  const refRBSheetTags = useRef();
  const {news_id, userid,title,navigation_to } = route.params;
  console.log('title', title);
  const [user_id, setUser_id] = useState('');
  const [cat_id, setCat_id] = useState('');
  const [categoryFollowed, setCategoryFollowed] = useState('');
  const [authorFollowed, setAuthorFollowed] = useState('');
  const [author_id, setAuthor_id] = useState('');
  const [comment, setComment] = useState('');
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

  // flatlsit end
  // send data to webview
  function sendDataToWebView() {
    webviewRef.current.postMessage('Data from React Native App');
  }

  function onMessage(data) {
    // console.log(data.nativeEvent.data)
    let x = JSON.parse(data.nativeEvent.data);
    setSaved(x.bookmark_status);
    setLiked(x.liked_status);
    setCat_id(x.category_id);
    setAuthor_id(x.author_id);
    setCategoryFollowed(x.categoryFollowed);
    setAuthorFollowed(x.authorFollowed);
  }
  
  
  // add a  comment
  const addComment = async () => {
    if (comment.length == 0) {

    } else {
      refRBSheet.current.close();

      var InsertAPIURL = base_url + '/comment/addACommentOnNews.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          news_id: news_id,
          user_id: user_id,
          comment: comment,
        }),
      })
        .then(response => response.json())
        .then(response => {
          setloading(false)
          if (response[0].error == false) {
            setSnackDetails({
              text: response[0].message,
              backgroundColor: COLORS.success,
            });
            setTimeout(() => {

              onToggleSnackBar()

            }, 100);
          } else {

            setSnackDetails({
              text: response[0].message,
              backgroundColor: COLORS.red,
            });
            onToggleSnackBar()


          }

        })
        .catch(error => {

          alert('this is error' + error);
        });
    }
  };
  // add a  comment end
  // save a news
  const saveaNews = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/save/saveaNews.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        news_id: news_id,
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false)
        console.log(response)
        if (response[0].error == false && response[0].message == 'News Saved') {
          setSaved(1)
        }

        else if (response[0].error == true) {

          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar()
        }
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };

  // like a news
  const likeaNews = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/like/likeaNews.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        news_id: news_id,
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false)
        console.log(response)
        if (response[0].error == false && response[0].message == 'News liked') {
          setLiked(1)
        }
        else if (response[0].error == false && response[0].message == 'News unliked') {
          setLiked(0)
        }
        else if (response[0].error == true) {

          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar()
        }
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };


  // follow a  category 
  const followaCategory = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/follow/followaCategory.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        cat_id: cat_id,
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false)
        console.log(response)
        if (response[0].error == false) {
         setCategoryFollowed(1)        
         setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          setTimeout(() => {
            onToggleSnackBar()
          }, 100);
        } else {
         
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar()
        }
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // follow and author 
  const followanAuthor = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/follow/followanAuthor.php';
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
        setloading(false)
        console.log(response)
        if (response[0].error == false) {
          setAuthorFollowed(1)
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          setTimeout(() => {
            onToggleSnackBar()
          }, 100);
        } else {
         
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar()
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

    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  useEffect(() => {

    getData()
    sendDataToWebView()
    console.log(news_id)
  }, []);
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
          
          if(navigation_to=='Feed') {
            navigation.navigate('Feed')
          }
          else{
            navigation.goBack()
          }
        }}
        />
        <Appbar.Content title="News Details"
        // subtitle="News Details"
        />


      </Appbar.Header>


      <WebView
        ref={webviewRef}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        automaticallyAdjustContentInsets={true}
        onMessage={onMessage}
        style={{
          height: height,
          width: width,
        }}
        source={{ uri: 'http://teamsuit.co/reportSv/viewaNews.php?news_id=' + news_id + '&user_id=' + userid }} />




      <Appbar.Header
        style={{
          backgroundColor: COLORS.dark,

        }}
      >

        <Appbar.Content
          onPress={() => {
            console.log('pressed')
            navigation.navigate('CommentList', {
              news_id: news_id,
              title: title,
            })
          }}
          title="All Comment"

          titleStyle={{
            fontSize: 10,
            color: COLORS.white,
            backgroundColor: COLORS.secondary,
            alignSelf: 'center',
            padding: 7,
            borderRadius: 15,
            alignSelf: 'flex-start',
          }}
        />
        <Appbar.Action icon="comment" color={COLORS.light} onPress={() => {
          refRBSheet.current.open()
        }} />
        <Appbar.Action icon="playlist-plus" color={
          categoryFollowed? COLORS.secondary : COLORS.light
        }
        onPress={() => {
          followaCategory()
        }} />
        {/* <Appbar.Action icon="playlist-plus" color={
          authorFollowed? COLORS.secondary : COLORS.light
        } onPress={() => {
          followanAuthor()
        }} /> */}
        
        <Appbar.Action icon="thumb-up" color={
          liked ? COLORS.secondary : COLORS.light
        } onPress={() => {
          likeaNews()
        }} />

        <Appbar.Action icon="bookmark"
          color={
            saved ? COLORS.secondary : COLORS.light
          } onPress={() => {
            saveaNews()
          }}
        />

      </Appbar.Header>


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
            height: height / 2.5,
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
              paddingHorizontal: '6%',

            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText, {
                marginVertical: '2%',
              }]}
            >Add a Comment</Text>
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
          <TextInput
            style={styles.txtInpt}
            color={'white'}
            placeholder="Add comment here"
            placeholderTextColor={COLORS.white}
            multiline={true}
            numberOfLines={4}
            underlineColor='white'
            activeUnderlineColor='white'
            mode="Flat"
            maxHeight={100}
            onChangeText={text => setComment(text)}
          />
          <Button
            mode='contained'
            style={styles.btn}
            contentStyle={styles.btnContent}
            onPress={() => {
              addComment()
            }}
          >
            <Text
              style={styles.btnText}
            >ADD COMMENT
            </Text>
          </Button>



        </View>


      </RBSheet>
    </SafeAreaView>



  );
}

export default LiveStream;
