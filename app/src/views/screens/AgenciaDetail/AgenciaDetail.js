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
  FlatList,
  TouchableWithoutFeedback,
  Linking,
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
  Appbar,
  List,
  Divider,
  Title,
  Card,
  Dialog,
  TextInput,
  Menu,
  Provider
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AgenciaDetail({ route, navigation }) {
  const isFocused = useIsFocused();
  const { item } = route.params;
  const [user_id, setUser_id] = useState('');
  const [exsist, setExsist] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [resumeName, setResumeName] = useState('Upload resume');
  const [resume, setResume] = useState([]);

  // snackbar
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [snackDetails, setSnackDetails] = useState({
    text: '',
    backgroundColor: '',
  });

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  //dialog 
  const [visible1, setVisible1] = React.useState(false);
  const showDialog = () => setVisible1(true);
  const hideDialog = () => setVisible1(false);
  // menu 
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisible2, setMenuVisible2] = useState(false);
  const [activeTextColor, setActiveTextColor] = useState('Select Color');
  const [activeTextSize, setActiveTextSize] = useState('Select Size');
  const [activeText, setActiveText] = useState();
  const [activeColor, setActiveColor] = useState();
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openMenu2 = () => setMenuVisible2(true);
  const closeMenu2 = () => setMenuVisible2(false);


  const sendApp = async () => {
    setloading(true);
    const newUrl = resume.fileCopyUri.replace('file:///', 'file://')
 
    RNFetchBlob.fetch('POST', base_url + '/agencia/applyToJob.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'image', filename: resume.name, type: resume.type, data: RNFetchBlob.wrap(decodeURIComponent(newUrl)) },
      { name: 'agencia_id', data: item.id},
      { name: 'user_id', data: user_id },
      { name: 'name', data: name },
      { name: 'contact', data: contact },
      { name: 'comment', data: comment },
    ])
      .then((response) => response.json())
      .then((response) => {
        setloading(false);
        if(response[0].error==true){
          setSnackDetails({
            text: response[0].message,
            backgroundColor: COLORS.red,
          });
          onToggleSnackBar();
          
        } else {
          setName('')
          setContact('')
          setComment('')
          setResumeName('Upload resume')
          setResume([])
          setSnackDetails({
            text: response[0].message,
            backgroundColor: '#05AA6D',
          });
          onToggleSnackBar();
        }
        
      })
      .catch((error) => {
        alert('error' + error)

      })




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
    return () => {
      // cleanup
      setloading(false)
    }
    // getAllProducts()
  }, [isFocused]);

  return (

    <Provider>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.white,
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
            navigation.goBack()
          }}
          />
          <Appbar.Content title={
            language == 'en' ? 'Job Detail' : 'Detalles del trabajo'
          }
          />
          
          
        </Appbar.Header>

       
        <ScrollView
          style={{
            zIndex: -9
          }}
        >

          <Card
            style={{
              width: width - 10,
              marginHorizontal: 5,
              marginVertical: 15,
              borderRadius: 5,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: COLORS.greylight,
              zIndex: -9,
            }}
          >
           
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // paddingTop: 10,
                  alignItems: 'center',
                }}
              >
                <Title
                  style={{
                    color: COLORS.primary,
                    textTransform: "capitalize"
                  }}
                >{item.job_title}</Title>
                
              </View>
          
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
              >
                <Text>Job Type</Text>
                <Text>{item.job_type}</Text>
              </View>
              <Divider
              style={{
                backgroundColor: COLORS.greylight,
                height: 1,
              }}
              />
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
              >
                <Text>{
                  language == 'en' ? 'Salary' : 'Salario'
                  }
                  </Text>
                <Text>$ {item.salary}</Text>
              </View>
              <Divider
              style={{
                backgroundColor: COLORS.greylight,
                height: 1,
              }}
              />
              <Text
              style={{
                padding:5,
                fontWeight: 'bold',
                fontSize: 16


              }}
              >
                {
                  language == 'en' ? 'Job Description' : 'Descripción del trabajo'
                }
              </Text>
              <Paragraph
              style={{
                padding:5
              }}
              >{item.description}</Paragraph>
            </Card.Content>
            <Text
              style={{
                padding:5,
                fontWeight: 'bold',
                fontSize: 16,
                marginHorizontal:15,
                color:COLORS.primary


              }}
              >
                {
                  language == 'en' ? 'Apply to Job' : 'Aplicar al trabajo'
                }
              </Text>
            <TextInput
              label={
                language == 'en' ? 'Name' : 'Nombre'
              }
              value={name}
              activeUnderlineColor={COLORS.primary}
              onChangeText={(text) => {
                  setName(text)
              }}
              // keyboardType="numeric"
              style={{
                marginHorizontal: 10,
                marginVertical:5
              }}
            />
            <TextInput
              label={
                language == 'en' ? 'Contact No.' : 'Contacto No.'
              }
              value={contact}
              activeUnderlineColor={COLORS.primary}
              onChangeText={(text) => {
                  setContact(text)
              }}
              keyboardType="numeric"
              style={{
                marginHorizontal: 10,
                marginVertical:5
              }}
            />
            <TextInput
              label={
                language == 'en' ? 'Comment' : 'Comentario'
              }
              value={comment}
              activeUnderlineColor={COLORS.primary}
              onChangeText={(text) => {
                  setComment(text)
              }}
              multiline={true}
              style={{
                marginHorizontal: 10,
                marginVertical:5,
                height:100
              }}
            />
            <View
             style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal:'5%',
              alignItems: 'center',
              marginVertical:10
            }}>
              <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderWidth:1,
                borderColor:COLORS.primary,
                borderRadius:5,
              }}
              onPress={async () => {
                try {
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                  })
                  setResumeName(pickerResult.name)
                  setResume(pickerResult)
                } catch (e) {
                  console.log(e)
                }
              }}
              >
                <Text>{resumeName}</Text>
              </TouchableOpacity>
              {
                resumeName=='Upload resume' ? null : 
                <TouchableOpacity
                onPress={() => {
                  setResumeName('Upload resume')
                  setResume(null)
                }}
                >
                  <FontAwesome5Icon name="times" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              }
                
            </View>
            <Card.Actions
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              
                  <Button
                    mode='contained'
                    style={[styles.btn,{
                      width:width-100,
                    }]}
                    loading={loading}
                    disabled={loading}
                    contentStyle={styles.btnContent}
                    onPress={() => {
                      if (name.length == 0 || contact.length == 0 || comment.length == 0) {
                        setSnackDetails({
                          text:
                          language == 'en' ? 'Please fill all fields' :
                          'Por favor llene todos los campos',
                          backgroundColor: '#FF0000',
                        });
                        onToggleSnackBar();
                      } 
                      else if (resume.length == 0) {
                        setSnackDetails({
                          text: language == 'en' ? 'Please Upload Resume': 'Por favor suba su currículum',
                          backgroundColor: '#FF0000',
                        });
                        onToggleSnackBar();
                      } 
                      else  {
                        
                        sendApp()
                      }
                    }}
                  >


                    <Text
                      style={styles.btnText}
                    >
                      {
                        language == 'en' ? 'Apply' : 'Aplicar'
                      }
                      
                    </Text>
                  </Button>
             

            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Provider>


  );
}

export default AgenciaDetail;
