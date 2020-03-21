const cheerio = require('react-native-cheerio')

import Config from "@/config/index";
import { Alert } from 'react-native';

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
        mode: "cors",
    };
    let mergeConfig = Object.assign({}, initConfig, configInfo);
    let url = apiName;
    console.log('6-------------', url)

    return new Promise(reject => {
        fetch(url, mergeConfig).then((response:any) => response.text()).then(data => {
            const htmlObj = cheerio.load(data);
            reject(htmlObj);
        }).catch((err) => {
            // Alert.alert(`请求地址：${url}`,`请求失败：${JSON.stringify(err)};`)
        });
    });
};