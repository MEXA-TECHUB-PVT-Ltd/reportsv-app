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
import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function VerifyCode({ navigation }) {
  const [value, setValue] = useState('');
  // code confrimation
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // code confrimation end

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
            style={{
              alignSelf:'flex-start',
              paddingVertical:5,
              paddingHorizontal:10,
              borderRadius:30,
              marginVertical:'2%'

            }}
            onPress={()=>{
              navigation.goBack()
            }}
          >
          <Icon name="chevron-left" size={20} 
          color={COLORS.secondary} />
          </TouchableOpacity> 

          <LoginHeader navigation={navigation}
            bkgImgType={'verify'}
            bkgImgText={'VERIFY CODE'}
          
          />
            <Text
            style={{
              color:COLORS.white,
              textAlign:'center',
              marginHorizontal:'5%',
              top:'-5%'
            }}
            >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            </Text>

            <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />


          <View style={styles.txtInptView}>
          <Button
                mode='contained'
                style={styles.btn}
                
                contentStyle={styles.btnContent}
                onPress={()=>{
                navigation.navigate('NewPass')
                }}
            >
                <Text
                    style={styles.btnText}
                >VERIFY
                </Text>
            </Button>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>



  );
}

export default VerifyCode;
