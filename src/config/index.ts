import Config from "react-native-config";

if (Config.NODE_CONST === 'dev') {
    // 要查看所有的请求在chrome开发工具的网络选项卡中显示
//     global.XMLHttpRequest = global.originalXMLHttpRequest
//     ? global.originalXMLHttpRequest
//     : global.XMLHttpRequest
//   global.FormData = global.originalFormData
//     ? global.originalFormData
//     : global.FormData
  
//   fetch // Ensure to get the lazy property
  
//   if (window.__FETCH_SUPPORT__) {
//     // it's RNDebugger only to have
//     window.__FETCH_SUPPORT__.blob = false
//   } else {
//     /*
//      * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
//      * If you're using another way you can just use the native Blob and remove the `else` statement
//      */
//     global.Blob = global.originalBlob ? global.originalBlob : global.Blob
//     global.FileReader = global.originalFileReader
//       ? global.originalFileReader
//       : global.FileReader
//   }
}

export default Config;