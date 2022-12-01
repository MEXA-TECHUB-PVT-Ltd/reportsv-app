import {StyleSheet} from 'react-native'
import COLORS from '../../consts/colors';

const STYLES = StyleSheet.create({
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
    Fbbtn:{
        borderRadius: 50,
            color: COLORS.white,
            backgroundColor: COLORS.blue,
            marginTop: '5%',
        },
    FbbtnContent:{
        padding: '2%',
        },
// login header 
    img:{
        width: 100,
        height: 85.19,
    },
    bkgImg:{
        width: '100%',
        height: 92,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '10%',
    },
    bkgImgText:{
        fontSize: 30,
                marginBottom: '5%',
                color: COLORS.white,
                fontFamily: 'Chunk',
    },
        
      
        
})

export default STYLES; 