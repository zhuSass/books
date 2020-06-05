const cheerio = require('react-native-cheerio')

import Config from "@/config/index";
import { Alert } from 'react-native';

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
export function requestGetPage(apiName: string, configInfo:any = {}):Promise<string> {
    let initConfig:any = {
        headers: {
            encoding: null,
        },
        mode: "cors",
    };
    let mergeConfig = Object.assign({}, initConfig, configInfo);
    let url = apiName;
console.log('request-----', url);
    return new Promise((resolve, reject) => {
        const htmlObj = cheerio.load(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title> 002 名正言顺的大小姐和声名狼藉的私生女 转码阅读 - 怦然婚动，老婆高高在上 快眼看书 -快眼看书</title>
    <meta name="keywords" content="怦然婚动，老婆高高在上 快眼看书,002 名正言顺的大小姐和声名狼藉的私生女,快眼看书" />
    <meta name="description" content="快眼看书提供《怦然婚动，老婆高高在上》最新章节的搜索，更新超级快，无病毒无木马，页面干净清爽，希望大家收藏!" />
    <meta name="robots" content="nofollow" />
    <meta name="author" content="www.ptcms.com">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="Cache-Control" content="no-transform " />
<link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
<meta name="applicable-device" content="pc">
<meta http-equiv="mobile-agent" content="format=html5; url=http://m.booksky.cc/novel/147649/read_2.html">
<link rel="stylesheet" href="/template/kuaiyankanshu-pc/public/css/global.css" />
<link rel="stylesheet" href="/template/kuaiyankanshu-pc/public/css/style.css" />
<!--[if lt IE 9]>
<script src="/template/kuaiyankanshu-pc/public/script/html5shiv.min.js"></script>
<![endif]-->
</head>
<body class="readpage">
<div class="frame-header">
    <div class="frame-header-content">
        <div class="logo"><a href="http://www.booksky.cc" title="快眼看书"><img src="/template/kuaiyankanshu-pc/public/image/logo.png" alt="快眼看书" /></a></div>
        <div class="searchbox">
            <form id="mysearch" action="/search.html" name="search-form" method="get">
                <input id="mysearch-q" type="text" class="text" name="searchkey" value="怦然婚动，老婆高高在上" onfocus="(function(o){if(o.value=='怦然婚动，老婆高高在上'){o.value='';o.className='focus'}})(this);" onblur="(function(o){if(o.value==''){o.value='怦然婚动，老婆高高在上';o.className='';}})(this)" autocomplete="off" /><input id="mysearch-s" type="hidden" name="s" value="">
                <button type="submit" class="searchbtn">搜书</button>
            </form>
        </div>
        <div class="frame-operate">
            <div class="frame-btn">
                <a href="/novel/147649/read_1.html" class="btn btn-primary btn-sm" title="001 黎湘的美，从来就是这样张扬明艳"><i class="pticon pticon-chevron-left"></i> 上一章</a>
                <a href="/147649.html" class="btn btn-default" title="怦然婚动，老婆高高在上"><i class="pticon pticon-list"></i> 目录</a>
                <a href="/novel/147649/read_3.html" class="btn btn-primary" title="003 她就只值五千万？">下一章 <i class="pticon pticon-chevron-right"></i></a>
                <a href="Javascript:void(0);" onclick="javascript:putbookmark(147649,1411694);" class="btn btn-danger" target="_blank"><i class="pticon pticon-bookmark"></i> 书签</a>
                <a href="/novel/147649/read_2.html" class="btn btn-success" title="快眼看书 002 名正言顺的大小姐和声名狼藉的私生女"><i class="pticon pticon-globe"></i> 源网站</a>
            </div>
            <div class="frame-source">
                <div class="dropmenu">
                    <span class="tri"></span>
                    <ul class="dropmenu-item">
                        <li><a href="javascript:void(0);" title="怦然婚动，老婆高高在上 快眼看书 002 名正言顺的大小姐和声名狼藉的私生女">快眼看书</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="readpage" >
    <div class="readbox">
        <article>
            <div class="title">
                <h1><a href="/novel/147649/read_2.html" title="怦然婚动，老婆高高在上 002 名正言顺的大小姐和声名狼藉的私生女">怦然婚动，老婆高高在上 002 名正言顺的大小姐和声名狼藉的私生女</a></h1>
                <div class="info">
                    <span>小说：<a href="/147649.html" title="怦然婚动，老婆高高在上">怦然婚动，老婆高高在上</a></span>
                    <span>作者：淡月新凉</span>
                    <span>更新时间：2017-03-14 17:04:50</span>
                    <span>源网站：<a href="/novel/147649/read_2.html" title="快眼看书 002 名正言顺的大小姐和声名狼藉的私生女">快眼看书</a></span>
                 </div>
            </div>
            <div class="content" id="chaptercontent">
                &nbsp;&nbsp;&nbsp;&nbsp;002&nbsp;名正言顺的大小姐和声名狼藉的私生女<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;黎湘结束相亲回到黎家别墅的时候，大宅里空空荡荡，一个人也没有。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;今天是黎家另一个女儿、黎湘的姐姐黎汐出家的好日子，家里所有人应该都在酒店，正祝福着黎家大小姐幸福美满的婚姻。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;很讽刺，黎家大小姐嫁给宛城颇有声望的程家最英俊杰出的儿子，而她这个二小姐却在同一时间被安排和一个大腹秃顶的离异男人相亲。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;没办法，谁让别人是名正言顺的黎家大小姐，而她黎湘不过是一个声名狼藉的私生女，连出席婚宴的资格都没有，唯恐脏了那一双新人神圣的殿堂。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;黎湘甩掉高跟鞋，走到酒柜旁边，给自己倒了杯威士忌，一饮而尽之后才转身上楼，回到自己的房间倒在了床上。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“黎湘！黎湘！”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;昏昏沉沉中不知道睡了多久，黎湘忽然听见有人在怒气冲冲地喊自己的名字，刚醒过来坐起身，她房间的门就被“砰”地推开了。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;进来的人是黎夫人宋琳玉，她爸爸黎仲文的妻子，素日里格外优雅端庄的一个人，此刻此刻却因为愤怒而气到面容扭曲。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“黎湘！”宋琳玉一下子冲到黎湘床前，抬起手就给了黎湘一个巴掌，气急败坏地指责，“你是个什么东西！也敢得罪张总？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;那一巴掌不算重，却还是打得黎湘有些晕，她皱着眉头想，才演完喜剧，这么快就改演家庭伦理剧了？<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“你知不知道张总有多少身家？你知不知道我费了多大的力气才找人搭上张总这条线？”宋琳玉呼吸又快又沉重，鼻翼不断地扩张，那张泛着油光有些脱妆的脸在灯光下显得格外狰狞，“你自己是个什么东西你不知道？还瞧不上张总？那你瞧得上谁？还有谁能瞧得上你，一个野种？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“琳玉！”她话音刚落，黎仲文大步走了进来，一把拉住她，“有话好好说你动什么手？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“我动手怎么了？”宋琳玉挣开丈夫，“她自己犯贱，就怨不得被打！”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;黎湘平静地看着他们，终于掀开被子下了床，亭亭站在两人面前，微微一笑，“阿姨不是说叫我去相亲吗？相亲当然有成功有失败，我不过是拒绝了张总而已，怎么就值得阿姨发这么大的火？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“拒绝？你凭什么拒绝？”宋琳玉再度开口，“你吃我们黎家的用我们黎家的，我不计较你的身份把你养到这么大，让你嫁谁你就要嫁谁！你有什么资格拒绝？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;黎湘听了，勾了勾嘴角，眼神有些冷了下来。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“湘湘。”黎仲文也终于对她开口，“你太任性了，有什么话可以回来跟我们商量了再说，怎么能当场拒绝张总这么不礼貌？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;黎湘听了，目光缓缓移到黎仲文脸上，“爸爸的意思也是要我乖乖嫁给那位张总？”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;“张总身家丰厚，而且他很喜欢你。你那么不礼貌地拒绝了他，他也不介意。”黎仲文缓缓说道，“湘湘，有些事情不能只看表面，你嫁给张总，他一定会很疼你的。”<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;黎湘听完，揉了揉自己的耳朵，轻笑起来。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;真是说的比唱的还好听。<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;            </div>
            <div class="info bottominfo">
                <div style="text-align: center;">
                    <!-- ab_set -->
                </div>
                为更好的阅读体验，本站章节内容基于百度转码进行转码展示，如有问题请您到源站阅读, <a href="https://m.baidu.com/pub/help.php?pn=20&bd_page_type=1" rel="nofollow">转码声明</a>。<br />
                <a href="http://www.booksky.cc">快眼看书</a>邀请您进入最专业的<a href="http://www.booksky.cc">小说搜索</a>网站阅读<a href="/147649.html" title="怦然婚动，老婆高高在上">怦然婚动，老婆高高在上</a>,<a href="/147649.html" title="怦然婚动，老婆高高在上">怦然婚动，老婆高高在上最新章节</a>,<a href="/147649.html" title="怦然婚动，老婆高高在上">怦然婚动，老婆高高在上 快眼看书</a>！
            </div>
        </article>
        <div class="operate">
            <ul>
                <li><a href="/novel/147649/read_1.html" title="001 黎湘的美，从来就是这样张扬明艳"><i class="pticon pticon-chevron-left"></i> 上一章</a></li>
                <li><a href="/147649.html" title="怦然婚动，老婆高高在上"><i class="pticon pticon-list"></i> 目录</a></li>
                <li class="last"><a href="/novel/147649/read_3.html" title="003 她就只值五千万？">下一章 <i class="pticon pticon-chevron-right"></i></a></li>
            </ul>
        </div>
        <div class="readingTips">
            可以使用回车、←→快捷键阅读
            <div class="readingSwitch none"><span class="readingSwitch_Btn active"></span>开启瀑布流阅读
            </div>
        </div>
    </div>
</section>
<footer>
    <div class="copyright w-all tac">
                        <a href="/about/about.html" title="关于我们">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/about/disdaimer.html" title="免责声明">免责声明</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/about/privacy.html" title="隐私条款">隐私条款</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/about/spider.html" title="蜘蛛协议">蜘蛛协议</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/about/employ.html" title="申请收录">申请收录</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/about/contact.html" title="联系我们">联系我们</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/sitemap/index.xml" title="sitemap" target="_blank">Sitemap</a>
        <br />
        Copyright © <a href="http://www.booksky.cc" target="_blank">快眼看书</a> All Rights Reserved .版权所有快眼看书。<br />
        本站内容系快眼看书根据您的指令搜索各大小说站得到的链接列表，不代表快眼看书赞成被搜索网站的内容或立场<br />
        如果版权人认为在本站放置您的作品有损您的利益，请发邮件至bookskycc@hotmail.com，本站确认后将会立即删除。<br />
        Processed in 0.029(s), Memory: 1.946MB, Sqls: 9, cacheread: 10, cachewrite: 2, net:0.<br>
    </div>
</footer>
<div class="gotop"><i class="pticon pticon-chevron-up"></i></div>
<script type="text/javascript" src="http://www.booksky.cc/public/script/jquery.min.js"></script>
<script type="text/javascript" src="http://www.booksky.cc/template/kuaiyankanshu-pc/public/script/common.js?20171204"></script>
<script type="text/javascript" src="/public/comm.js"></script>
<div style="display:none">
    <script type="text/javascript" src="http://www.booksky.cc/public/ptcms/tongji.js?v=20180425"></script>
</div>

<script type="text/javascript">
    document.onkeydown = gopage;
    var prevpage = "/novel/147649/read_1.html";
    var nextpage = "/novel/147649/read_3.html";
    var gotobook = "/147649.html";
    function gopage() {
        var event = event ? event : window.event;
        if (event.keyCode == 37) location = prevpage;
        if (event.keyCode == 39) location = nextpage;
        if (event.keyCode == 13) location = gotobook;
    }
    window.onerror = function () {
        return true;
    };
</script>
<script type="text/javascript">
    (function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/ipad/i.test(ua) || /iphone/i.test(ua) || /windows mobile/i.test(ua) || /android/i.test(ua)) {
            var u = "/novel/147649/read_2.html?url=/novel/147649/read_2.html";
            setTimeout(function () {
                window.location.href = "http://m.booksky.cc" + u;
            }, 300)
        }
    })();
</script>
</body>
</html>
        `)
        resolve(htmlObj);
        return null;
        fetch(url, mergeConfig).then((response:any) => response.text()).then(data => {
            // Alert.alert(`请求成功：${url}`)
            // console.log('n----------', data)
            const htmlObj = cheerio.load(data);
//             try {
// fsdfsdf
//             } catch(e) {
//                 reject(e);
//             }
            resolve(htmlObj);
        }).catch((err) => {
            reject(err);
            // Alert.alert(`请求地址：${url}`,`请求失败：${JSON.stringify(err)};`)
        });
    });
};