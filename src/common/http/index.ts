import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

import Config from "@/config/index";

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
export function requestGetPage(apiName: string, configInfo:any = {}) {
    let initConfig:any = {
        encoding: null,
    };
    let mergeConfig = Object.assign({}, initConfig, configInfo);
    let url = apiName;

    return new Promise(reject => {
        console.log(`开始发出请求${url}`)
        fetch(url, mergeConfig).then((response:any) => response.text()).then(data => {
            data = Buffer.from(data, 'utf-8');
            let html = iconv.decode(data, 'gbk').toString();
            console.log('1---------', html)
            reject(html);
        });
        // fetch(url, mergeConfig).then((response:any) => response._bodyInit).then(data => {
        //     let html = iconv.decode(data, 'gbk').toString();
        //     console.log('1---------', data)
        //     reject(html);
        // });
    });

};