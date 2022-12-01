import {StyleSheet} from 'react-native'
import COLORS from '../../../consts/colors';

const STYLES = StyleSheet.create({
    mainView:{
        justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '5%',
    },
    txtInptView:{
        flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
    },
    txtInpt:{
        width: '95%',
                backgroundColor: COLORS.dark,
                color: COLORS.white,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                paddingVertical: '5%',
                fontSize: 15,
                alignSelf: 'center'
    },
    frgtpss:{
        alignSelf: 'flex-end',
                  color: COLORS.white,
                  marginHorizontal: '3%',
                  marginVertical: '2%',
                  fontFamily: 'JosefinSans-Bold',
                  textTransform: 'uppercase',
    },
    // --or -- stlye 
    orView:{
        fontFamily: 'JosefinSans-Bold',
        alignSelf: 'center',
        marginTop: '10%',
        color: COLORS.white,},
    // --signup / login text style
    SgnOrIntxt:{
        fontFamily: 'Raleway-Regular',
                alignSelf: 'center',
                marginTop: '5%',
                color: COLORS.white,
                alignContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
    // btn 
    btn:{
        borderRadius: 50,
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        marginVertical: '25%',
        
        },
    btnContent:{
        padding: '2%',
        fontFamily: 'JosefinSans-Bold',
    },
    btnText:{
        fontFamily: 'JosefinSans-Bold',
        color: COLORS.white,
        },
        // passowrd deatil
        passDetail:{
            color:COLORS.white,
              textAlign:'center',
              marginHorizontal:'15%',
              top:'-5%',
              textTransform:'capitalize',
        },
        // back btn
        backBtn:{
            alignSelf:'flex-start',
              paddingVertical:5,
              paddingHorizontal:10,
              borderRadius:30,
              marginVertical:'2%'
        },
        // btmSheet
        sheetContainer:{
            flexDirection:'row',
            justifyContent:'flex-end',
            alignContent:'flex-end'
        },
        sheetImg:{
            alignSelf:'center',
              width:100,
              height:100,
              marginVertical:10
        },
        sheetTxt :{
            color:COLORS.white,
              textAlign:'center',
              marginHorizontal:'15%',
              top:'5%'
        }
   
      
        
})

export default STYLES; 