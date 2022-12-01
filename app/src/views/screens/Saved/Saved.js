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
  Dialog

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
import BrickList from 'react-native-masonry-brick-list';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Saved({ navigation }) {
  const isFocused = useIsFocused();
  const [value, setValue] = useState('');
  const [news, setNews] = useState([]);
  const [user_id, setUserId] = useState('');
  // modal 
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  

  // flatlsit end
  const getAllNews = async (user_id) => {
    // setloading(true)
    var InsertAPIURL = base_url + '/save/getAllSavedNews.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id:user_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // setloading(false)
        if (response[0].error == true) {
          setNews('')
        } else {
          setNews(response)
        }


      })
      .catch(error => {

        alert('this is error' + error);
      });

  };
  // delete save news
  const unsaveaNews = async (saved_id) => {
    // setloading(true)
    var InsertAPIURL = base_url + '/save/unsaveaNews.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        saved_id:saved_id,
      }),
    })
      .then(response => response.json())
      .then(response => {
       alert(response[0].message)
      //  navigation.push('MyTabs',{
      //   screen:'Saved'
      //  })
      getData()
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
    // setUser_id(data.id)
    // getAllNews(data.id)
    console.log('user id is', data.id)
    getAllNews(data.id)
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
     

        <ImageBackground source={
          require('../../../assets/bkg_img/savedd.png')
        }
          resizeMode="contain"
          style={styles.imgBkg}>
           <Text
          adjustsFontSizeToFit={true}
          style={styles.bkgImgText}
        >SAVED</Text> 
        </ImageBackground>
        {
          news==='' ?
          <View
          style={{
            
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            alignContent:'center',
            marginTop:10,
        
          }}
          > 
          <Text
          style={{
            color:COLORS.white,
          }}
          >You Havn't Saved any News</Text>
          <Text
          style={{
            color:COLORS.white,
          }}
          >GO to Home to See The News</Text>
          </View>
          :
           <ScrollView
           contentContainerStyle={{
             height:height*0.8,
             alignItems:'center',
             justifyContent:'center'
           
           }}
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
                         navigation.navigate('FeedDetails', {
                           news_id: prop.id,
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
                              <TouchableOpacity
                              style={{
                               top:prop.span == 2 ? '-42%':'-47%',
                               padding: '2%',
                               borderRadius:100,
                              }}
                              onPress={()=>{
                               unsaveaNews(prop.saved_id)
                              }}
                              >
                                <Icon name="trash" size={15} color={COLORS.white} />
                              </TouchableOpacity>
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
                 </ScrollView>
        }
       
      </View>


    </SafeAreaView>



  );
}

export default  Saved;
