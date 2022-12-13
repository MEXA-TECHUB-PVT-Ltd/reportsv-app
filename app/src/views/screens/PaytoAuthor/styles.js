import {
    
    Dimensions,
    
  } from 'react-native';
import {StyleSheet} from 'react-native'
import COLORS from '../../../consts/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const STYLES = StyleSheet.create({
    mainView:{
         marginVertical: '0%',
            paddingHorizontal: '2%',
    },
    
    // btn 
    btn:{
        borderRadius: 50,
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        marginTop: '10%',
        
        },
    btnContent:{
        padding: '2%',
        fontFamily: 'JosefinSans-Bold',
    },
    btnText:{
        fontFamily: 'JosefinSans-Bold',
        color: COLORS.white,
        },
    
  // back btn
    liveBtn:{
        alignSelf:'flex-end',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:30,
        marginVertical:'2%',
        marginTop:20
    },
    bkgImgText:{
        fontSize: 20,
                // top: '15%',
                color: COLORS.white,
                fontFamily: 'Chunk',
                width: '100%',
                textAlign: 'left',
              
    },
    imgBkg:{
       flexDirection:'row',
       justifyContent:'flex-end',
       marginTop: '0%',
      // backgroundColor: COLORS.red,
       marginBottom: '5%',
    },
    imgBkg2:{
       flexDirection:'row',
       justifyContent:'space-between',
       
       alignItems:'center',
       marginBottom: '5%',
    },
    // flatllsit
    contntContaner:{
        alignSelf:'flex-start',
        alignItems:'center',
        justifyContent:'flex-start',
        alignContent:'flex-start',
        marginBottom:20
       
    },
    bkgImg:{
        width: 40,
                height: 50,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:80,
               
    },
    header:{
        // paddingHorizontal: 6,
    },
    renderTouch:{
        paddingHorizontal: '2%',
        
                width: 120
    },
    renderText:{
                alignSelf: 'flex-start',
                textAlign: 'center',
                paddingVertical: '8%',
                borderRadius: 30,
                width: '100%',
                borderRadius: 50,
                top: 10,
                color: 'white',
    },
    shadow: {
        width: 28,
        borderRadius: 50,
        height: 25,
       marginVertical: '30%',
       marginRight: '5%',
    },
    
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      },
      imgBkg2:{
        width: width,
                    height: 150,
                    flexDirection: 'row',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    overflow: 'hidden',
                    marginBottom: '5%',
      },
      imgView2:{
        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        alignItems: 'center'
      },
      imgTxt2:{
        width: '80%',
                          color: 'white',
      },
      // 2nd flatlist
     
     
      imgBkgGradientViewLeft:{
        width: '80%',  
        marginBottom:10,
        justifyContent: 'flex-end',
        
    }
      ,
      imgBkgGradientViewLeftHeading:{
        color: COLORS.white,
                        marginBottom: 10   
    }
      ,
      imgBkgGradientViewLeftTitle:{
        color: COLORS.white,
    },
      imgBkgGradientViewRightRow:{
        flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
    }
    ,
      imgBkgGradientViewRightRowTxt:{
        color: COLORS.white,
                            paddingHorizontal: 10,
                            
    },
    imgBkg3:{
       
      height: 200,
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'white',
      overflow: 'hidden',
      marginBottom: '5%',
      justifyContent: 'space-between',
},txtInpt:{
  width: '95%',
          backgroundColor: COLORS.dark,
          color: COLORS.white,
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
          paddingVertical: '5%',
          fontSize: 15,
          alignSelf: 'center',
          // marginTop: '5%',
          // height  :100

}
      
      
          
})

export default STYLES; 