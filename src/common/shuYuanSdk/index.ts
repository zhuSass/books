
import {requestGetPage} from '@/common/http';

import KuaiYan,{HomeList} from './kuaiYan';

export type AllShuYuanIdsKey = '零七中文网' | '快眼看书';
type CurrentShuYuanIdsType = Array<AllShuYuanIdsKey>;
type CurrentShuYuanIdsProps = {
    [key in AllShuYuanIdsKey]: {
        handle: any, // 处理方法
        home: string, // 首页网址
    }
};

export default class ShuYuanSdk {
    constructor(shuYuanList: CurrentShuYuanIdsType) {
        this.currentShuYuanIds = shuYuanList;
    }
    static newObj(shuYuanList: CurrentShuYuanIdsType):ShuYuanSdk {
        return new ShuYuanSdk(shuYuanList);
    }
    // 全部书源标识
    static allShuYuanIds:CurrentShuYuanIdsProps = {
        '零七中文网': {
            handle: KuaiYan,
            home: 'https://www.07zw.com',
        },
        '快眼看书': {
            handle: KuaiYan, // 处理方法
            home: 'http://m.booksky.cc',
        },
    };
    // 当前需要获取的书院源
    currentShuYuanIds: CurrentShuYuanIdsType = [];
    // 获取首页信息
    async getHomePageInfo():Promise<HomeList> {
        let list:HomeList = {
            qualityRecommended: [],
            weekRankings: [],
        };
        for (const v of this.currentShuYuanIds) {
            const html:any = await requestGetPage(ShuYuanSdk.allShuYuanIds[v].home);
            // 获取分类强推数据
            const homeListObj = this.mergeClassify(html, v);
            list.qualityRecommended = 
                list.qualityRecommended.concat(homeListObj.qualityRecommended);
            list.weekRankings = 
                list.weekRankings.concat(homeListObj.weekRankings);
        }
        return list;
    }
    // 各大书院分类强推数据合并
    mergeClassify(html: any, v:keyof typeof ShuYuanSdk.allShuYuanIds):HomeList {
        let handle = ShuYuanSdk.allShuYuanIds[v].handle;
        let homeListObj:HomeList = handle.getHomeClassifyList(html)

        return homeListObj;
    }
}
