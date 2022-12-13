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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AgenciaDetail({ route, navigation }) {
  const { item } = route.params;
  console.log(item);
  const [user_id, setUser_id] = useState('');
  const [exsist, setExsist] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');

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

  // getAllProducts
  const sendApplication = async () => {
      setloading(true);
      var InsertAPIURL = base_url + '/agencia/applyToJob.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data =JSON.stringify({
        agencia_id:item.id,
        user_id:user_id,
        name:name,
        contact:contact,
        comment:comment
      })
      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: data
      })
        .then(response => response.json())
        .then(response => {
          setloading(false);
          if(response[0].error==true){
            setSnackDetails({
              text: response[0].message,
              backgroundColor: COLORS.red,
            });
            onToggleSnackBar();
            
          } else {
            setSnackDetails({
              text: response[0].message,
              backgroundColor: '#05AA6D',
            });
            onToggleSnackBar();
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
    // getAllProducts()
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
          <Appbar.Content title="Job Detail"
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
                 <TouchableOpacity
        onPress={() => {
          Linking.openURL(image_url+item.resume);
        }}
        >
<List.Icon 
style={{
  // padding: 10,
}} icon="download" />
          </TouchableOpacity>
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
                <Text>Salary</Text>
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
                Description
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
                  Apply to Job
              </Text>
            <TextInput
              label="Name"
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
              label="Contact No."
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
              label="Comment"
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
                      if (name == '' || contact == '' || comment == '') {
                        setSnackDetails({
                          text: 'Please fill all fields',
                          backgroundColor: '#FF0000',
                        });
                        onToggleSnackBar();
                      } else {
                        // alert('ok')
                        sendApplication()
                      }
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

export default AgenciaDetail;
