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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function CommentList({ route, navigation }) {
  const { news_id ,title} = route.params;
  console.log(title);
  const [value, setValue] = useState('');
  const [comments, setComments] = useState([]);
  // bottom sheet 
  const refRBSheet = useRef();
  // bottom sheet end
  // flatlsit
  

  // flatlsit end
// get all comments on a news
const getComment = async () => {
  // setloading(true)
  var InsertAPIURL = base_url + '/comment/getAllCommentsOnaNews.php';
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  await fetch(InsertAPIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      news_id: news_id,
    }),
  })
    .then(response => response.json())
    .then(response => {
      // setloading(false)
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

  useEffect(() => {
    getComment()
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
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText, {
                alignSelf: 'flex-start',
              }]}
            >Commments</Text>
            <Text
              adjustsFontSizeToFit={true}
              style={[styles.bkgImgText, {
                alignSelf: 'flex-end',
                fontSize:13,
                fontFamily:'Poppins-Regular'
              }]}
            >{title}</Text>
          </View>

        </View>
        <ScrollView >
        {
        comments===null ? 
        
        <Text
          style={{
            color: COLORS.light,
            alignSelf: 'center',
          marginVertical: '0%',
          }}
          >
            No Comments to Show
          </Text> 
        :
      comments.map((element) => {
              return (
                <View key={element.id} style={{ marginTop: '4%'}}>
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
                              fontSize: 10,
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
                    <Divider 
                    style={{
                      backgroundColor:COLORS.light,
                      borderWidth:.5,
                      borderColor:COLORS.dark,
                      // top:'10%',
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

export default CommentList;
