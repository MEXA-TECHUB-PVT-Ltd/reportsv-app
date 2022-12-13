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
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AddNewJob({ route, navigation }) {
  const [user_id]= route.params.user_id;

  
  const [exsist, setExsist] = useState(false);
  const [job_title, setjob_title] = useState('');
  const [activeJobType, setActiveJobType] = useState('Select Job Type');
  const [salary, setsalary] = useState('');
  const [description, setdescription] = useState('');
  const [resume, setresume] = useState([{
    name:"Upload File",
    type:"",
    uri:"",
  }]
  );

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
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // getAllProducts
  const sendApplication = async () => {
    // const newUrl = resume[0].uri.replace('file://', 'file://')
    setloading(true);
  if( job_title=='' ||
   activeJobType=='' || 
   salary=='' || 
   description=='' ) {
    setSnackDetails({
      text: 'Please fill all fields',
      backgroundColor: 'red',
    });
    onToggleSnackBar();
    setloading(false);
    return;
  }
 else {
  RNFetchBlob.fetch('POST', base_url + '/agencia/postaJob.php', {
    Authorization: "Bearer access-token",
    otherHeader: "foo",
    'Content-Type': 'multipart/form-data',
  }, [
    // { name: 'image', filename: resume[0].size +'.'+ resume[0].type, type:resume[0].type, data: RNFetchBlob.wrap(decodeURIComponent(newUrl)) },
    { name: 'image', filename: resume[0].name, type:resume[0].type, data: RNFetchBlob.wrap(resume[0].uri) },
    { name: 'user_id', data:user_id },
    { name: 'job_title', data:job_title },
    { name: 'job_type', data:activeJobType },
    { name: 'salary', data:salary },
    { name: 'description', data:description },
  ])
    .then((response) => response.json())
    .then((response) => {
      setloading(false);
      console.log(response)
      if(response[0].error==false) {
        setSnackDetails({
          text: response[0].message,
          backgroundColor: 'green',
        });
        onToggleSnackBar();
        setTimeout(() => {
          navigation.goBack()
        }, 2000);
      }

    })
    .catch((error) => {
      alert('error' + error)
    })
 }
    
   
  };
  
  
  const getDoc = async type => {
   
      const data = await DocumentPicker.pick({
        storageOptions: {
          skipBackup: true,
          path: 'construction-cloud'
        }
      })
        .then(response => {
          setresume(response);
        })
        .catch(handlerror => { });
   
   
    
  };


  useEffect(() => {
   
    // getAllProducts()
    return () => {
      setresume({}); // This worked for me
      
    };
  }, []);

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
          <Appbar.Content title="Post Your Job"
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
           
       
          
            <TextInput
              label="Job Title"
              value={job_title}
              activeUnderlineColor={COLORS.primary}
              onChangeText={(text) => {
                  setjob_title(text)
              }}
              // keyboardType="numeric"
              style={{
                marginHorizontal: 10,
                marginVertical:5
              }}
            />
            <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            style={{
              width: '70%',
              alignSelf: 'center',
              marginTop: '17%',
              marginLeft: '6%',
              height: 200
            }}
            anchor={<TouchableOpacity
              style={{
                marginHorizontal: '4%',
                padding: '6%',
                marginVertical:10,
                width: '94%',
                alignSelf: 'center',
                backgroundColor: COLORS.greylight,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.light,
                
              }}
              onPress={openMenu}>
              <Text
              style={{
                color: COLORS.light,
                fontSize: 16,
                left:0
              }}
              >{activeJobType}</Text>
            </TouchableOpacity>}>
            
              <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                      setActiveJobType('Contract')
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                        
                        >
                          Contract
                        </Text>

                      </View>
                    } />
              <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                      setActiveJobType('Fresher')
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                        
                        >
                          Fresher
                        </Text>

                      </View>
                    } />
              <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                        setActiveJobType('Full-time')
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                        
                        >
                          Full-time
                        </Text>

                      </View>
                    } />
              <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                      setActiveJobType('Internship')
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                        
                        >
                          Internship
                        </Text>

                      </View>
                    } />
              <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                      setActiveJobType('Part-time')
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                        
                        >
                          Part-time
                        </Text>

                      </View>
                    } />
              <Menu.Item
                    style={{
                      flexDirection: 'row',
                      width: width,
                      textAlign: 'center',
                    }}
                    onPress={
                      () => {
                      setActiveJobType('Temporary')
                        closeMenu()
                      }}
                    title={
                      <View
                        style={{
                          flexDirection: "column",
                          width: 150,

                        }}
                      >
                        <Text
                        
                        >
                          Temporary
                        </Text>

                      </View>
                    } />
          </Menu>
            
            <TextInput
              label="salary"
              value={salary}
              activeUnderlineColor={COLORS.primary}
              onChangeText={(text) => {
                  setsalary(text)
              }}
              keyboardType="numeric"
              style={{
                marginHorizontal: 10,
                marginVertical:5
              }}
            />
            <TextInput
              label="description"
              value={description}
              activeUnderlineColor={COLORS.primary}
              onChangeText={(text) => {
                  setdescription(text)
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
              marginHorizontal: 10,
            }}
            >
              <TouchableOpacity
              activeOpacity={0.7}
              onPress={getDoc}
              style={{
                padding:10,
                backgroundColor:COLORS.secondary,
                borderRadius:10,
                marginVertical:5
              }}
              >
                <Text
                style={{
                  color:COLORS.white
                }}
                >{
                  resume[0].name
                }</Text>
              </TouchableOpacity>
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
                     
                        sendApplication()
                      
                    }}
                  >


                    <Text
                      style={styles.btnText}
                    >
                      Apply
                    </Text>
                  </Button>
             

            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Provider>


  );
}

export default AddNewJob;
