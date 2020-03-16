
import {requestGetPage} from '@/common/http';

import KuaiYan from './kuaiYan';

type currentShuYuanIdsProps = Array<keyof typeof ShuYuanSdk.allShuYuanIds>;

export default class ShuYuanSdk {
    constructor(shuYuanList: currentShuYuanIdsProps) {
        this.currentShuYuanIds = shuYuanList;
    }
    static newObj(shuYuanList: currentShuYuanIdsProps):ShuYuanSdk {
        return new ShuYuanSdk(shuYuanList);
    }
    // 全部书源标识
    static allShuYuanIds = {
        '零七中文网': 'https://www.07zw.com',
        '快眼看书': 'http://www.booksky.cc/',
    };
    // 全部书源对应处理的对象
    static allShuYuanHandle = {
        '零七中文网': KuaiYan,
        '快眼看书': KuaiYan,
    };
    // 全部书源标识
    // static homePageInfo:currentShuYuanIdsProps = {
    //     '零七中文网': {},
    //     '快眼看书': {},
    // };
    // 当前需要获取的书院源
    currentShuYuanIds: currentShuYuanIdsProps = [];
    // 获取首页信息
    async getHomePageInfo() {
        for (const v of this.currentShuYuanIds) {
            const html:any = await requestGetPage(ShuYuanSdk.allShuYuanIds[v]);
            // 获取分类强推数据
            const classifyList = this.mergeClassify(html);
        }
    }
    // 各大书源分类强推数据合并
    mergeClassify(html: any) {
        let datalist:Array<any> = [];
        for (const v of this.currentShuYuanIds) {
            let handles = ShuYuanSdk.allShuYuanHandle[v];
            datalist.push(handles.getHomeClassifyList(html));
        }
    }
}
