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
import RBSheet from "react-native-raw-bottom-sheet";
import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function NewsByAuthor({ navigation }) {
  const [value, setValue] = useState('');
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
  ];

  // flatlsit end


  useEffect(() => {

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
            >Author Name Here</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={styles.renderTouch}
              >
                <Text style={[styles.renderText, {
                  shadowColor: COLORS.primary,
                  backgroundColor: COLORS.primary,
                }]}>
                  Author Name
                </Text>
              </View>
              <View
                style={styles.header}
              >
                <Icon name="plus-circle" size={24} style={styles.shadow} color={'white'} />
              </View>

            </View>


          </View>

        </View>
        
       
          <FlatList
          data={DATA}
          // numColumns={2}  
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            alignSelf: 'flex-start'
          }}
          contentContainerStyle={styles.contntContaner}
         
          renderItem={({ item }) => {
            return (
              
              <TouchableOpacity

                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('FeedDetails')
                }}
                style={styles.imgBkg3}
              >
                <ImageBackground source={{
                  uri: 'https://thumbs.dreamstime.com/b/sport-banner-facebook-cover-set-sport-balls-gaming-items-blue-background-corporate-facebook-cover-healthy-86803224.jpg'
                }}

                  resizeMode="cover"
                  style={[styles.imgBkg3, {
                    width: '100%',
                    // marginHorizontal: 10,      
                  }]}>
                  <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.9)']}
                    style={styles.linearGradient}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <View
                        style={[styles.imgBkgGradientViewLeft, {
                          width: '80%',
                        }]}
                      >
                        <Text style={styles.imgBkgGradientViewLeftHeading}>Lorem ipsum dolor</Text>
                        <Text
                          style={styles.imgBkgGradientViewLeftTitle}
                        >2 Min read </Text>
                        <Text
                          style={styles.imgBkgGradientViewLeftTitle}
                        >26 oct </Text>

                      </View>
                      <View>
                        <View
                          style={styles.imgBkgGradientViewRightRow}
                        >
                          <Text
                            style={styles.imgBkgGradientViewRightRowTxt}
                          >
                            6
                          </Text>
                          <Icon name="thumbs-up" size={20}
                            color={COLORS.white} />
                        </View>
                        <View
                          style={styles.imgBkgGradientViewRightRow}
                        >
                          <Text
                            style={styles.imgBkgGradientViewRightRowTxt}
                          >
                            6
                          </Text>
                          <Icon name="thumbs-down" size={20}
                            color={COLORS.white} />
                        </View>
                        <View
                          style={styles.imgBkgGradientViewRightRow}
                        >
                          <Text
                            style={styles.imgBkgGradientViewRightRowTxt}
                          >
                            6
                          </Text>
                          <Icon name="comments" size={20}
                            color={COLORS.white} />
                        </View>
                      </View>


                    </View>

                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.id}
          ListFooterComponent={() => {
            return (
              <View 
              style={{
                marginBottom:180
              }}
              >
                </View>
            )
          } }
        />




      </View>
    


    </SafeAreaView>



  );
}

export default NewsByAuthor;
