import 'react-native-gesture-handler';
import React, { useRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Image
} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigationState,
  useRoute,
  useNavigationContainerRef,
  StackActions,
  NavigationActions,
} from '@react-navigation/native';
import COLORS from './app/src/consts/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import Login from './app/src/views/screens/logins/Login';
import Signup from './app/src/views/screens/signup/Signup';
import Onboarding from './app/src/views/screens/Onboarding/Onboarding';
import Forgetpass from './app/src/views/screens/Forgetpass/Forgetpass';
import VerifyCode from './app/src/views/screens/VerifyCode/VerifyCode';
import NewPass from './app/src/views/screens/NewPass/NewPass';
import Feed from './app/src/views/screens/Feed/Feed';
import Discover from './app/src/views/screens/Discover/Discover';
import AddPost from './app/src/views/screens/AddPost/AddPost';
import  Saved from './app/src/views/screens/Saved/Saved';
import Profile from './app/src/views/screens/Profile/Profile';
import EditProfile from './app/src/views/screens/EditProfile/EditProfile';
import LiveStream from './app/src/views/screens/LiveStream/LiveStream';
import LiveStreamDetail from './app/src/views/screens/LiveStreamDetail/LiveStreamDetail';
import FeedDetails from './app/src/views/screens/FeedDetails/FeedDetails';
import webDetail from './app/src/views/screens/webDetail/webDetail';
import NewsByAuthor from './app/src/views/screens/NewsByAuthor/NewsByAuthor';
import CommentList from './app/src/views/screens/CommentList/CommentList';
import MyComments from './app/src/views/screens/MyComments/MyComments';
import Tags from './app/src/views/screens/Tags/Tags';
import FeedByAuthor from './app/src/views/screens/FeedByAuthor/FeedByAuthor';
import MakePayment from './app/src/views/screens/MakePayment/MakePayment';
import MakePayAuthor from './app/src/views/screens/MakePayAuthor/MakePayAuthor';
import BeTheOwner from './app/src/views/screens/BeTheOwner/BeTheOwner';
import BeTheOwnerDetail from './app/src/views/screens/BeTheOwnerDetail/BeTheOwnerDetail';
import Sponser from './app/src/views/screens/Sponser/Sponser';
import SponsersSpaces from './app/src/views/screens/SponsersSpaces/SponsersSpaces';
import Agencia from './app/src/views/screens/Agencia/Agencia';
import AgenciaDetail from './app/src/views/screens/AgenciaDetail/AgenciaDetail';
import Products from './app/src/views/screens/Products/Products';
import ProductDetail from './app/src/views/screens/ProductDetail/ProductDetail';
import Cart from './app/src/views/screens/Cart/Cart';
import MakePaymentOrder from './app/src/views/screens/MakePaymentOrder/MakePaymentOrder';
import OrderHistory from './app/src/views/screens/OrderHistory/OrderHistory';
import CartList from './app/src/views/screens/CartList/CartList';
import PaytoAuthor from './app/src/views/screens/PaytoAuthor/PaytoAuthor';
import BuySpace from './app/src/views/screens/BuySpace/BuySpace';
import MySpacesBuyed from './app/src/views/screens/MySpacesBuyed/MySpacesBuyed';
import MyAppliedJob from './app/src/views/screens/MyAppliedJob/MyAppliedJob';
import AddNewJob from './app/src/views/screens/AddNewJob/AddNewJob';
import MyPostedJobs from './app/src/views/screens/MyPostedJobs/MyPostedJobs';
import MyApplicants from './app/src/views/screens/MyApplicants/MyApplicants';
import BuyOwner from './app/src/views/screens/BuyOwner/BuyOwner';
import MyTeamBuyed from './app/src/views/screens/MyTeamBuyed/MyTeamBuyed';
import BecomeanAuthor from './app/src/views/screens/BecomeanAuthor/BecomeanAuthor';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs({route}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          paddingTop: 5,
          paddingBottom: 10,
          backgroundColor: COLORS.dark,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderWidth: 1,
          borderColor: '#fff',
          shadowColor: 'red',
          elevation: 8,
          shadowOpacity: 1,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 2
          }

        },
        tabBarActiveTintColor: COLORS.secondary,
        headerShown: false,
        // tabBarActiveBackgroundColor:COLOR.primary,

      }}
    >
      <Tab.Screen name="Feed" component={Feed}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ?
                  require('./app/src/assets/bottomTab/home-active.png')
                  : require('./app/src/assets/bottomTab/home.png')
              }
              style={{
                width: 20,
                height: 20,
                borderColor: 'red',
                alignContent: 'center',
              }}
            />

          ),
        }}
      />
      <Tab.Screen name="Discover" component={Discover}
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ?
                  require('./app/src/assets/bottomTab/discover-active.png')
                  : require('./app/src/assets/bottomTab/discover.png')
              }
              style={{
                width: 20,
                height: 20,
                borderColor: 'red',
                alignContent: 'center',
              }}
            />

          ),
        }}
      />
      <Tab.Screen name="AddPost" component={AddPost}
        options={{
          title: ' ',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ?
                  require('./app/src/assets/bottomTab/addPost-active.png')
                  : require('./app/src/assets/bottomTab/addPost.png')
              }
              style={{
                width: 25,
                height: 25,
                borderColor: 'red',
                alignContent: 'center',
                marginTop: '12%'
              }}
            />

          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            console.log(routeName)
            if (routeName === 'AddPost') {
              return { display: "none" }
            }
            return
          })(route),
        }}
      />
      <Tab.Screen name="Saved" component={Saved}
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ?
                  require('./app/src/assets/bottomTab/saved-active.png')
                  : require('./app/src/assets/bottomTab/saved.png')
              }
              style={{
                width: 15.42,
                height: 19.83,
                borderColor: 'red',
                alignContent: 'center',
              }}
            />

          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused ?
                  require('./app/src/assets/bottomTab/profile-active.png')
                  : require('./app/src/assets/bottomTab/profile.png')
              }
              style={{
                width: 15.42,
                height: 19.83,
                borderColor: 'red',
                alignContent: 'center',
              }}
            />

          ),
        }}
      />

    </Tab.Navigator>
  );
}


const App = () => {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{ header: () => null }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgetpass" component={Forgetpass} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="NewPass" component={NewPass} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="LiveStream" component={LiveStream} />
        <Stack.Screen name="LiveStreamDetail" component={LiveStreamDetail} />
        <Stack.Screen name="FeedDetails" component={FeedDetails} />
        <Stack.Screen name="webDetail" component={webDetail} />
        <Stack.Screen name="Tags" component={Tags} />
        <Stack.Screen name="FeedByAuthor" component={FeedByAuthor} />
        <Stack.Screen name="CommentList" component={CommentList} />
        <Stack.Screen name="MyComments" component={MyComments} />
        <Stack.Screen name="MakePayment" component={MakePayment} />
        <Stack.Screen name="MakePayAuthor" component={MakePayAuthor} />
        <Stack.Screen name="BeTheOwner" component={BeTheOwner} />
        <Stack.Screen name="BeTheOwnerDetail" component={BeTheOwnerDetail} />
        <Stack.Screen name="Sponser" component={Sponser} />
        <Stack.Screen name="SponsersSpaces" component={SponsersSpaces} />
        <Stack.Screen name="Agencia" component={Agencia} />
        <Stack.Screen name="AgenciaDetail" component={AgenciaDetail} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="MakePaymentOrder" component={MakePaymentOrder} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="CartList" component={CartList} />
        <Stack.Screen name="PaytoAuthor" component={PaytoAuthor} />
        <Stack.Screen name="BuySpace" component={BuySpace} />
        <Stack.Screen name="MySpacesBuyed" component={MySpacesBuyed} />
        <Stack.Screen name="MyAppliedJob" component={MyAppliedJob} />
        <Stack.Screen name="AddNewJob" component={AddNewJob} />
        <Stack.Screen name="MyPostedJobs" component={MyPostedJobs} />
        <Stack.Screen name="MyApplicants" component={MyApplicants} />
        <Stack.Screen name="BuyOwner" component={BuyOwner} />
        <Stack.Screen name="MyTeamBuyed" component={MyTeamBuyed} />
        <Stack.Screen name="BecomeanAuthor" component={BecomeanAuthor} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
