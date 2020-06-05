
import ShuYuanSdk,{HomeList,
        DirectoryListType,
        AllShuYuanIdsKey,
        ArticleType,
        SearchListType,
        BibliothecaLabelListType,
        BibliothecaFictionListType,
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
        dataList.weekRankings.push({
            title: '诡秘之主',
            logo: 'http://www.booksky.cc/headimgs/322/322877/s322877.jpg',
            id: '322877',
            author: '爱潜水的乌贼',
            source: KuaiYan.sourceName,
            desc: '蒸汽与机械的浪潮中，谁能触及非凡？',
        });
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
            if (textArray.length >= 2) { // 正常章节
                pageNum = textArray[0];
                title = textArray.slice(1).join(' ');
            } else {
                title = textArray[0];
                pageNum = '';
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
    // 获取小说详情
    static getArticleInfo($:any, current: string):ArticleType {
        const titleArray = ($('.title a').attr('title') || []).split(/\s+/);
        const title:string = titleArray.slice(1).join(' ');
        const doc:string = $('#chaptercontent').text();
        const operateDom = $('.operate ul').children();
        const prevDom = operateDom.first().find('a');
        const nextDom = operateDom.last().find('a');
        const prev:string = prevDom.attr('title') === '没有了' ? '' : prevDom.attr('href');
        const next:string = nextDom.attr('title') === '没有了' ? '' : nextDom.attr('href');

        return {
            title,
            doc,
            prev,
            next,
            current,
        }
    }
    // 获取搜索信息
    static getSearchList($:any):SearchListType {
        const operateDom = $('.librarylist').find('li');
        const dataList:SearchListType = [];
        operateDom.each((index:number,element:any) => {
            try {
                const logo = $(element).find('img').attr('src');
                const id = $(element).find('.pt-ll-l a').attr('href').replace('/', '').replace('.html', '');
                const title = $(element).find('a').attr('title');
                const author = $(element).find('.info').children().last().text().replace('作者：', '');
                const newSection = $(element).find('.last').text().trim();
                dataList.push({
                    source: KuaiYan.sourceName,
                    id: id,
                    author: author,
                    title: title,
                    newSection: newSection,
                    logo: ShuYuanSdk.allShuYuanIds[KuaiYan.sourceName].home + logo,
                });
            } catch(e) {
                console.log('error:', e)
            }
        });
        return dataList;
    }
    // 获取小说分类信息
    static getBibliothecaList($:any):BibliothecaLabelListType {
        const operateDom = $('.novelselectlist').find('a');
        const dataList:BibliothecaLabelListType = [];
        operateDom.each((index:number,element:any) => {
            const name = ShuYuanSdk.allShuYuanIds[KuaiYan.sourceName].homePc + $(element).attr('href');
            const label = $(element).attr('title');
            dataList.push({
                name,
                label,
            })
        });
        return dataList;
    }
    // 获取小说分类搜索出来的小说列表
    static getBibliothecaFictionList($:any):BibliothecaFictionListType {
        const operateDom = $('.librarylist').find('li');
        const dataList:BibliothecaFictionListType = [];
        // console.log('1---------', $('.librarylist'))
        operateDom.each((index:number,element:any) => {
            try {
                const logo = $(element).find('img').attr('src');
                const dom = $(element).find('a').first();
                const id = dom.attr('href').replace('/', '').replace('.html', '');
                const title = dom.attr('title');
                const author = $(element).find('.info').children().last().text().replace('作者：', '');
                const introduce = $(element).find('.intro').text().trim();
                dataList.push({
                    source: KuaiYan.sourceName,
                    id: id,
                    author: author,
                    title: title,
                    introduce: introduce,
                    logo: logo,
                });
            } catch(e) {
                console.log('error:', e)
            }
        });
        return dataList;
    }
};
