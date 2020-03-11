
import {requestGetPage} from '@/common/http';

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
    };
    // 当前需要获取的书院源
    currentShuYuanIds: currentShuYuanIdsProps = [];
    // 获取首页信息
    async getHomePageInfo() {
        for (const v of this.currentShuYuanIds) {
            let html = await requestGetPage(ShuYuanSdk.allShuYuanIds[v]);
            console.log('2------------', html)
        }
    }
}
