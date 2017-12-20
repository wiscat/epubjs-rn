var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require("react");var _react2=_interopRequireDefault(_react);

var _reactNative=require("react-native");









var _reactNativeOrientation=require("react-native-orientation");var _reactNativeOrientation2=_interopRequireDefault(_reactNativeOrientation);

var _reactNativeFetchBlob=require("react-native-fetch-blob");var _reactNativeFetchBlob2=_interopRequireDefault(_reactNativeFetchBlob);













var _epubjs=require("epubjs");var _epubjs2=_interopRequireDefault(_epubjs);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}if(!global.Blob){global.Blob=_reactNativeFetchBlob2.default.polyfill.Blob;}global.JSZip=global.JSZip||require("jszip");global.URL=require("epubjs/libs/url/url-polyfill.js");if(!global.btoa){global.btoa=require("base-64").encode;}

var core=require("epubjs/lib/utils/core");
var Uri=require("epubjs/lib/utils/url");
var Path=require("epubjs/lib/utils/path");

var Rendition=require("./Rendition");var

Epub=function(_Component){_inherits(Epub,_Component);

function Epub(props){_classCallCheck(this,Epub);var _this=_possibleConstructorReturn(this,(Epub.__proto__||Object.getPrototypeOf(Epub)).call(this,
props));

var bounds=_reactNative.Dimensions.get("window");

_this.state={
toc:[],
show:false,
width:bounds.width,
height:bounds.height,
orientation:"PORTRAIT"};return _this;


}_createClass(Epub,[{key:"render",value:function render()

































































































































































































































































{var _this2=this;
return(
_react2.default.createElement(Rendition,{
ref:function ref(r){
_this2.rendition=r;





},
url:this.props.src,
flow:this.props.flow,
minSpreadWidth:this.props.minSpreadWidth,
stylesheet:this.props.stylesheet,
webviewStylesheet:this.props.webviewStylesheet,
script:this.props.script,
onSelected:this.props.onSelected,
onMarkClicked:this.props.onMarkClicked,
onPress:this.props.onPress,
onLongPress:this.props.onLongPress,
onViewAdded:this.props.onViewAdded,
beforeViewRemoved:this.props.beforeViewRemoved,
themes:this.props.themes,
theme:this.props.theme,
fontSize:this.props.fontSize,
font:this.props.font,
display:this.props.location,

orientation:this.state.orientation,
backgroundColor:this.props.backgroundColor,
onError:this.props.onError,
onDisplayed:this.props.onDisplayed}));


}}]);return Epub;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
flexDirection:"column"},

manager:{
flex:1},

scrollContainer:{
flex:1,
marginTop:0,
flexDirection:"row",
flexWrap:"nowrap",
backgroundColor:"#F8F8F8"},

rowContainer:{
flex:1},

loadScreen:{
position:"absolute",
top:0,
bottom:0,
left:0,
right:0,
backgroundColor:"#fff",
justifyContent:"center",
alignItems:"center"}});



module.exports=Epub;