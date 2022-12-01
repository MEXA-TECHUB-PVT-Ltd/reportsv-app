import 'react-native-gesture-handler';
import React, { useState, useEffect ,useRef} from 'react';
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
  Divider,

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
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function MyComments({ route, navigation }) {
  const isFocused = useIsFocused();
  const [value, setValue] = useState('');
  const [comments, setComments] = useState([]);
  // bottom sheet 
  const refRBSheet = useRef();
  // bottom sheet end
  // flatlsit
  const DATA = [
    {
      id: '1',
      title: 'Tag Name',
    },
    {
      id: '2',
      title: 'Tag Name',
    },
    {
      id: '3',
      title: 'Tag Name',
    },
    {
      id: '4',
      title: 'Tag Name',
    },
    {
      id: '5',
      title: 'Tag Name',
    },
    {
      id: '6',
      title: 'Tag Name',
    },
    {
      id: '7',
      title: 'Tag Name',
    },
    {
      id: '8',
      title: 'Tag Name',
    },
  ];

  // flatlsit end
// get all comments on a news
const getComment = async (user_id) => {
  // setloading(true)
  var InsertAPIURL = base_url + '/comment/getAllCommentsofaUser.php';
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
    
      if (response[0].error == false) {
       setComments(response[0].comments)
        
      } else {
        console.log(response)

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
    getComment(data.id)
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
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText, {
                alignSelf: 'flex-end',
              }]}
            >My Commments</Text>
            
          </View>

        </View>
        <ScrollView >
        {
        comments===null ? 
        
        <Text
          style={{
            color: COLORS.light,
            alignSelf: 'center',
          marginVertical: '5%',
          }}
          >
            No Comments to Show
          </Text> 
        :
      comments.map((element) => {
              return (
                <View key={element.id} style={{ marginTop: '8%' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                    }}
                  >
  
                    <TouchableRipple
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => {
                        navigation.navigate('FeedDetails', {
                          news_id: element.news_id,
                        });
                        // console.log(element.news_id)
                      }}
                    >
  
                      <View
                        style={{
                          paddingLeft: 10,
                          flexDirection: 'row',
                        }}
                      >
                        <Image source={{
                          uri: image_url + element.thunbnail_link
                        }} style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                        }} 
                        resizeMode='contain'
                        />
                        <View
                          style={{
                            left: 10,
                            width: '85%',
                            flexDirection: 'column',
                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.white,
                              
                              fontSize: 13,
                            }}
                          >
                           <Text
                           style={{
                            color: COLORS.primary,
                            fontFamily: 'Chunk',
                           }}
                           >News Title : </Text>{element.title}
                          </Text>
                          <Paragraph
                            style={{
                              color: COLORS.light,
                              paddingLeft: 0,
                              // paddingBottom: 10,
                              width: '100%',
                              
  
                            }}
                          >
                            {element.comment} ({element.comment_date})
                          </Paragraph>
                        </View>
  
                      </View>
  
                    </TouchableRipple>
                  </View>
                    <Divider 
                    style={{
                      backgroundColor:COLORS.light,
                      borderWidth:.5,
                      borderColor:COLORS.dark,
                      top:'10%',
                      width:'90%',
                      alignSelf:'center'
                    }}
                    />
                </View>
              );
            })
          }
          <View 
          style={{
           padding:'15%'
          }}
          >
         
          </View>
        </ScrollView>

        
       
          




      </View>
    


    </SafeAreaView>



  );
}

export default MyComments;
