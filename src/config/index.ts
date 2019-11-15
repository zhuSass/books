import Config from "react-native-config";

if (Config.NODE_CONST === 'dev') {
    // 要查看所有的请求在chrome开发工具的网络选项卡中显示
    // XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    // GLOBAL.originalXMLHttpRequest :
    // GLOBAL.XMLHttpRequest;
  
    // // fetch logger
    // global._fetch = fetch;
    // global.fetch = function (uri, options, ...args) {
    // return global._fetch(uri, options, ...args).then((response) => {
    //   console.log('Fetch', { request: { uri, options, ...args }, response });
    //   return response;
    // });
    // };
}
console.log('2---------', Config)

export default Config;