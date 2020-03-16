import iconv from 'iconv-lite';
import {Buffer} from 'buffer';
const cheerio = require('react-native-cheerio')
const axios = require('axios');

import Config from "@/config/index";
import { Text } from 'native-base';

const API_LIST = {
    /*******************用户模块****************************/
    'login': `${Config.API_URL}/api/login`, // 登录接口
}

type apiNameType = (keyof typeof API_LIST);

export default function request(apiName: apiNameType, params:any = {}, configInfo:any = {}) {
    let initConfig:any = {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
        'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    };
    let mergeConfig = Object.assign({}, initConfig, configInfo);
    let url = API_LIST[apiName];

    if (mergeConfig.method === 'POST') {
        initConfig.body = JSON.stringify(params);
    } else if(mergeConfig.method === 'GET') {
        Object.keys(params).forEach((key, i) => {
            let str = '';
            if (i === 0) {
                str += `?`;
            }
            str += `${key}=${params.key}`;
            if (i !== params.length - 1) {
                str += `&`;
            }
            url += str;
        });
    }

    return new Promise(reject => {
        fetch(url, mergeConfig).then(res => {
            reject(res.json());
        });
    });
};
// 获取网页html资源
export function requestGetPage(apiName: string, configInfo:any = {}):Promise<string> {
    let initConfig:any = {
        headers: {
            encoding: null,
        },
    };
    let mergeConfig = Object.assign({}, initConfig, configInfo);
    let url = apiName;

    return new Promise(reject => {
        fetch(url, mergeConfig).then((response:any) => response.text()).then(data => {
            const htmlObj = cheerio.load(data);
            reject(htmlObj);
        });
        // fetch(url, mergeConfig).then((response:any) => response.text()).then(data => {
        //     data = Buffer.from(data, 'utf-8');
        //     let html = iconv.decode(data, 'utf-8').toString();
        //     console.log('1---------', html)
        //     reject(html);
        // });
        // fetch(url, mergeConfig).then((response:any) => response).then(data => {
        //     console.log('1---------', JSON.parse(JSON.stringify(data)))
        //     let html = iconv.decode(data._bodyBlob, 'gb2312').toString();
        //     console.log('1---------', data)
        //     reject('');
        // });
          
          // this is a simple example using `.then` and `.catch`
        //   axios({
        //     // responseType: 'arraybuffer',
        //     // responseType: 'blob',
        //     // responseType: 'arraybuffer',
        //     url: 'https://www.07zw.com',
        //     // responseEncoding: null, // default
        //     // transformResponse: [
        //     //     function(data:any) {
        //     //       var html = iconv.decode(data, 'gbk')
        //     //       return html
        //     //     }
        //     //   ]
        //   }).then((res:any) => {
        //     // let html = iconv.decode(res.body, 'gbk').toString();
        //     // console.log('3---------', html)
        //     // let html = iconv.decode(res.data, 'gb2312');
        //     // console.log('6---------', html)
        //     console.log('7---------', res.text())
        //   });
    });
};