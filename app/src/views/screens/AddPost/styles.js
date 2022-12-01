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
    marginBottom: '35%',
    width: '100%',

  },
  btnContent: {
    padding: '2%',
    fontFamily: 'JosefinSans-Bold',
  },
  btnText: {
    fontFamily: 'Chunk',
    color: COLORS.white,
    fontWeight: 'bold',
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
    fontSize: 25,
    // marginTop: '-4%',
    color: COLORS.white,
    fontFamily: 'Chunk',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginRight: '20%',

  },
  imgBkg: {
    width: '110%',
    height: 80,
    marginTop: '5%',
    alignContent: 'center', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    
    

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

    width: 120
  },
  renderText: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
    borderRadius: 30,
    width: '100%',
    borderRadius: 50,
    height: 35,
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
  uploadView: {
    borderWidth: 1,
    flexDirection: 'column',
    width: '80%',
    justifyContent: 'center',
    padding: '12%',
    borderColor: COLORS.light,
    borderRadius:15,
    borderStyle: 'dashed',
    alignContent: 'center',
    alignItems: 'center',
  }, uploadText:{
    color: COLORS.light,
    fontFamily: 'JosefinSans-Bold',
    marginVertical:10
  },txtInpt:{
    width: '95%',
            backgroundColor: COLORS.dark,
            color: COLORS.white,
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            paddingVertical: '5%',
            fontSize: 15,
            alignSelf: 'center',
            fontFamily: 'JosefinSans-Bold',
},
perDay:{
  // flexDirection:'row',
  color: COLORS.white,
  paddingTop: '2%',
  alignSelf: 'flex-end',
},
txtInptView:{
  flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
},
datePickerView:{
flexDirection: 'row',  
},
datePickerIcon:{
position: 'absolute',
alignSelf: 'flex-end',
right:0,
bottom:'15%',
padding:10,
},
// rb sheet
sheetContainer:{
  flexDirection: 'row',
  justifyContent: 'flex-end',
},
uploadView:{
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: '5%',
},
uploadText2:{
  marginLeft: '5%',
                fontSize: 18,
                color: COLORS.white,
},
hr:{
  flexDirection: 'row',
            borderWidth:.5,
            borderColor:COLORS.light,
            marginVertical:'5%',
            alignSelf:'center',
            width:'90%',
},
// img preview 
imgPreview:{
  width: '100%',
  height: 130,
  marginTop: '10%',
  borderRadius:10,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.white,
  flexDirection: 'row',
  flexWrap: 'wrap',
  flex:1
  
},




})

export default STYLES; 