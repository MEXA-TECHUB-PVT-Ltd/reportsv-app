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
  const refRBSheetTags = useRef();
  const { news_id } = route.params;
  const [user_id, setUser_id] = useState('');
  const [activeTagId, setActiveTagId] = useState('');
  const [activeTagName, setActiveTagName] = useState('');
  const [comment, setComment] = useState('');
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [moreNews, setMoreNews] = useState([]);
  const [tagNews, setTagNews] = useState([]);
  const [saved, setSaved] = useState();
  // loading btn
  const [loading, setloading] = useState(false);


  // bottom sheet 
  const refRBSheet = useRef();
  // bottom sheet end
  // snackbar
  const [visible, setVisible] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  
  // flatlsit end
  const getaNewsById = async (news_id) => {
    setloading(true)
    var InsertAPIURL = base_url + '/news/getaNewsById.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        news_id: news_id,
        user_id: user_id
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false)
        if (response == null) {
          setNews([])
        } else {
          setNews(response[0])
          setTags(response[0].tags)
          setComments(response[0].comments)
          setMoreNews(response[0].more_news)
          if (response[0].saved[0].exsist == false) {
            setSaved(false)
          } else {
            setSaved(true)
          }

        }
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  const getNewsByTagId = async (tag_id) => {
    setloading(true)
    var InsertAPIURL = base_url + '/news/getNewsByTagId.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        tag_id: tag_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setloading(false)
        if (response == null) {
          setTagNews([])
        } else {
          // console.log(response)
          setTagNews(response)
          refRBSheetTags.current.open()
        }
      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // add a  comment
  const addComment = async () => {
    if(comment.length == 0){
     
    }else{
    setloading(true)
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
          refRBSheet.current.close();
          // alert(response[0].message)
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          setTimeout(() => {

            onToggleSnackBar()
            getaNewsById(news_id, user_id)
          }, 100);
        } else {
          refRBSheet.current.close();
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
        if (response[0].error == false) {
          refRBSheet.current.close();
          // alert(response[0].message)
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          setTimeout(() => {

            onToggleSnackBar()
            getaNewsById(news_id, user_id)
            setSaved(true)
          }, 100);
        } else {
          refRBSheet.current.close();
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar()
          getaNewsById(news_id, user_id)
          setSaved(true)


        }

      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // follow a  category 
  const followaCategory = async (cat_id,user_id) => {
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
          refRBSheet.current.close();
          // alert(response[0].message)
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          setTimeout(() => {
              onToggleSnackBar()
          }, 100);
        } else {
          refRBSheet.current.close();
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
  const followanAuthor = async (author_id,user_id) => {
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
          refRBSheet.current.close();
          // alert(response[0].message)
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          setTimeout(() => {
              onToggleSnackBar()
          }, 100);
        } else {
          refRBSheet.current.close();
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
      getaNewsById(news_id)
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  useEffect(() => {

    getData()
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

        }}

        duration={1000}
        onDismiss={onDismissSnackBar}
      >
        {snackDetails.text}
      </Snackbar>
      <ScrollView
      ref={scrollRef}
        contentContainerStyle={styles.mainView}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            paddingVertical: 10,

          }}
        >


          <Icon name="arrow-left" size={24} color={COLORS.white}
            style={{
              padding: '2%',
              top:10

            }}
            onPress={() => {
              navigation.navigate('Feed')
            }}
          />

          {
            saved == false ?
              <View
                style={{
                  flexDirection: 'row',

                }}
              >
                <TouchableOpacity
                  style={styles.renderTouch}
                  
                  onPress={() => {
                    followanAuthor(news.author_id,user_id)
                  }}
                >

                  <Text style={[styles.renderText, {
                    backgroundColor: COLORS.secondary,
                    // fontSize: 1,

                  }]}>
                    <Icon name="plus" size={15} style={styles.shadow} color={'white'} />
                    {'  ' + news.author_name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.renderTouch}
                  onPress={() => {
                    followaCategory(news.category_id,user_id)
                  }}
                >

                  <Text style={[styles.renderText, {
                    backgroundColor: COLORS.primary,
                    // fontSize: 16,

                  }]}>
                    <Icon name="plus" size={15} style={styles.shadow} color={'white'} />
                    {'  ' + news.category_name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.renderTouch, {
                    width: 70,
                  }]}
                  onPress={() => {
                    saveaNews()
                  }}
                >

                  <Text style={[styles.renderText, {
                    backgroundColor: COLORS.white,
                    // fontSize: 16,
                    color: COLORS.dark,
                    paddingVertical: '15%',
                  }]}>
                    Save
                  </Text>
                </TouchableOpacity>


              </View>
              :
              <View
              style={{
                flexDirection: 'row',

              }}
            >
              <TouchableOpacity
                style={styles.renderTouch}
                onPress={() => {
                  followanAuthor(news.author_id,user_id)
                }}
              >

                <Text style={[styles.renderText, {
                  backgroundColor: COLORS.secondary,
                  fontSize: 16,

                }]}>
                  <Icon name="plus" size={15} style={styles.shadow} color={'white'} />
                  {'  ' + news.author_name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.renderTouch}
                onPress={() => {
                  followaCategory(news.category_id,user_id)
                }}
              >

                <Text style={[styles.renderText, {
                  backgroundColor: COLORS.primary,
                  fontSize: 16,

                }]}>
                  <Icon name="plus" size={15} style={styles.shadow} color={'white'} />
                  {'  ' + news.category_name}
                </Text>
              </TouchableOpacity>
              


            </View>
          }

        </View>
        <Text
          adjustsFontSizeToFit={true}
          style={[styles.bkgImgText, {
            alignSelf: 'flex-start',
            marginVertical: '5%',
          }]}
        >
          {news.title}
        </Text>

        <View
        >
          {
            // console.log(news.video_link)
            news.video_link==='' ?
            // react naitve image tag
            <Image
              source={{ uri:  image_url + news.thunbnail_link }}
              style={{
                width: '100%',
                height: 200,
              }} />
            :
            <VideoPlayer
            video={{ uri: image_url + news.video_link }}
            videoWidth={width}
            videoHeight={200}
            resizeMode="cover"
            style={{
              borderRadius: 5,
              backgroundColor: COLORS.dark,

            }}
            thumbnail={{ uri: image_url + news.thunbnail_link }}
          /> 
          }
          
        </View>
        <View
          style={{
            flexDirection: 'column',
            padding: 0,
            alignItems: 'flex-start',
            top: 10
          }}>
          
          <WebView 
          style={{
            height:height,
            width:width,
          }}
          source={{html: 
          `<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Bootstrap demo</title>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
            </head>
            <body
            class="container"
            style="background-color:`+COLORS.dark+`;
            color:`+COLORS.light+`"
            "
            >
              `+news.description+`
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
            </body>
          </html>`
          }} />
          <Text
            adjustsFontSizeToFit={true}
            style={[styles.bkgImgText, {
              marginVertical: '5%',
            }]}
          >Related Tags</Text>
        </View>
        <FlatList
          data={tags}
          // flatlist hide scroll bar
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}

          contentContainerStyle={[styles.contntContaner, {
            paddingBottom: '3%',
          }]}

          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.renderTouch}
              onPress={() => {
                setActiveTagName(item.tag_name);
                getNewsByTagId(item.id);
               }
              }
            >
              <Text style={[styles.renderText, {
                shadowColor: item.id % 2 == 0 ? COLORS.primary : COLORS.secondary,
                backgroundColor: item.id % 2 == 0 ? COLORS.primary : COLORS.secondary,
              }]}>
                {item.tag_name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          ListEmptyComponent={
            () => {
              return (
                <Text
                  style={{
                    color: COLORS.light,
                    alignSelf: 'center',
                    marginVertical: '5%',
                    marginLeft: 100
                  }}
                >
                  No Tags for This Feed
                </Text>
              )
            }}
        />
        <View
          style={{
            flexDirection: 'row',
            padding: 0,
            flex: 1,
            justifyContent: 'space-between',

          }}>


          <Text
            style={{
              color: COLORS.white,

              textAlign: 'left',
              fontFamily: 'Chunk',
              fontSize: 20,
            }}
          >Comments</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
            onPress={() => {
              refRBSheet.current.open();
            }
            }
          >
            <Icon name="plus" size={14} color={COLORS.white}

              style={{

              }}
            />
            <Text
              style={{
                color: COLORS.white,
                textAlign: 'left',
                fontFamily: 'Chunk',
                left: 10
              }}
            >Add</Text>
          </TouchableOpacity>

        </View>
        {
          comments === null ?
            <Text
              style={{
                color: COLORS.light,
                alignSelf: 'center',
                marginVertical: '5%',
              }}
            >
              No Comments to Show
            </Text> :

            comments.map((element) => {
              return (
                <View key={element.id} style={{ marginTop: '5%' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                    }}
                  >

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >

                      <View
                        style={{
                          paddingLeft: 10,
                          flexDirection: 'row',
                        }}
                      >
                        <Image source={{
                          uri: image_url + element.user_image
                        }} style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }} />
                        <View
                          style={{
                            left: 10,
                            width: '100%',

                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.white,
                              fontFamily: 'Chunk',
                              fontSize: 15,
                            }}
                          >
                            @ {element.username}
                          </Text>
                          <Paragraph
                            style={{
                              color: COLORS.light,
                              paddingLeft: 0,
                              paddingBottom: 10,
                              width: '75%',


                            }}
                          >
                            {element.comment}
                          </Paragraph>
                        </View>

                      </View>

                    </View>
                  </View>

                </View>
              );
            })
        }
        {
          comments === null ? null :
            <View
              style={{
                alignSelf: 'center',
                marginVertical: '5%',
              }}
            >
              <TouchableOpacity
                style={styles.renderTouch}
                onPress={() => {

                  navigation.navigate('CommentList', {
                    news_id: news_id,
                    title: news.title,
                  })
                }}


              >
                <Text style={[styles.renderText, {
                  shadowColor: COLORS.primary,
                  backgroundColor: COLORS.primary,
                }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View >
        }

        <Text
          adjustsFontSizeToFit={true}
          style={[styles.bkgImgText, {
            marginVertical: '5%',
          }]}
        >More News</Text>

        <BrickList
          data={moreNews}
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
               getaNewsById(prop.id)
               // react naitve srcoll to top
               scrollRef.current.scrollTo({
                y: 0,
                animated: true,
              });
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
                        prop.span == 1 ? prop.title.substring(0, 7) + '...' : prop.title.substring(0, 30) + '...'

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





      </ScrollView>
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
            loading={loading}
            disabled={loading}
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
