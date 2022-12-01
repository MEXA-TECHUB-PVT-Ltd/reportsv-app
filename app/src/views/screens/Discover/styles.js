import {

  Dimensions,

} from 'react-native';
import { StyleSheet } from 'react-native'
import COLORS from '../../../consts/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const STYLES = StyleSheet.create({
  mainView: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: '0%',
    paddingHorizontal: '4%',
  },

  // btn 
  btn: {
    borderRadius: 50,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    marginTop: '15%',

  },
  btnContent: {
    padding: '2%',
    fontFamily: 'JosefinSans-Bold',
  },
  btnText: {
    fontFamily: 'JosefinSans-Bold',
    color: COLORS.white,
  },

  // back btn
  liveBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginVertical: '2%',
    marginTop: 20
  },
  bkgImgText: {
    fontSize: 40,
    // marginTop: '6%',
    color: COLORS.white,
    fontFamily: 'Chunk',
    textAlign: 'center',

  },
  imgBkg: {
    width: '100%',
    height: 55,
    marginTop: '10%'
  },
  // flatllsit
  contntContaner: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginBottom: 20,
    

  },
  bkgImg: {
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,

  },
  header: {
    paddingHorizontal: 6,
  },
  renderTouch: {
    width:width/2,
    alignSelf:'center',
    
    
  },
  renderView:{
    width:width/2.5,
    marginVertical:8,
    
   
    paddingVertical:10,
    height:height/6,
    borderRadius:10,
    
  },
  renderView2:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10
  },renderText:{
    color:COLORS.white,
    fontFamily:'JosefinSans-Bold',
    paddingHorizontal:10,
  },
  headline:{
    fontSize:20,
    fontFamily:'Chunk',
    color:COLORS.white,
    alignSelf:'flex-start',
  },
  // followed tag
  renderViewFollowTag:{
    flexDirection:'row',
            justifyContent:'space-between',
            alignContent:'space-between',
            width:width,
            paddingHorizontal:'2%',
            paddingVertical:'4%',
            width:width/1.1,
            
  },
  renderViewFollowTagTxt:{
   color:COLORS.white,
            
  },
  myComments:{
    flexDirection:'row',
    justifyContent:'flex-end',
    padding:10,
    backgroundColor:COLORS.red,
  },linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  imgBkg3: {

    
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
    marginBottom: '5%',
    justifyContent: 'space-between',
  },
  imgBkgGradientViewLeft: {
    width: '80%',
    marginBottom: 10
  }
  ,
  imgBkgGradientViewLeftHeading: {
    color: COLORS.white,
    marginBottom: 10
  }
  ,
  imgBkgGradientViewLeftTitle: {
    color: COLORS.white,
  },
  imgBkgGradientViewRightRow: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  }
  ,
  imgBkgGradientViewRightRowTxt: {
    color: COLORS.white,
    paddingHorizontal: 5,
  }
})

export default STYLES; 