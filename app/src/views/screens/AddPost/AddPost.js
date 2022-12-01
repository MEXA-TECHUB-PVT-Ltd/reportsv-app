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
import RNFetchBlob from 'rn-fetch-blob';


import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AddPost({ navigation }) {

  const [value, setValue] = useState('');
  const [user_id, setUser_id] = useState('');
  const [email, setEmail] = useState('');
  const [title, settitle] = useState('');
  const [banner_link, setBanner_link] = useState('');
  const [ad_detail, setAd_detail] = useState('');
  const [total_price, setTotal_price] = useState();
  const [perDayValue, setPerDayValue] = useState();
  const [loading, setloading] = useState(false);

  // date picker
  const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState('Select Start Date');
  const [endDate, setEndDate] = useState('Select End Date');
  const [startDateSting, setStartDateSting] = useState();
  const [endDateSting, setEndDateSting] = useState();
  const [current, setCurrent] = useState('');
  const [open, setOpen] = useState(false)

  // snackbar
 const [visible, setVisible] = useState(false);
 const [snackDetails, setSnackDetails] = useState({
   text: '',
   backgroundColor: '',
 });

 const onToggleSnackBar = () => setVisible(!visible);
 const onDismissSnackBar = () => setVisible(false);
 

  // flatlsit end
  // bottom sheet 
  const refRBSheet = useRef();
  const refRBSheetWeb = useRef();
  const webviewRef = useRef();
  // bottom sheet end
  // image picker
  const [image, setImage] = useState({
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  });
  const [imageDetail, setImageDetail] = useState(null);
  const [preview, setPreview] = useState('none');
  const [upload, setUpload] = useState('flex');
  const takePhotoFromCamera = async () => {
    // console.warn('camera')
    const data = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      // cropping: true,
    }).then(imageDetail => {
      refRBSheet.current.close();
      // console.log(imageDetail.path)
      setPreview('flex');
      setUpload('none');
      setImage({
        uri: imageDetail.path
      })
      setImageDetail(imageDetail)
    });

  }
  const takePhotoFromGallery = async () => {
    // console.warn('gallery')
    const data = await ImagePicker.openPicker({
      width: 500,
      height: 500,

    }).then(imageDetail => {
      
      refRBSheet.current.close();
      // console.log(imageDetail.path)
      setPreview('flex');
      setUpload('none');
      setImage({
        uri: imageDetail.path
      })
      setImageDetail(imageDetail)
    });
  }
// post an add
const postanAd = async () => {

if(imageDetail == null){ 
  setSnackDetails({
    text: 'Please select an image',
    backgroundColor: 'red',
  });
  onToggleSnackBar();
  return;
} 
if(title.length == 0){
  setSnackDetails({
    text: 'Please enter title',
    backgroundColor: 'red',
  });
  onToggleSnackBar();
  return;
}
if(ad_detail.length == 0){
  setSnackDetails({
    text: 'Please enter ad detail',
    backgroundColor: 'red',
  });
  onToggleSnackBar();
  return;
}
if(startDate == 'Select Start Date'){
  setSnackDetails({
    text: 'Please select start date',
    backgroundColor: 'red',
  });
  onToggleSnackBar();
  return;
}
if(endDate == 'Select End Date'){
  setSnackDetails({
    text: 'Please select end date',
    backgroundColor: 'red',
  });
  onToggleSnackBar();
  return;
}

if(banner_link.length == 0){
  setSnackDetails({
    text: 'Please enter Banner Link',
    backgroundColor: 'red',
  });
  onToggleSnackBar();
  return;
} else {
 const newUrl = imageDetail.path.replace('file://', 'file://')
  setloading(true);
  RNFetchBlob.fetch('POST', base_url + '/userAd/postanAd.php', {
    Authorization: "Bearer access-token",
    otherHeader: "foo",
    'Content-Type': 'multipart/form-data',
  }, [
    { name: 'image', filename: imageDetail.modificationDate + '.png', type: 'image/png', data: RNFetchBlob.wrap(decodeURIComponent(newUrl)) },
    { name: 'user_id', data: String(user_id) },
    { name: 'title', data: String(title) },
    { name: 'banner_link', data: String(banner_link) },
    { name: 'start_date', data: String(startDate)},
    { name: 'end_date', data: String(endDate)},
    { name: 'ad_detail', data: String(ad_detail)},
    { name: 'total_price', data: String(total_price)},
  ])
    .then((response) => response.json())
    .then((response) => {
      setloading(false);
      console.log('response', response);
      if(response[0].error==true) {
        setSnackDetails({
          text: response[0].message,
          backgroundColor: COLORS.red,
        });
        onToggleSnackBar()
      }
      else if(response[0].error==false) {
        settitle('');
        setBanner_link('');
        setAd_detail('');
        setTotal_price(perDayValue);
        setStartDate('Select Start Date');
        setEndDate('Select End Date');
        setImage({
          uri: 'https://reactnative.dev/img/tiny_logo.png'
        });
        setImageDetail(null);
        setPreview('none');
        setUpload('flex');
        navigation.navigate('MakePayment', {
            uniq_id: response[0].uniq_id,
            user_id: user_id,
            total_price: total_price,
            email:email
            
          })
        }
    })
    .catch((error) => {
      alert('error' + error)

    })
}

 




};
// get per day value 
const getPerDayValue = async () => {
  var InsertAPIURL = base_url + '/userAd/getPerDayValue.php';
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  await fetch(InsertAPIURL, {
    method: 'GET',
    headers: headers,
  
  })
    .then(response => response.json())
    .then(response => {
     
      
      setPerDayValue(response[0].amount);
      setTotal_price(response[0].amount);
    })
    .catch(error => {
 alert('this is error' + error);
    });

};
// get response back form web view
function onMessage(data) {
  console.log(data.nativeEvent.data)
  
}
   // get user data from async storage
   const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetail')
      const data = JSON.parse(jsonValue)
      setEmail(data.email)
      setUser_id(data.id)
      
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  useEffect(() => {

    getData()
    getPerDayValue()
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
       
        duration={2000}
        onDismiss={onDismissSnackBar}
        >
       {snackDetails.text}
      </Snackbar>

      <ScrollView
        contentContainerStyle={styles.mainView}
        keyboardShouldPersistTaps="always"
      >

        <ImageBackground source={
          require('../../../assets/bkg_img/post.png')
        }
          resizeMode="contain"
          style={styles.imgBkg}>
            <Icon name="arrow-left" size={24} color={COLORS.white}
            style={{
              padding: '2%',
              
            }}
            onPress={() => {
              navigation.goBack()
            }}
          />
          <Text
            adjustsFontSizeToFit={true}
            style={styles.bkgImgText}
          >POST YOUR Ad</Text>
        </ImageBackground>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            padding: '10%',
            borderWidth: 1,
            width: '90%',
            borderColor: COLORS.light,
            borderRadius: 15,
            marginBottom: '5%',
            display: upload
          }}
          onPress={() => {
            refRBSheet.current.open();
          }
          }
        >
          <Icon name="upload" size={20}
            color={COLORS.light} />
          <Text style={styles.uploadText}>Upload Image</Text>
        </TouchableOpacity>
        <ImageBackground
         
          source={image}

          resizeMode="cover"
          style={[styles.imgPreview, {
            display: preview
          }]}>
        
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setPreview('none')
                setUpload('flex')
                setImageDetail(null)
              }}
              style={{
                padding: 10,
              }}
            >
              <Icon name="times-circle" size={20}
                color={COLORS.dark}
                style={{
                  backgroundColor: COLORS.white,
                  padding:2,
                  borderRadius: 50,

                }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Text style={styles.uploadText}>App Banner (1024px x 500px)</Text>
        <TextInput
          style={styles.txtInpt}
          color={'white'}
          placeholder="AD Title"
          placeholderTextColor={COLORS.white}
          underlineColor='white'
          activeUnderlineColor='white'
          onChangeText={(text) => settitle(text)}
          value={title}
          
        />
        <TextInput
          style={styles.txtInpt}
          color={'white'}
          placeholder="App Banner Link"
          placeholderTextColor={COLORS.white}
          underlineColor='white'
          activeUnderlineColor='white'
          onChangeText={(text) => setBanner_link(text)}
          mode="Flat"
          value={banner_link}
        />
        <View
          style={styles.datePickerView}>


          <TextInput
            style={styles.txtInpt}
            color={'white'}
            editable={false}
            placeholderTextColor={COLORS.white}
            underlineColor='white'
            activeUnderlineColor='white'
            mode="Flat"
            value={startDate}

          />
          <TouchableOpacity
            onPress={() => {
              setCurrent('startDate');
              setOpen(true)
            }}
          >
            <Icon name="calendar"
              style={styles.datePickerIcon}
              size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View
          style={styles.datePickerView}>

          
          <TextInput
            style={styles.txtInpt}
            color={'white'}
            editable={false}
            placeholderTextColor={COLORS.white}
            underlineColor='white'
            activeUnderlineColor='white'
            mode="Flat"
            value={endDate}
          />
          <TouchableOpacity
            onPress={() => {
              setCurrent('endDate');
              setOpen(true)
            }}
          >
            <Icon name="calendar"
              style={styles.datePickerIcon}
              size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.txtInpt}
          color={'white'}
          placeholder="AD Details"
          placeholderTextColor={COLORS.white}
          underlineColor='white'
          activeUnderlineColor='white'
          mode="Flat"
          multiline={true}
          onChangeText={(text) => setAd_detail(text)}
          value={ad_detail}
        />
        <Text
          style={styles.perDay}
        >{perDayValue}$ per day</Text>
        <Text
          style={[styles.perDay,{
            paddingBottom:'5%'
          }]}
        >{total_price}$ Sub Total</Text>

        <Button
          mode='contained'
          style={styles.btn}
          loading={loading}
          disabled={loading}
          contentStyle={styles.btnContent}
          onPress={() => 
          postanAd()
          }>


          <Text
            style={styles.btnText}
          >Continue
          </Text>
        </Button>

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={(date) => {
            setOpen(false)
            
            var date = new Date(date)
            var day = date.getDate()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            var dateString = day + "-" + month + "-" + year
            console.log(dateString)
            if (current === 'startDate') {
              setStartDate(dateString)
              setStartDateSting(date)
            } else {
              if(startDate>
                dateString){
                  alert('end date is less than start date')
                } else {

                  let start = new Date(startDateSting);
                  let end = new Date(date);
                  let difference = end.getTime() - start.getTime();
                  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                  setTotal_price(TotalDays*perDayValue)
                  setEndDate(dateString)
                }
              
            }



          }}
          onCancel={() => {
            setOpen(false)
          }}
        />


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
            borderColor: COLORS.white
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
                color={COLORS.white}
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
            <Icon name="camera" size={24} color={COLORS.white} />
            <Text
              style={styles.uploadText2}
            >Upload From Camera</Text>
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
            <Icon name="image" size={24} color={COLORS.white} />
            <Text
              style={styles.uploadText2}
            >Upload From Gallery</Text>
          </TouchableOpacity>

        </View>


      </RBSheet>
     

    </SafeAreaView>



  );
}

export default AddPost;
