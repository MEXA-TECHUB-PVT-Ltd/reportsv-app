import 'react-native-gesture-handler';
import React, { useState, useEffect,useRef,useMemo,useCallback } from 'react';
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
  TextInput
} from 'react-native';
import {
  Text,
  Button,
  Snackbar,
  Headline,
  ActivityIndicator,
  Colors,
  TouchableRipple
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
import RBSheet from "react-native-raw-bottom-sheet";

import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function NewPass({ navigation }) {
  const [value, setValue] = useState('');
  
  // code confrimation
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // code confrimation end
  // bottom sheet 
  const refRBSheet = useRef();
  // bottom sheet end

  useEffect(() => {

  }, []);
  return (


    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark,

      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: '5%',
        }}
      >
        <View
          style={styles.mainView}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={()=>{
              navigation.goBack()
            }}
          >
          <Icon name="chevron-left" size={20} 
          color={COLORS.secondary} />
          </TouchableOpacity> 

          <LoginHeader navigation={navigation}
            bkgImgType={'NewPass'}
            bkgImgText={'CREATE NEW PASSWORD'}
          
          />
            <Text
            style={styles.passDetail}
            >
            Create a new, strong password that you
don't use for other Apps.
            </Text>

            <TextInput
              style={styles.txtInpt}
              color={'white'}
              placeholder="New Password"
              placeholderTextColor={COLORS.white}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              secureTextEntry={true}
            />
            <TextInput
              style={[styles.txtInpt,
              {marginTop:'5%'}
              ]}
              color={'white'}
              placeholder="Confirm New Password"
              placeholderTextColor={COLORS.white}
              autoCapitalize="none"
              underlineColor='white'
              activeUnderlineColor='white'
              autoCorrect={false}
              mode="Flat"
              secureTextEntry={true}
            />
            

          <View style={styles.txtInptView}>
          <Button
                mode='contained'
                style={styles.btn}
                
                contentStyle={styles.btnContent}
                onPress={()=>{
                refRBSheet.current.open()
                  
                }}
            >
                <Text
                    style={styles.btnText}
                >Update
                </Text>
            </Button>
           </View>
        </View>
        
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.8)"
          },
          draggableIcon: {
            backgroundColor: "rgba(0,0,0,0)"
          },
          container:{
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            backgroundColor:COLORS.dark,
            height:height/2.3,
            borderWidth:1,
            borderColor:COLORS.white 
          }
          
        }}
        
      >
        <View
        style={{
         
          marginHorizontal:'6%',
        
          
        }}
        >
          <View
          style={styles.sheetContainer}
          >

          {/* <Icon name="times-circle" size={20} 
          color={COLORS.white} 
          onPress={()=>{
            refRBSheet.current.close()
          }}
          /> */}
          </View>
<Image
            style={styles.sheetImg}
            source={require('../../../assets/check-circle.png')}
          />
        </View>
        <Text
            style={styles.sheetTxt}
            >
           Password updated successfully
            </Text>
            <Button
                mode='contained'
                style={[styles.btn,{
                  top:'-10%',
                  marginHorizontal:'15%'
                }]}
                
                contentStyle={styles.btnContent}
                onPress={()=>{
                refRBSheet.current.close()
                navigation.navigate('Login')
                  
                }}
            >
                <Text
                    style={styles.btnText}
                >GO TO LOGIN
                </Text>
            </Button>
      </RBSheet>
    </SafeAreaView>



  );
}

export default NewPass;
