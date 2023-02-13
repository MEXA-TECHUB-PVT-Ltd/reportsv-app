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
  RadioButton,
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
import RNRestart from 'react-native-restart';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Profile({ navigation }) {
  const isFocused = useIsFocused();

  const [value, setValue] = useState('');
  const [loading, setloading] = useState(false);
  const [userName, setuserName] = useState('');
  const [image, setImage] = useState('');
  const [userDetail, setUserDetail] = useState();
  const [visible, setVisible] = React.useState(false);
  const [checked, setChecked] = React.useState('first');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  // flatlsit end
    // get user data from async storage
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userDetail')
        const data = JSON.parse(jsonValue)
        setUserDetail(data)
        setImage(data.image)
        setuserName(data.username)
        
      } catch (e) {
        // error reading value
        alert(e);
      }
    }

// langauge 
const [language, setLanguage] = useState(null);
const storeLanguage = async (value) => {
  try {
    await AsyncStorage.setItem('language', value)
  } catch (e) {
    // saving error
  }
}
const getLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('language')
    console.log(value)
    setLanguage(value)
  } catch(e) {
    // error reading value
  }
}
  useEffect(() => {
    getData()
    getLanguage()
  }, [isFocused]);
  return (


    <SafeAreaView
      style={{

        backgroundColor: COLORS.dark,
        flex: 1,
      }}
    >

      <ScrollView
        contentContainerStyle={styles.mainView}
      >
         <Dialog
 
 style={{
  zIndex: 9999
 }}
 visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
            {
            language==='en' ? 'Choose Language' :
            language==='es' ? 'Elija el idioma' : 'Choose Language'
          }
            </Dialog.Title>
            <Dialog.Content>
            <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              storeLanguage('en')
              getLanguage()
              hideDialog()
            }}
            >
              <Text>English</Text>
              {
                language==='en' ? <Icon name="check" size={20} color={COLORS.primary} /> : null
              }
              
            </TouchableOpacity>
            <Divider style={{marginVertical: 5,height:1}} />
            <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              storeLanguage('es')
              getLanguage()
              hideDialog()
            }}
            >
              <Text>Spanish</Text>
              {
                language==='es' ? <Icon name="check" size={20} color={COLORS.primary} /> : null
              }
            </TouchableOpacity>
            </Dialog.Content>

          </Dialog>
        <ImageBackground source={
          require('../../../assets/bkg_img/profilebkg.png')
        }
          resizeMode="contain"
          style={[styles.imgBkg,{
            zIndex:-9
          }]}>
          <Text
            adjustsFontSizeToFit={true}
            style={styles.bkgImgText}
          >{
            language==='en' ? 'PROFILE' : language==='es' ? 'PERFIL' : 'PROFILE'
          }</Text>
        </ImageBackground>
        <View>
          {/* react naitve iamge */}
          <Image
            source={{uri:image==='' ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' :  image_url + image}}
            style={[styles.profileImg,{
              zIndex:-9
            }]}
          />
          {/* react naitve iamge end */}
          <Text
          style={{
            color: COLORS.white,
            fontFamily: 'JosefinSans-Bold',
            alignSelf:'center',
            fontSize: 20,
            marginTop: '5%',
            zIndex:-9
          }}
          >
            @{userName}
          </Text>
          <View
            style={[styles.profileInfo,{
              zIndex:-9,
              alignSelf:'center'
            }]}>
            <TouchableOpacity
              style={styles.renderTouch}
              
              onPress={() => {
                navigation.navigate('EditProfile', {
                  userDetail: userDetail,
                })
              }}
            >
              <Text style={[styles.renderText, {
                shadowColor: COLORS.primary,
                backgroundColor: COLORS.primary,
                width: width / 3,
                textAlign: 'center',
                
              }]}>

               {
                  language==='en' ? 'Edit Profile' : language==='es' ? 'Editar Perfil' : 'Edit Profile'
               }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.renderTouch}
              onPress={() => {
                //logout
                AsyncStorage.removeItem('userDetail');
                console.log('User Logout')
                // navigation.navigate('Login');
                RNRestart.Restart();
              }}
            >
              <Text style={[styles.renderText, {
                shadowColor: COLORS.secondary,
                backgroundColor: COLORS.secondary,
                width: width / 3,
                textAlign: 'center',
                height: 40,
              }]}>
                {
                  language==='en' ? 'Logout' : language==='es' ? 'Cerrar sesión' : 'Logout'
                }
              </Text>
            </TouchableOpacity>


          </View>

        </View>

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10,zIndex:-9 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: '2%',
              marginHorizontal: '2%',
              borderRadius: 10,
              backgroundColor: COLORS.primary,
              width: '47%',
              padding: '4%',
            }}
            onPress={() => {
              navigation.navigate('MyComments')
            }}
          >
            <Image source={require('../../../assets/comments.png')}
              style={{
                width: 40.5,
                height: 31.5,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                paddingTop: '12%',
                color: COLORS.white,
              }}
            >
              {
                language==='en' ? 'My Comments' : language==='es' ? 'Mis Comentarios' : 'My Comments'
              }
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: '2%',
              marginHorizontal: '2%',
              borderRadius: 10,
              backgroundColor: COLORS.secondary,
              width: '47%',
              padding: '4%',
            }}
          >
            <Image source={require('../../../assets/privacy.png')}
              style={{
                width: 33.75,
                height: 36,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                paddingTop: '12%',
                color: COLORS.white,
              }}
            >{
              language==='en' ? 'Privacy Policy' : language==='es' ? 'Política de privacidad' : 'Privacy Policy'
            }</Text>
          </TouchableOpacity>


        </View>
        <View
          style={{ 
            zIndex:-9,flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, top: -10 }}>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: '2%',
              marginHorizontal: '2%',
              borderRadius: 10,
              backgroundColor: COLORS.white,
              width: '47%',
              padding: '4%',
            }}
          >
            <Image source={require('../../../assets/toggle.png')}
              style={{
                width: 40.5,
                height: 27,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                paddingTop: '12%',
                color: COLORS.dark,
              }}
            >Toggle Theme</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: '2%',
              marginHorizontal: '2%',
              borderRadius: 10,
              backgroundColor: COLORS.dark,
              width: '100%',
              padding: '4%',
              borderWidth: 1,
              borderColor: COLORS.light,
            }}
          >
            <Image source={require('../../../assets/star.png')}
              style={{
                width: 37.62,
                height: 36,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                paddingTop: '12%',
                color: COLORS.white,
              }}
            >
              {
                language==='en' ? 'Rate Us' : language==='es' ? 'Califícanos' : 'Rate Us'
              }
            </Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
          style={{
            zIndex:-9
          }}
          onPress={() => showDialog()}
          >
            <Text
              style={{
                // fontSize: 20,
                paddingTop: '12%',
                color: COLORS.white,
              }}
            >
              {
                language==='en' ? 'Change Language' : language==='es' ? 'Cambiar idioma' : 'Change Language'
              }
              </Text>
          </TouchableOpacity>

      </ScrollView>


    </SafeAreaView>



  );
}

export default Profile;
