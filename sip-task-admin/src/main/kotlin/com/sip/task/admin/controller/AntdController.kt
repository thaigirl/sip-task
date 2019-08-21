package com.sip.task.admin.controller

import com.alibaba.fastjson.JSON
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AntdController {
    @GetMapping("/notices")
    fun notices(): Any {
        return JSON.parseArray("[{\"id\":\"000000001\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png\",\"title\":\"你收到了 14 份新周报\",\"datetime\":\"2017-08-09\",\"type\":\"notification\"},{\"id\":\"000000002\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png\",\"title\":\"你推荐的 曲妮妮 已通过第三轮面试\",\"datetime\":\"2017-08-08\",\"type\":\"notification\"},{\"id\":\"000000003\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png\",\"title\":\"这种模板可以区分多种通知类型\",\"datetime\":\"2017-08-07\",\"read\":true,\"type\":\"notification\"},{\"id\":\"000000004\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png\",\"title\":\"左侧图标用于区分不同的类型\",\"datetime\":\"2017-08-07\",\"type\":\"notification\"},{\"id\":\"000000005\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png\",\"title\":\"内容不要超过两行字，超出时自动截断\",\"datetime\":\"2017-08-07\",\"type\":\"notification\"},{\"id\":\"000000006\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg\",\"title\":\"曲丽丽 评论了你\",\"description\":\"描述信息描述信息描述信息\",\"datetime\":\"2017-08-07\",\"type\":\"message\",\"clickClose\":true},{\"id\":\"000000007\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg\",\"title\":\"朱偏右 回复了你\",\"description\":\"这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像\",\"datetime\":\"2017-08-07\",\"type\":\"message\",\"clickClose\":true},{\"id\":\"000000008\",\"avatar\":\"https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg\",\"title\":\"标题\",\"description\":\"这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像\",\"datetime\":\"2017-08-07\",\"type\":\"message\",\"clickClose\":true},{\"id\":\"000000009\",\"title\":\"任务名称\",\"description\":\"任务需要在 2017-01-12 20:00 前启动\",\"extra\":\"未开始\",\"status\":\"todo\",\"type\":\"event\"},{\"id\":\"000000010\",\"title\":\"第三方紧急代码变更\",\"description\":\"冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务\",\"extra\":\"马上到期\",\"status\":\"urgent\",\"type\":\"event\"},{\"id\":\"000000011\",\"title\":\"信息安全考试\",\"description\":\"指派竹尔于 2017-01-09 前完成更新并发布\",\"extra\":\"已耗时 8 天\",\"status\":\"doing\",\"type\":\"event\"},{\"id\":\"000000012\",\"title\":\"ABCD 版本发布\",\"description\":\"冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务\",\"extra\":\"进行中\",\"status\":\"processing\",\"type\":\"event\"}]")
    }

    @GetMapping("/currentUser")
    fun currentUser(): Any {
        return JSON.parseObject("{\"name\":\"Serati Ma\",\"avatar\":\"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png\",\"userid\":\"00000001\",\"email\":\"antdesign@alipay.com\",\"signature\":\"海纳百川，有容乃大\",\"title\":\"交互专家\",\"group\":\"蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED\",\"tags\":[{\"key\":\"0\",\"label\":\"很有想法的\"},{\"key\":\"1\",\"label\":\"专注设计\"},{\"key\":\"2\",\"label\":\"辣~\"},{\"key\":\"3\",\"label\":\"大长腿\"},{\"key\":\"4\",\"label\":\"川妹子\"},{\"key\":\"5\",\"label\":\"海纳百川\"}],\"notice\":[{\"id\":\"xxx1\",\"title\":\"Alipay\",\"logo\":\"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png\",\"description\":\"那是一种内在的东西，他们到达不了，也无法触及的\",\"updatedAt\":\"2019-08-21T02:55:36.191Z\",\"member\":\"科学搬砖组\",\"href\":\"\",\"memberLink\":\"\"},{\"id\":\"xxx2\",\"title\":\"Angular\",\"logo\":\"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png\",\"description\":\"希望是一个好东西，也许是最好的，好东西是不会消亡的\",\"updatedAt\":\"2017-07-24T00:00:00.000Z\",\"member\":\"全组都是吴彦祖\",\"href\":\"\",\"memberLink\":\"\"},{\"id\":\"xxx3\",\"title\":\"Ant Design\",\"logo\":\"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png\",\"description\":\"城镇中有那么多的酒馆，她却偏偏走进了我的酒馆\",\"updatedAt\":\"2019-08-21T02:55:36.191Z\",\"member\":\"中二少女团\",\"href\":\"\",\"memberLink\":\"\"},{\"id\":\"xxx4\",\"title\":\"Ant Design Pro\",\"logo\":\"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png\",\"description\":\"那时候我只会想自己想要什么，从不想自己拥有什么\",\"updatedAt\":\"2017-07-23T00:00:00.000Z\",\"member\":\"程序员日常\",\"href\":\"\",\"memberLink\":\"\"},{\"id\":\"xxx5\",\"title\":\"Bootstrap\",\"logo\":\"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png\",\"description\":\"凛冬将至\",\"updatedAt\":\"2017-07-23T00:00:00.000Z\",\"member\":\"高逼格设计天团\",\"href\":\"\",\"memberLink\":\"\"},{\"id\":\"xxx6\",\"title\":\"React\",\"logo\":\"https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png\",\"description\":\"生命就像一盒巧克力，结果往往出人意料\",\"updatedAt\":\"2017-07-23T00:00:00.000Z\",\"member\":\"骗你来学计算机\",\"href\":\"\",\"memberLink\":\"\"}],\"notifyCount\":12,\"unreadCount\":11,\"country\":\"China\",\"geographic\":{\"province\":{\"label\":\"浙江省\",\"key\":\"330000\"},\"city\":{\"label\":\"杭州市\",\"key\":\"330100\"}},\"address\":\"西湖区工专路 77 号\",\"phone\":\"0752-268888888\"}")
    }
    @GetMapping("/fake_chart_data")
    fun fakeChartData(): Any {
        return JSON.parseObject("{\"visitData\":[{\"x\":\"2019-08-21\",\"y\":7},{\"x\":\"2019-08-22\",\"y\":5},{\"x\":\"2019-08-23\",\"y\":4},{\"x\":\"2019-08-24\",\"y\":2},{\"x\":\"2019-08-25\",\"y\":4},{\"x\":\"2019-08-26\",\"y\":7},{\"x\":\"2019-08-27\",\"y\":5},{\"x\":\"2019-08-28\",\"y\":6},{\"x\":\"2019-08-29\",\"y\":5},{\"x\":\"2019-08-30\",\"y\":9},{\"x\":\"2019-08-31\",\"y\":6},{\"x\":\"2019-09-01\",\"y\":3},{\"x\":\"2019-09-02\",\"y\":1},{\"x\":\"2019-09-03\",\"y\":5},{\"x\":\"2019-09-04\",\"y\":3},{\"x\":\"2019-09-05\",\"y\":6},{\"x\":\"2019-09-06\",\"y\":5}],\"visitData2\":[{\"x\":\"2019-08-21\",\"y\":1},{\"x\":\"2019-08-22\",\"y\":6},{\"x\":\"2019-08-23\",\"y\":4},{\"x\":\"2019-08-24\",\"y\":8},{\"x\":\"2019-08-25\",\"y\":3},{\"x\":\"2019-08-26\",\"y\":7},{\"x\":\"2019-08-27\",\"y\":2}],\"salesData\":[{\"x\":\"1月\",\"y\":923},{\"x\":\"2月\",\"y\":527},{\"x\":\"3月\",\"y\":464},{\"x\":\"4月\",\"y\":817},{\"x\":\"5月\",\"y\":305},{\"x\":\"6月\",\"y\":567},{\"x\":\"7月\",\"y\":1141},{\"x\":\"8月\",\"y\":1023},{\"x\":\"9月\",\"y\":469},{\"x\":\"10月\",\"y\":269},{\"x\":\"11月\",\"y\":218},{\"x\":\"12月\",\"y\":945}],\"searchData\":[{\"index\":1,\"keyword\":\"搜索关键词-0\",\"count\":63,\"range\":49,\"status\":1},{\"index\":2,\"keyword\":\"搜索关键词-1\",\"count\":549,\"range\":48,\"status\":1},{\"index\":3,\"keyword\":\"搜索关键词-2\",\"count\":917,\"range\":72,\"status\":1},{\"index\":4,\"keyword\":\"搜索关键词-3\",\"count\":354,\"range\":24,\"status\":1},{\"index\":5,\"keyword\":\"搜索关键词-4\",\"count\":894,\"range\":61,\"status\":0},{\"index\":6,\"keyword\":\"搜索关键词-5\",\"count\":430,\"range\":23,\"status\":1},{\"index\":7,\"keyword\":\"搜索关键词-6\",\"count\":373,\"range\":94,\"status\":1},{\"index\":8,\"keyword\":\"搜索关键词-7\",\"count\":397,\"range\":39,\"status\":1},{\"index\":9,\"keyword\":\"搜索关键词-8\",\"count\":592,\"range\":66,\"status\":0},{\"index\":10,\"keyword\":\"搜索关键词-9\",\"count\":167,\"range\":45,\"status\":1},{\"index\":11,\"keyword\":\"搜索关键词-10\",\"count\":974,\"range\":80,\"status\":0},{\"index\":12,\"keyword\":\"搜索关键词-11\",\"count\":317,\"range\":81,\"status\":0},{\"index\":13,\"keyword\":\"搜索关键词-12\",\"count\":31,\"range\":74,\"status\":1},{\"index\":14,\"keyword\":\"搜索关键词-13\",\"count\":811,\"range\":30,\"status\":0},{\"index\":15,\"keyword\":\"搜索关键词-14\",\"count\":692,\"range\":92,\"status\":1},{\"index\":16,\"keyword\":\"搜索关键词-15\",\"count\":865,\"range\":1,\"status\":1},{\"index\":17,\"keyword\":\"搜索关键词-16\",\"count\":97,\"range\":7,\"status\":1},{\"index\":18,\"keyword\":\"搜索关键词-17\",\"count\":169,\"range\":21,\"status\":1},{\"index\":19,\"keyword\":\"搜索关键词-18\",\"count\":66,\"range\":55,\"status\":0},{\"index\":20,\"keyword\":\"搜索关键词-19\",\"count\":471,\"range\":76,\"status\":1},{\"index\":21,\"keyword\":\"搜索关键词-20\",\"count\":880,\"range\":87,\"status\":1},{\"index\":22,\"keyword\":\"搜索关键词-21\",\"count\":643,\"range\":34,\"status\":0},{\"index\":23,\"keyword\":\"搜索关键词-22\",\"count\":757,\"range\":76,\"status\":0},{\"index\":24,\"keyword\":\"搜索关键词-23\",\"count\":240,\"range\":13,\"status\":1},{\"index\":25,\"keyword\":\"搜索关键词-24\",\"count\":950,\"range\":53,\"status\":0},{\"index\":26,\"keyword\":\"搜索关键词-25\",\"count\":898,\"range\":61,\"status\":0},{\"index\":27,\"keyword\":\"搜索关键词-26\",\"count\":230,\"range\":4,\"status\":0},{\"index\":28,\"keyword\":\"搜索关键词-27\",\"count\":654,\"range\":86,\"status\":1},{\"index\":29,\"keyword\":\"搜索关键词-28\",\"count\":642,\"range\":69,\"status\":1},{\"index\":30,\"keyword\":\"搜索关键词-29\",\"count\":355,\"range\":44,\"status\":1},{\"index\":31,\"keyword\":\"搜索关键词-30\",\"count\":781,\"range\":79,\"status\":1},{\"index\":32,\"keyword\":\"搜索关键词-31\",\"count\":485,\"range\":71,\"status\":1},{\"index\":33,\"keyword\":\"搜索关键词-32\",\"count\":48,\"range\":95,\"status\":1},{\"index\":34,\"keyword\":\"搜索关键词-33\",\"count\":584,\"range\":60,\"status\":0},{\"index\":35,\"keyword\":\"搜索关键词-34\",\"count\":984,\"range\":86,\"status\":0},{\"index\":36,\"keyword\":\"搜索关键词-35\",\"count\":952,\"range\":27,\"status\":1},{\"index\":37,\"keyword\":\"搜索关键词-36\",\"count\":256,\"range\":59,\"status\":1},{\"index\":38,\"keyword\":\"搜索关键词-37\",\"count\":794,\"range\":27,\"status\":1},{\"index\":39,\"keyword\":\"搜索关键词-38\",\"count\":495,\"range\":13,\"status\":1},{\"index\":40,\"keyword\":\"搜索关键词-39\",\"count\":965,\"range\":59,\"status\":0},{\"index\":41,\"keyword\":\"搜索关键词-40\",\"count\":570,\"range\":10,\"status\":0},{\"index\":42,\"keyword\":\"搜索关键词-41\",\"count\":85,\"range\":16,\"status\":0},{\"index\":43,\"keyword\":\"搜索关键词-42\",\"count\":567,\"range\":20,\"status\":1},{\"index\":44,\"keyword\":\"搜索关键词-43\",\"count\":493,\"range\":18,\"status\":0},{\"index\":45,\"keyword\":\"搜索关键词-44\",\"count\":324,\"range\":67,\"status\":1},{\"index\":46,\"keyword\":\"搜索关键词-45\",\"count\":233,\"range\":7,\"status\":1},{\"index\":47,\"keyword\":\"搜索关键词-46\",\"count\":717,\"range\":61,\"status\":0},{\"index\":48,\"keyword\":\"搜索关键词-47\",\"count\":787,\"range\":49,\"status\":0},{\"index\":49,\"keyword\":\"搜索关键词-48\",\"count\":747,\"range\":51,\"status\":1},{\"index\":50,\"keyword\":\"搜索关键词-49\",\"count\":300,\"range\":1,\"status\":1}],\"offlineData\":[{\"name\":\"Stores 0\",\"cvr\":0.9},{\"name\":\"Stores 1\",\"cvr\":0.4},{\"name\":\"Stores 2\",\"cvr\":0.3},{\"name\":\"Stores 3\",\"cvr\":0.8},{\"name\":\"Stores 4\",\"cvr\":0.8},{\"name\":\"Stores 5\",\"cvr\":0.5},{\"name\":\"Stores 6\",\"cvr\":0.4},{\"name\":\"Stores 7\",\"cvr\":0.7},{\"name\":\"Stores 8\",\"cvr\":0.8},{\"name\":\"Stores 9\",\"cvr\":0.4}],\"offlineChartData\":[{\"x\":1566358729654,\"y1\":74,\"y2\":38},{\"x\":1566360529654,\"y1\":95,\"y2\":51},{\"x\":1566362329654,\"y1\":62,\"y2\":91},{\"x\":1566364129654,\"y1\":104,\"y2\":86},{\"x\":1566365929654,\"y1\":46,\"y2\":70},{\"x\":1566367729654,\"y1\":100,\"y2\":94},{\"x\":1566369529654,\"y1\":82,\"y2\":35},{\"x\":1566371329654,\"y1\":16,\"y2\":96},{\"x\":1566373129654,\"y1\":98,\"y2\":79},{\"x\":1566374929654,\"y1\":79,\"y2\":85},{\"x\":1566376729654,\"y1\":17,\"y2\":35},{\"x\":1566378529654,\"y1\":79,\"y2\":68},{\"x\":1566380329654,\"y1\":29,\"y2\":53},{\"x\":1566382129654,\"y1\":89,\"y2\":88},{\"x\":1566383929654,\"y1\":58,\"y2\":61},{\"x\":1566385729654,\"y1\":13,\"y2\":66},{\"x\":1566387529654,\"y1\":25,\"y2\":76},{\"x\":1566389329654,\"y1\":90,\"y2\":106},{\"x\":1566391129654,\"y1\":50,\"y2\":39},{\"x\":1566392929654,\"y1\":21,\"y2\":19}],\"salesTypeData\":[{\"x\":\"家用电器\",\"y\":4544},{\"x\":\"食用酒水\",\"y\":3321},{\"x\":\"个护健康\",\"y\":3113},{\"x\":\"服饰箱包\",\"y\":2341},{\"x\":\"母婴产品\",\"y\":1231},{\"x\":\"其他\",\"y\":1231}],\"salesTypeDataOnline\":[{\"x\":\"家用电器\",\"y\":244},{\"x\":\"食用酒水\",\"y\":321},{\"x\":\"个护健康\",\"y\":311},{\"x\":\"服饰箱包\",\"y\":41},{\"x\":\"母婴产品\",\"y\":121},{\"x\":\"其他\",\"y\":111}],\"salesTypeDataOffline\":[{\"x\":\"家用电器\",\"y\":99},{\"x\":\"食用酒水\",\"y\":188},{\"x\":\"个护健康\",\"y\":344},{\"x\":\"服饰箱包\",\"y\":255},{\"x\":\"其他\",\"y\":65}],\"radarData\":[{\"name\":\"个人\",\"label\":\"引用\",\"value\":10},{\"name\":\"个人\",\"label\":\"口碑\",\"value\":8},{\"name\":\"个人\",\"label\":\"产量\",\"value\":4},{\"name\":\"个人\",\"label\":\"贡献\",\"value\":5},{\"name\":\"个人\",\"label\":\"热度\",\"value\":7},{\"name\":\"团队\",\"label\":\"引用\",\"value\":3},{\"name\":\"团队\",\"label\":\"口碑\",\"value\":9},{\"name\":\"团队\",\"label\":\"产量\",\"value\":6},{\"name\":\"团队\",\"label\":\"贡献\",\"value\":3},{\"name\":\"团队\",\"label\":\"热度\",\"value\":1},{\"name\":\"部门\",\"label\":\"引用\",\"value\":4},{\"name\":\"部门\",\"label\":\"口碑\",\"value\":1},{\"name\":\"部门\",\"label\":\"产量\",\"value\":6},{\"name\":\"部门\",\"label\":\"贡献\",\"value\":5},{\"name\":\"部门\",\"label\":\"热度\",\"value\":7}]}")
    }
}