
import {AllShuYuanIdsKey} from './index';
// 首页数据类型
export type HomeList = {
    // 优质推荐
    qualityRecommended: Array<{
        title?: string,
        logo?: string,
        id: number,
        source: AllShuYuanIdsKey,
    }>,
    // 本周排行榜
    weekRankings: Array<{
        title?: string,
        logo?: string,
        id: number,
        author?: string,
        desc?: string,
        source: AllShuYuanIdsKey,
    }>,
}

export default class KuaiYan {
    static sourceName = 'KuaiYan';
    // 获取首页分类强推
    static getHomeClassifyList($:any):HomeList {
        const ptCard1Obj = $('.pt-card-1 li');
        const ptCard2Obj = $('.pt-card-7');
        let dataList:any = {
            // 优质推荐
            qualityRecommended: [],
            // 本周排行榜
            weekRankings: [],
        };
        // 获取优质推荐
        ptCard1Obj.each((index:number,element:any) => {
            const imgDom = $(element).find('img');
            const id = $(element).find('a').attr('href').replace('/', '').replace('.html', '');
            dataList.qualityRecommended.push({
                title: imgDom.attr('alt'),
                logo: imgDom.attr('src'),
                id: id,
                source: KuaiYan.sourceName,
            })
        });
        // 本周排行榜
        ptCard2Obj.each((index:number,element:any) => {
            const liDom = $(element).find('li');
            liDom.each((indexItem:number,elementItem:any) => {
                const data:any = {};
                const imgDom = $(elementItem).find('img');
                const ptAuthorDom = $(elementItem).find('.pt-author');
                const nameDom = $(elementItem).find('.pt-name a');
                const ptDescDom = $(elementItem).find('.pt-desc');
                data.title = nameDom.text();
                data.id = nameDom.attr('href').replace('/', '').replace('.html', '');
                data.logo = imgDom.attr('src');
                data.author = ptAuthorDom.text();
                data.desc = ptDescDom.text();
                data.source = KuaiYan.sourceName;
                dataList.weekRankings.push(data);
            });
            
        });
        return dataList;
    }
};
