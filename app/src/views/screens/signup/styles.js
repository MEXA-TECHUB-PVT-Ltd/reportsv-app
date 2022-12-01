import {StyleSheet} from 'react-native'
import COLORS from '../../../consts/colors';

const STYLES = StyleSheet.create({
    mainView:{
        justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '20%',
            zIndex:-9
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
                flexDirection: 'row',},
    // --signin text style
    signinTxt :{
        color: COLORS.white,
                    borderBottomWidth:1,
                    borderBottomColor:COLORS.white,
    }








    
        
      
        
})

export default STYLES; 