(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b026a48"],{"1c4c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["step-item",t.link?"linkable":null],on:{click:t.go}},[a("span",{style:t.titleStyle},[t._v(t._s(t.title))]),t.icon?a("a-icon",{style:t.iconStyle,attrs:{type:t.icon}}):t._e(),t._t("default")],2)},s=[],r=(a("9911"),{name:"AStepItemGroup",props:{align:{type:String,default:"center",validator:function(t){return-1!=["left","center","right"].indexOf(t)}}},render:function(t){return t("div",{attrs:{style:"text-align: ".concat(this.align,"; margin-top: 8px")}},[t("div",{attrs:{style:"text-align: left; display: inline-block;"}},[this.$slots.default])])}}),l={name:"AStepItem",Group:r,props:["title","icon","link","titleStyle","iconStyle"],methods:{go:function(){var t=this.link;t&&this.$router.push(t)}}},n=l,o=(a("95eb"),a("2877")),m=Object(o["a"])(n,i,s,!1,null,"2267d9fc",null);e["a"]=m.exports},"369c":function(t,e,a){},4090:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=this,a=e.$createElement,i=e._self._c||a;return i("page-layout",{attrs:{title:"单号：234231029431",logo:"https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"}},[i("detail-list",{attrs:{slot:"headerContent",size:"small",col:2},slot:"headerContent"},[i("detail-list-item",{attrs:{term:"创建人"}},[e._v("曲丽丽")]),i("detail-list-item",{attrs:{term:"订购产品"}},[e._v("XX服务")]),i("detail-list-item",{attrs:{term:"创建时间"}},[e._v("2018-08-07")]),i("detail-list-item",{attrs:{term:"关联单据"}},[i("a",[e._v("12421")])]),i("detail-list-item",{attrs:{term:"生效日期"}},[e._v("2018-08-07 ~ 2018-12-11")]),i("detail-list-item",{attrs:{term:"备注"}},[e._v("请于两个工作日内确认")])],1),i("template",{slot:"extra"},[i("head-info",{attrs:{title:"状态",content:"待审批"}}),i("head-info",{attrs:{title:"订单金额",content:"¥ 568.08"}})],1),i("template",{slot:"action"},[i("a-button-group",{staticStyle:{"margin-right":"8px"}},[i("a-button",[e._v("操作")]),i("a-button",[e._v("操作")]),i("a-button",[i("a-icon",{attrs:{type:"ellipsis"}})],1)],1),i("a-button",{attrs:{type:"primary"}},[e._v("主操作")])],1),i("a-card",{attrs:{bordered:!1,title:"流程进度"}},[i("a-steps",{attrs:{current:1,"progress-dot":"",direction:e.isMobile?"vertical":"horizontal"}},[i("a-step",{attrs:{title:"创建项目"}},[i("a-step-item-group",{attrs:{slot:"description",align:e.isMobile?"left":"center"},slot:"description"},[i("a-step-item",{attrs:{link:"/dashboard/workplace",title:"曲丽丽",icon:"dingding-o"}}),i("a-step-item",{attrs:{title:"2016-12-12 12:32"}})],1)],1),i("a-step",{attrs:{title:"部门初审"}},[i("a-step-item-group",{attrs:{slot:"description",align:e.isMobile?"left":"center"},slot:"description"},[i("a-step-item",{attrs:{link:"/form/step",title:"周毛毛",icon:"dingding-o"}}),i("a-step-item",{attrs:{link:"/result/success",title:"催一下",icon:"bell"}})],1)],1),i("a-step",{attrs:{title:"财务复核"}}),i("a-step",{attrs:{title:"完成"}})],1)],1),i("a-card",{staticStyle:{"margin-top":"24px"},attrs:{bordered:!1,title:"用户信息"}},[i("detail-list",[i("detail-list-item",{attrs:{term:"用户姓名"}},[e._v("付晓晓")]),i("detail-list-item",{attrs:{term:"会员卡号"}},[e._v("32943898021309809423")]),i("detail-list-item",{attrs:{term:"身份证"}},[e._v("3321944288191034921")]),i("detail-list-item",{attrs:{term:"联系方式"}},[e._v("18112345678")]),i("detail-list-item",{attrs:{term:"联系地址"}},[e._v("浙江省杭州市西湖区黄姑山路工专路交叉路口")])],1),i("detail-list",{attrs:{title:"信息组"}},[i("detail-list-item",{attrs:{term:"某某数据"}},[e._v("725")]),i("detail-list-item",{attrs:{term:"该数据更新时间"}},[e._v("2018-08-08")]),i("detail-list-item"),i("detail-list-item",{attrs:{term:"某某数据"}},[e._v("725")]),i("detail-list-item",{attrs:{term:"该数据更新时间"}},[e._v("2018-08-08")]),i("detail-list-item")],1),i("a-card",{attrs:{type:"inner",title:"多层信息组"}},[i("detail-list",{attrs:{title:"组名称",size:"small"}},[i("detail-list-item",{attrs:{term:"负责人"}},[e._v("林东东")]),i("detail-list-item",{attrs:{term:"角色码"}},[e._v("1234567")]),i("detail-list-item",{attrs:{term:"所属部门"}},[e._v("XX公司-YY部")]),i("detail-list-item",{attrs:{term:"过期时间"}},[e._v("2018-08-08")]),i("detail-list-item",{attrs:{term:"描述"}},[e._v("这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...")])],1),i("a-divider",{staticStyle:{margin:"16px 0"}}),i("detail-list",{attrs:{title:"组名称",size:"small",col:1}},[i("detail-list-item",{attrs:{term:"学名"}},[e._v("林东东")]),i("detail-list-item",{attrs:{term:"角色码"}},[e._v("1234567")]),i("detail-list-item",{attrs:{term:"所属部门"}},[e._v("XX公司-YY部")]),i("detail-list-item",{attrs:{term:"过期时间"}},[e._v("2018-08-08")]),i("detail-list-item",{attrs:{term:"描述"}},[e._v("这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...")])],1),i("a-divider",{staticStyle:{margin:"16px 0"}}),i("detail-list",{attrs:{title:"组名称",size:"small",col:2}},[i("detail-list-item",{attrs:{term:"学名"}},[e._v("林东东")]),i("detail-list-item",{attrs:{term:"角色码"}},[e._v("1234567")]),i("detail-list-item",{attrs:{term:"所属部门"}},[e._v("XX公司-YY部")]),i("detail-list-item",{attrs:{term:"过期时间"}},[e._v("2018-08-08")]),i("detail-list-item",{attrs:{term:"描述"}},[e._v("这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...")])],1)],1)],1),i("a-card",{staticStyle:{"margin-top":"24px"},attrs:{bordered:!1,title:"用户近半年来电记录"}},[i("a-list")],1),i("a-card",{staticStyle:{"margin-top":"24px"},attrs:{bordered:!1,tabList:e.tabList,activeTabKey:e.activeTabKey},on:{tabChange:function(e){t.activeTabKey=e}}},["1"===e.activeTabKey?i("a-table",{attrs:{columns:e.operationColumns,dataSource:e.operation1,pagination:!1}}):e._e(),"2"===e.activeTabKey?i("a-table",{attrs:{columns:e.operationColumns,dataSource:e.operation2,pagination:!1}}):e._e(),"3"===e.activeTabKey?i("a-table",{attrs:{columns:e.operationColumns,dataSource:e.operation3,pagination:!1}}):e._e()],1)],2)},s=[],r=a("5530"),l=a("45eb"),n=a("c340"),o=a("1c4c"),m=[{key:"op1",type:"订购关系生效",name:"曲丽丽",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"-"},{key:"op2",type:"财务复审",name:"付小小",status:"reject",updatedAt:"2017-10-03  19:23:12",memo:"不通过原因"},{key:"op3",type:"部门初审",name:"周毛毛",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"-"},{key:"op4",type:"提交订单",name:"林东东",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"很棒"},{key:"op5",type:"创建订单",name:"汗牙牙",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"-"}],d=[{key:"op2",type:"财务复审",name:"付小小",status:"reject",updatedAt:"2017-10-03  19:23:12",memo:"不通过原因"},{key:"op3",type:"部门初审",name:"周毛毛",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"-"},{key:"op4",type:"提交订单",name:"林东东",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"很棒"}],c=[{key:"op2",type:"财务复审",name:"付小小",status:"reject",updatedAt:"2017-10-03  19:23:12",memo:"不通过原因"},{key:"op3",type:"部门初审",name:"周毛毛",status:"agree",updatedAt:"2017-10-03  19:23:12",memo:"-"}],p=[{title:"操作类型",dataIndex:"type",key:"type"},{title:"操作人",dataIndex:"name",key:"name"},{title:"执行结果",dataIndex:"status",key:"status"},{title:"操作时间",dataIndex:"updatedAt",key:"updatedAt"},{title:"备注",dataIndex:"memo",key:"memo"}],u=a("5880"),v=a("779e"),y=n["a"].Item,_=o["a"].Group,b=[{key:"1",tab:"操作日志一"},{key:"2",tab:"操作日志二"},{key:"3",tab:"操作日志三"}],f={name:"AdvancedDetail",components:{HeadInfo:v["a"],AStepItemGroup:_,AStepItem:o["a"],DetailListItem:y,DetailList:n["a"],PageLayout:l["a"]},data:function(){return{tabList:b,operationColumns:p,operation1:m,operation2:d,operation3:c,activeTabKey:"2"}},computed:Object(r["a"])({},Object(u["mapState"])("setting",["isMobile"])),methods:{onTabChange:function(t){}}},g=f,h=a("2877"),k=Object(h["a"])(g,i,s,!1,null,"03facd50",null);e["default"]=k.exports},"47fb":function(t,e,a){},6531:function(t,e,a){"use strict";a("369c")},6627:function(t,e,a){"use strict";a("cee4")},"779e":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"head-info"},[a("span",[t._v(t._s(t.title))]),a("p",[t._v(t._s(t.content))])])},s=[],r={name:"HeadInfo",props:["title","content","bordered"]},l=r,n=(a("6627"),a("2877")),o=Object(n["a"])(l,i,s,!1,null,"46a43dda",null);e["a"]=o.exports},"95eb":function(t,e,a){"use strict";a("47fb")},c340:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["detail-list","small"===t.size?"small":"large","vertical"===t.layout?"vertical":"horizontal"]},[t.title?a("div",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),a("a-row",[t._t("default")],2)],1)},s=[],r=(a("a9e3"),a("da05")),l={name:"DetailListItem",props:{term:{type:String,required:!1}},inject:{col:{type:Number}},methods:{renderTerm:function(t,e){return e?t("div",{attrs:{class:"term"}},[e]):null},renderContent:function(t,e){return t("div",{attrs:{class:"content"}},[e])}},render:function(t){var e=this.renderTerm(t,this.$props.term),a=this.renderContent(t,this.$slots.default);return t(r["b"],{props:n[this.col]},[e,a])}},n={1:{xs:24},2:{xs:24,sm:12},3:{xs:24,sm:12,md:8},4:{xs:24,sm:12,md:6}},o={name:"DetailList",Item:l,props:{title:{type:String,required:!1},col:{type:Number,required:!1,default:3},size:{type:String,required:!1,default:"large"},layout:{type:String,required:!1,default:"horizontal"}},provide:function(){return{col:this.col>4?4:this.col}}},m=o,d=(a("6531"),a("2877")),c=Object(d["a"])(m,i,s,!1,null,null,null);e["a"]=c.exports},cee4:function(t,e,a){}}]);