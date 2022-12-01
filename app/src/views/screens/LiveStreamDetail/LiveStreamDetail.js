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
import Video from 'react-native-video';
import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function LiveStreamDetail({ navigation }) {
  const [value, setValue] = useState('');
  const ref = useRef();
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
    {
      id: '5',
      title: 'First Item',
    },
    {
      id: '6',
      title: 'Second Item',
    },
    {
      id: '7',
      title: 'Third Item',
    },
    {
      id: '8',
      title: 'Forth Item',
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
          <Text
            adjustsFontSizeToFit={true}
            style={styles.bkgImgText}
          >Name Here</Text>
        </View>


        <Video source={{uri: "https://cdn.videvo.net/videvo_files/video/free/2015-10/large_watermarked/Running_09_Videvo_preview.mp4"}}   // Can be a URL or a local file.
       ref={ref}        
       repeat={true}                   // Store reference   
                                  // Store reference
      //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
      //  onError={this.videoError}               // Callback when video cannot be loaded
       style={{
       
    
    width: width,
    height: height/3,
       }} />
        <View
        style={{
          flexDirection: 'row',
          paddingVertical: '5%',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderBottomWidth: 1,
          marginBottom: '5%',
          borderBottomColor: COLORS.light,
        }}
        >
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: '3%',
            
          }}>
            <Icon name="eye"
            style={{
              marginRight: '5%',
            }}
            size={20} color={COLORS.white}/>
            <Text
            style={{
              color: COLORS.white,
              fontFamily: 'Chuck',
              
            }}
            >121</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: '3%',
            
          }}>
            <Icon name="thumbs-up"
            style={{
              marginRight: '5%',
            }}
            size={20} color={COLORS.white}/>
            <Text
            style={{
              color: COLORS.white,
              fontFamily: 'Chuck',
              
            }}
            >121</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: '3%',
          }}>
            <Icon name="thumbs-down"
            style={{
              marginRight: '5%',
            }}
            size={20} color={COLORS.white}/>
            <Text
            style={{
              color: COLORS.white,
              fontFamily: 'Chuck',
              
            }}
            >121</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: '3%',
          }}>
            <Icon name="plus-circle"
            style={{
              marginRight: '5%',
            }}
            size={20} color={COLORS.white}/>
            
          </View>
        </View>

       
        <FlatList
          data={DATA}
          // numColumns={2}  
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            
            height: height,

          }}
          contentContainerStyle={styles.contntContaner}
         
          renderItem={({ item }) => {
            return (
              <View
                style={styles.imgBkg3}
              >
                <Image source={require('../../../assets/userLive.png')} style={styles.commentimg} />
                
                <View
                style={{
                  backgroundColor: COLORS.light,
                  paddingRight: '1%',
                  paddingLeft: '3%',
                  marginHorizontal:'3%',
                  marginBottom:'5%',
                  paddingVertical:'3%',
                  borderRadius:10,
                  width:'80%',
                }}
                >
                    <Text
                    style={{
                        fontSize: 18,
                      
                        color: COLORS.white,
                        fontFamily: 'Chunk'
                    }}
                    >
                      User Name
                    </Text>
                  <Paragraph
                  style={{
                    width:'100%',
                    color: COLORS.white,
                  }}
                  >Lorem ipsum dolor sit amet, conse stetur 
                  sadipscing elitr.


                  </Paragraph>
                </View>
               
              </View>
            )
          }}
          keyExtractor={item => item.id}
          ListFooterComponent={() => {
            return (
              <View 
              style={{
                marginBottom:200
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

export default LiveStreamDetail;
