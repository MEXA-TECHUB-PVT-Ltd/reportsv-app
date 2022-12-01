import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
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

function FeedByAuthor({ route,navigation }) {
  const {author_id } = route.params;
  
  const [value, setValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [user_id, setUser_id] = useState('');
  // loading indicator
  const [loading, setloading] = useState(true);


 
  
  // get news by author 
  const getByAuthorId = async () => {
    setloading(true)
    var InsertAPIURL = base_url + '/news/getByAuthorId.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        author_id: author_id,
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
    getByAuthorId()
    
  
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

      <View
        style={styles.mainView}
      >
        <View
          style={styles.imgBkg}>
          <Icon name="arrow-left" size={24} color={COLORS.white}
            style={{
              marginRight: '10%',
            }}
            onPress={() => {
              navigation.goBack()
            }}
          />
          
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText, {
                
              }]}
            >News By Author</Text>
            
         

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
                      // navigation.navigate('FeedDetails', {
                      //   news_id: prop.id,
                      // })
                      console.log('user_id', user_id);
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
                              width: prop.span == 2 ? '85%': '65%'   ,
                              
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
                            top: prop.span == 2 ? '6%': '15%',
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



    </SafeAreaView>



  );
}

export default FeedByAuthor;
