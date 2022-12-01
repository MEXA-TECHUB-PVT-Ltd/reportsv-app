import {

  Dimensions,

} from 'react-native';
import { StyleSheet } from 'react-native'
import COLORS from '../../../consts/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const STYLES = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: '1%',
    color: COLORS.white,
    fontFamily: 'Chunk',
    textAlign: 'center',

  },
  imgBkg: {
    width: '100%',
    height: 60,
    marginVertical: '5%',
  },
  // flatllsit
  contntContaner: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginBottom: 20

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
    paddingHorizontal: '4%',

  },
  renderText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderRadius: 30,
    width: 100,
    borderRadius: 50,
    // height: 40,
    elevation: 12,
    marginVertical: 15,
    color: 'white',
  },
  shadow: {

    width: 28,
    borderRadius: 50,
    height: 25,
    shadowColor: '#fff',
    elevation: 8,
    marginVertical: 10


  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  imgBkg2: {
    width: width / 1.1,
    height: 120,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: '5%',
  },
  imgView2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },
  imgTxt2: {
    width: '80%',
    color: 'white',
  },
  // 2nd flatlist
  imgBkg3: {

    height: 200,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
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
    paddingHorizontal: 10,
  },
  profileImg:{
    width:110,
    height:110,
    alignSelf:'center',
    borderRadius:100,
    padding:10,
    borderWidth:5,
    borderColor:COLORS.primary,
  },
  profileInfo:{
  flexDirection:'row',     
  },
  // flatlsit
  




})

export default STYLES; 