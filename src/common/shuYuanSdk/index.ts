
import useSWR from 'swr';
import {requestGetPage} from '@/common/http';

import KuaiYan from './kuaiYan';

export type AllShuYuanIdsKey = '快眼看书';
type CurrentShuYuanIdsType = Array<AllShuYuanIdsKey>;
type CurrentShuYuanIdsProps = {
    [key in AllShuYuanIdsKey]: {
        /** 别名 **/ 
        label: string,
        /** 处理方法 **/ 
        handle: any, 
        /** 首页网址 **/ 
        home: string, 
        /** PC首页网址 **/ 
        homePc: string,
        /** 小说目录网址 **/ 
        directory: string, 
        /** 小说文章网址 **/ 
        article: string, 
        /** 小说搜索网址 **/ 
        search: string, 
        /** 小说分类 **/ 
        fictionClassification: string,
    }
};
/** 首页数据类型 **/
export type HomeList = {
    /** 优质推荐 **/
    qualityRecommended: Array<{
        title?: string,
        logo?: string,
        id: number,
        source: AllShuYuanIdsKey,
    }>,
    /** 本周排行榜 **/
    weekRankings: Array<{
        title?: string,
        logo?: string,
        id: number,
        author?: string,
        desc?: string,
        source: AllShuYuanIdsKey,
    }>,
}
export type DirectoryListType = Array<{
    /** 文章标题 **/
    title?: string,
    /** 第几章 **/
    number?: string,
    /** 文章地址 **/
    id: string,
    /** 平台标识 **/
    source: AllShuYuanIdsKey,
}>;
export type ArticleType = {
    /** 上一页地址 **/
    prev: string,
    /** 下一页地址 **/
    next: string,
    /** 当前页面地址 **/
    current: string,
    /** 文章 **/
    doc: string,
    /** 文章标题 **/
    title: string,
};
/** 获取目录方法参数类型 **/
export type GetDirectoryPageInfoType = {
    /** 小说标识 **/
    id: string, 
    /** 小说名字 **/
    title: string, 
    /** 平台标识 **/
    source: AllShuYuanIdsKey, 
};
/** 获取搜索方法参数类型 **/
export type SearchListType = Array<{
    source: AllShuYuanIdsKey,
    id: number,
    author: string,
    title: string,
    newSection?: string,
    logo?: string,
}>;
/** 获取搜索条件参数类型 **/
export type SearchConditionType = {
    source: AllShuYuanIdsKey,
    keyword: string,
};
/** 获取小说分类列表类型 **/
export type BibliothecaLabelListType = {
    label: string,
    name: string,
}[];
/** 获取小说分类搜索出来的小说列表类型 **/
export type BibliothecaFictionListType = {
    source: AllShuYuanIdsKey,
    id: number,
    author: string,
    title: string,
    introduce: string,
    logo: string,
}[];
/** 获取小说收藏出来的小说列表类型 **/
export type FavoritesListType = {
    source: AllShuYuanIdsKey,
    id: number,
    author: string,
    title: string,
    logo: string,
}[];

export default class ShuYuanSdk {
    constructor(shuYuanList: CurrentShuYuanIdsType) {
        this.currentShuYuanIds = shuYuanList;
    }
    static newObj(shuYuanList: CurrentShuYuanIdsType):ShuYuanSdk {
        return new ShuYuanSdk(shuYuanList);
    }
    /** 全部书源标识 **/
    static allShuYuanIds:CurrentShuYuanIdsProps = {
        // '零七中文网': {
        //     label: '神圣天堂',
        //     handle: KuaiYan,
        //     home: 'https://www.07zw.com',
        //     directory: '', 
        //     article: '',
        //     search: '',
        //     fictionClassification: '',
        // },
        '快眼看书': {
            label: '乌托邦',
            handle: KuaiYan, // 处理方法
            home: 'http://m.booksky.cc',
            homePc: 'http://www.booksky.cc',
            directory: 'http://www.booksky.cc/', // http://www.booksky.cc/355476.html 
            article: 'http://www.booksky.cc/',
            search: 'http://www.booksky.cc/modules/article/search.php?searchkey=',
            fictionClassification: 'http://www.booksky.cc/category/all/',
        },
    };
    /** 当前需要获取的书院源 **/
    currentShuYuanIds: CurrentShuYuanIdsType = [];
    // 获取首页信息请求地址
    static getHomePageInfoUrl():string {
        return `getHomePageInfoUrl`;
    }
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
    /** 获取目录信息请求地址 **/
    static getDirectoryPageInfoUrl(data: GetDirectoryPageInfoType):string {
        return `${ShuYuanSdk.allShuYuanIds[data.source].directory}${data.id}.html`;
    }
    /** 获取目录信息 **/
    static async getDirectoryPageInfo(data: GetDirectoryPageInfoType):Promise<DirectoryListType> {
        let url = ShuYuanSdk.getDirectoryPageInfoUrl(data);
        const html:any = await requestGetPage(url);
        let handle = ShuYuanSdk.allShuYuanIds[data.source].handle;

        return handle.getDirectoryList(html);
    }
    /** 获取文章信息请求地址 **/
    static getArticleInfoUrl(data: DirectoryListType[0]):string {
        return `${ShuYuanSdk.allShuYuanIds[data.source].article}${data.id}`;
    }
    /** 获取文章信息 **/
    static async getArticleInfo(data: DirectoryListType[0]):Promise<ArticleType> {
        const html:any = await requestGetPage(
            `${ShuYuanSdk.allShuYuanIds[data.source].article}${data.id}`
            );
        let handle = ShuYuanSdk.allShuYuanIds[data.source].handle;

        return handle.getArticleInfo(html, data.id);
    }
    /** 各大书院分类强推数据合并 **/
    mergeClassify(html: any, v:keyof typeof ShuYuanSdk.allShuYuanIds):HomeList {
        let handle = ShuYuanSdk.allShuYuanIds[v].handle;
        let homeListObj:HomeList = handle.getHomeClassifyList(html);

        return homeListObj;
    }
    /** 获取搜索结果信息 **/
    static async getSearchInfo(data: {
        source: AllShuYuanIdsKey,
        keyword: string,
    }):Promise<SearchListType> {
        let url = ShuYuanSdk.getSearchInfoUrl(data);
        const html:any = await requestGetPage(url);
        let handle = ShuYuanSdk.allShuYuanIds[data.source].handle;

        return handle.getSearchList(html);
    }
    /** 获取搜索结果请求地址 **/
    static getSearchInfoUrl(data: SearchConditionType):string {
        return `${ShuYuanSdk.allShuYuanIds[data.source].search}${data.keyword}`;
    }
    /** 获取书库小说分类标签信息 **/
    static async getBibliothecaLabelList(source: AllShuYuanIdsKey):Promise<BibliothecaLabelListType> {
        let url = ShuYuanSdk.getBibliothecaListUrl(source);
        const html:any = await requestGetPage(url);
        let handle = ShuYuanSdk.allShuYuanIds[source].handle;
        return handle.getBibliothecaList(html);
    }
    /** 获取书库小说分类标签信息地址 **/
    static getBibliothecaListUrl(source: AllShuYuanIdsKey):string {
        return `${ShuYuanSdk.allShuYuanIds[source].fictionClassification}`;
    }
    /** 获取书库小说分类小说信息 **/
    static async getBibliothecaFictionList(data: {
        source: AllShuYuanIdsKey,
        url: string,
    }):Promise<BibliothecaFictionListType> {
        const html:any = await requestGetPage(data.url);
        let handle = ShuYuanSdk.allShuYuanIds[data.source].handle;
        return handle.getBibliothecaFictionList(html);
    }
}
