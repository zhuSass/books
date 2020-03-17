
import {requestGetPage} from '@/common/http';

import KuaiYan,{HomeList} from './kuaiYan';

export type AllShuYuanIdsKey = keyof typeof ShuYuanSdk.allShuYuanIds;
type currentShuYuanIdsProps = Array<{
    AllShuYuanIdsKey: {
        home: string, // 首页
        handle: Function, // 处理方法
    }
}>;

export default class ShuYuanSdk {
    constructor(shuYuanList: currentShuYuanIdsProps) {
        this.currentShuYuanIds = shuYuanList;
    }
    static newObj(shuYuanList: currentShuYuanIdsProps):ShuYuanSdk {
        return new ShuYuanSdk(shuYuanList);
    }
    // 全部书源标识
    static allShuYuanIds = {
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
    currentShuYuanIds: currentShuYuanIdsProps = [];
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
        let hadnle = ShuYuanSdk.allShuYuanIds[v].handle;
        let homeListObj:HomeList = hadnle.getHomeClassifyList(html)

        return homeListObj;
    }
}
