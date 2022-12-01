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
import styles from './styles';
import BrickList from 'react-native-masonry-brick-list';
import image_url from '../../../consts/image_url';
import { isConfiguredCheck } from 'react-native-reanimated/lib/reanimated2/core';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Tags({ navigation }) {
  const [value, setValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  // loading indicator
  const [loading, setloading] = useState(true);

 
  // get all news apis

 
  

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
      <Text>Hwello</Text>

       
      </View>



    </SafeAreaView>



  );
}

export default Tags;
