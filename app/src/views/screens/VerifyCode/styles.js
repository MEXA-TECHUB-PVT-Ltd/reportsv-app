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
        marginTop: '15%',
        
        },
    btnContent:{
        padding: '2%',
        fontFamily: 'JosefinSans-Bold',
    },
    btnText:{
        fontFamily: 'JosefinSans-Bold',
        color: COLORS.white,
        },
    // code fields 
    codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor:COLORS.white,
    textAlign: 'center',
    margin:10,
    color:COLORS.white
  },
  focusCell: {
    borderColor: COLORS.primary,
  },
  // back btn
    backBtn:{
        alignSelf:'flex-start',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:30,
        marginVertical:'2%'
    },
    verifyTxt:{
        color:COLORS.white,
              textAlign:'center',
              marginHorizontal:'15%',
              top:'-5%'
    },






    
        
      
        
})

export default STYLES; 