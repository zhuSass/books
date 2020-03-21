
import {HomeList,
        DirectoryListType,
        AllShuYuanIdsKey,
     } from './index';

export default class KuaiYan {
    constructor() {
    }
    static sourceName:AllShuYuanIdsKey = '快眼看书';
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
    // 获取目录章节
    static getDirectoryList($:any):DirectoryListType {
        const liDom = $('.fulldir li');
        const data:DirectoryListType = [];
        liDom.each((indexItem:number,elementItem:any) => {
            const targetDom = $(elementItem).find('a');
            const center = targetDom.text();
            const textArray = center.split(/\s+/);
            let pageNum = '';
            let title = '';
            if (textArray.length === 2) { // 正常章节
                pageNum = textArray[0].replace('第', '').replace('章', '');
                title = textArray[1].trim()
            } else {
                title = textArray[0];
                pageNum = `闲言-${indexItem}`;
            }

            data.push({
                title: title,
                number: pageNum,
                id: targetDom.attr('href'),
                source: KuaiYan.sourceName,
            })
        });
        return data;
    }
};
