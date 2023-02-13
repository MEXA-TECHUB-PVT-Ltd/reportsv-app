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
import DatePicker from 'react-native-date-picker'
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import image_url from '../../../consts/image_url';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function EditProfile({ route, navigation }) {
  const { userDetail } = route.params;
  // console.log('userDetail', userDetail);
  // user detail 
  const [userName, setuserName] = useState(userDetail.username);
  const [image, setImage] = useState(userDetail.image);
  const [email, setEmail] = useState(userDetail.email);
  const [dob, setDob] = useState(userDetail.dob);
  const [password, SetPassword] = useState(userDetail.password);
  // laodin 
  const [loading, setloading] = useState(false);
// btn loading 
  const [btnLoading, setbtnLoading] = useState(false);
 // snackbar
 const [visible, setVisible] = useState(false);
 const [snackDetails, setSnackDetails] = useState({
   text: '',
   backgroundColor: '',
 });

 const onToggleSnackBar = () => setVisible(!visible);
 const onDismissSnackBar = () => setVisible(false);
  // flatlsit
  const DATA = [
    {
      id: '1',
      title: 'First Item',
    },
    {
      id: '2',
      title: 'Second Item',
    },
    {
      id: '3',
      title: 'Third Item',
    },
    {
      id: '4',
      title: 'Forth Item',
    },
  ];

  // flatlsit end
  // bottom sheet 
  const refRBSheet = useRef();
  // bottom sheet end

  const takePhotoFromCamera = async () => {
    // console.warn('camera')
    const data = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      // cropping: true,
    }).then(imageDetail => {
      refRBSheet.current.close();

      updateProfileImage(imageDetail);
    });

  }
  const takePhotoFromGallery = async () => {
    // console.warn('gallery')
    const data = await ImagePicker.openPicker({
      width: 500,
      height: 500,

    }).then(imageDetail => {
      refRBSheet.current.close();
      console.log(imageDetail.path)
      setPreview('flex');
      setUpload('none');
      setImage({
        uri: imageDetail.path
      })
    });
  }
  // update profile image api call
 
  const updateProfileImage = async (imageDetail) => {


    const newUrl = imageDetail.path.replace('file:///', 'file://')
    setloading(true);
    RNFetchBlob.fetch('POST', base_url + '/user/updateProfileImage.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'image', filename: imageDetail.modificationDate + '.png', type: 'image/png', data: RNFetchBlob.wrap(decodeURIComponent(newUrl)) },
      { name: 'user_id', data: userDetail.id },
    ])
      .then((response) => response.json())
      .then((response) => {
        setloading(false);
        console.log('response', response);
        storeData(response[0])
        setImage(response[0].image)
        getData()
        //  console.log('response', response);
      })
      .catch((error) => {
        alert('error' + error)

      })




  };
// update profile 
const updateProfileData = async link => {
  setbtnLoading(true);
  if (userName.length == 0 || password.length == 0 || email.length == 0) {
    setbtnLoading(false);
    setSnackDetails({
      text: language == 'en' ? 'Please fill all the fields' :'Por favor llene todos los campos',       
      backgroundColor: COLORS.red,
    });
    onToggleSnackBar()
    // alert('Please fill all fields');
  }
  else if (password.length < 8) {
    setbtnLoading(false);
    setSnackDetails({
      text: language == 'en' ? 'Password must be at least 8 characters' : 'La contraseña debe tener al menos 8 caracteres',
      backgroundColor: COLORS.red,
    });
    onToggleSnackBar()
    
  }

  else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  ) {
    setbtnLoading(false);
 
    setSnackDetails({
      text: 'Please enter a valid email address',
      backgroundColor: COLORS.red,
    });
    onToggleSnackBar()
  }
  else {

    var InsertAPIURL = base_url + '/user/updateProfileData.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        EmailAddress: email,
        Password: password,
        UserName: userName,
        user_id: userDetail.id,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setbtnLoading(false);
        if(response[0].error==true) {
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar()
        }
        else {
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.success,
          });
          onToggleSnackBar()
          storeData(response[0])
          getData()
          // navigation.navigate('Feed')
        }
      })
      .catch(error => {

        alert('this is error' + error);
      });
  }
};


  // store user updated data in async storage
  const storeData =  (value) => {
    try {
      const jsonValue = JSON.stringify(value)
       AsyncStorage.setItem('userDetail', jsonValue)
    }
    catch (e) {
     
      alert('Error : ' + e);
    }
  }

  // get user data from async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetail')
      console.log('async user  data :',JSON.parse(jsonValue))
    } catch (e) {
      // error reading value
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
    getLanguage()
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
          zIndex:999,
          backgroundColor:snackDetails.backgroundColor,
         
        }}
       
        duration={1000}
        onDismiss={onDismissSnackBar}
        >
       {snackDetails.text}
      </Snackbar>

      <ScrollView
        contentContainerStyle={styles.mainView}
        keyboardShouldPersistTaps="always"
      >

        <ImageBackground source={
          require('../../../assets/bkg_img/editProfile.png')
        }
          resizeMode="contain"
          style={styles.imgBkg}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              top: '5%'
            }}
          >

            <Icon name="arrow-left" size={24} color={COLORS.white} style={{
              marginRight: '5%',
            }} onPress={() => navigation.goBack()} />

            <Text
              adjustsFontSizeToFit={true}
              style={styles.bkgImgText}
            >
              {
                language == 'en' ?
                  'EDIT PROFILE' : 'EDITAR PREFIL'
              }
              </Text>
          </View>

        </ImageBackground>
        <View>
          {
            loading == true ?
              <ActivityIndicator
                animating={loading}
                color={COLORS.primary}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 40,
                  backgroundColor: COLORS.dark,
                  borderRadius: 100,
                }}
              /> :
              <Image
                source={{ uri: image === '' ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' : image_url + image }}
                style={styles.profileImg}
              />

          }


        </View>
        <TouchableOpacity

          onPress={() => {
            refRBSheet.current.open();
          }
          }
        >

          <Text style={[styles.renderText, {
            shadowColor: COLORS.primary,
            backgroundColor: COLORS.primary,
          }]}>
            {
              language == 'en' ?
                'CHANGE' : 'CAMBIO'
            }
          </Text>
        </TouchableOpacity>
        <View
          style={styles.txtInptContianer}
        >
          <Text
            style={styles.txtInptLabel}
          >{
              language == 'en' ?
                'Username' : 'Nombre de usuario'
          }
        </Text>
          <TextInput
            style={styles.txtInpt}
            color={'white'}

            placeholderTextColor={COLORS.white}
            underlineColor='white'
            activeUnderlineColor='white'
            value={userName}
            onChangeText={(text) => setuserName(text)}
            mode="Flat"
          />
        </View>
        <View
          style={styles.txtInptContianer}
        >
          <Text
            style={styles.txtInptLabel}
          >
            {
              language == 'en' ?
                'Email' : 'Correo electrónico'
            }
            </Text>
          <TextInput
            style={styles.txtInpt}
            color={'white'}

            placeholderTextColor={COLORS.white}
            underlineColor='white'
            activeUnderlineColor='white'
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="Flat"
          />
        </View>
        <View
          style={styles.txtInptContianer}
        >
          <Text
            style={styles.txtInptLabel}
          >
            {
              language == 'en' ?  
                'Password' : 'Contraseña'
            }
            </Text>
          <TextInput
            style={styles.txtInpt}
            color={'white'}

            placeholderTextColor={COLORS.white}
            underlineColor='white'
            activeUnderlineColor='white'
            value={password}
            onChangeText={(text) => SetPassword(text)}
            mode="Flat"
          />
        </View>

        <Button
          mode='contained'
          style={styles.btn}
          contentStyle={styles.btnContent}
          loading={btnLoading}
          disabled={btnLoading}
          onPress={() => updateProfileData()}>

          <Text
            style={styles.btnText}
          >
            {
              language == 'en' ?
                'UPDATE' : 'ACTUALIZAR'
            }
          </Text>
        </Button>




      </ScrollView>
      {/* bottom sheet for img picker */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.8)"
          },
          draggableIcon: {
            backgroundColor: "rgba(0,0,0,0)"
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.dark,
            height: height / 3.6,
            borderWidth: 1,

          }

        }}

      >
        <View
          style={{

            marginHorizontal: '2%',


          }}
        >
          <View
            style={styles.sheetContainer}
          >
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close()
              }}
              style={{
                padding: 10,
              }}
            >
              <Icon name="times-circle" size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.uploadView}
            onPress={() => {
              takePhotoFromCamera()
            }
            }
          >
            <Icon name="camera" size={20} color={COLORS.light} />
            <Text
              style={styles.uploadText2}
            >{
                language == 'en' ?
                  'Upload From Camera' : 'Subir desde la cámara'
            }</Text>
          </TouchableOpacity>
          <View style={styles.hr}>
          </View>
          <TouchableOpacity
            style={styles.uploadView}
            onPress={() => {
              takePhotoFromGallery()
            }
            }
          >
            <Icon name="image" size={20} color={COLORS.light} />
            <Text
              style={styles.uploadText2}
            >{
                language == 'en' ?
                  'Upload From Gallery' : 'Subir desde la galería'
            }</Text>
          </TouchableOpacity>

        </View>


      </RBSheet>

    </SafeAreaView>



  );
}

export default EditProfile;
