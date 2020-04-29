
import useSWR from 'swr';
import {requestGetPage} from '@/common/http';

import KuaiYan from './kuaiYan';

export type AllShuYuanIdsKey = '零七中文网' | '快眼看书';
type CurrentShuYuanIdsType = Array<AllShuYuanIdsKey>;
type CurrentShuYuanIdsProps = {
    [key in AllShuYuanIdsKey]: {
        /** 处理方法 **/ 
        handle: any, 
        /** 首页网址 **/ 
        home: string, 
        /** 小说目录网址 **/ 
        directory: string, 
        /** 小说文章网址 **/ 
        article: string, 
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
}

export default class ShuYuanSdk {
    constructor(shuYuanList: CurrentShuYuanIdsType) {
        this.currentShuYuanIds = shuYuanList;
    }
    static newObj(shuYuanList: CurrentShuYuanIdsType):ShuYuanSdk {
        return new ShuYuanSdk(shuYuanList);
    }
    /** 全部书源标识 **/
    static allShuYuanIds:CurrentShuYuanIdsProps = {
        '零七中文网': {
            handle: KuaiYan,
            home: 'https://www.07zw.com',
            directory: '', 
            article: '',
        },
        '快眼看书': {
            handle: KuaiYan, // 处理方法
            home: 'http://m.booksky.cc',
            directory: 'http://www.booksky.cc/', // http://www.booksky.cc/355476.html 
            article: 'http://www.booksky.cc/',
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

        return handle.getArticleInfo(html);
    }
    /** 各大书院分类强推数据合并 **/
    mergeClassify(html: any, v:keyof typeof ShuYuanSdk.allShuYuanIds):HomeList {
        let handle = ShuYuanSdk.allShuYuanIds[v].handle;
        let homeListObj:HomeList = handle.getHomeClassifyList(html);

        return homeListObj;
    }
}
