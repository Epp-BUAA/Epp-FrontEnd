(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b9cdf6e"],{1190:function(t,e,a){"use strict";a("492c")},4668:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-card",{attrs:{bordered:!1}},[a("a-steps",{staticClass:"steps",attrs:{current:t.current}},[a("a-step",{attrs:{title:t.$t("input")}}),a("a-step",{attrs:{title:t.$t("confirm")}}),a("a-step",{attrs:{title:t.$t("complete")}})],1),a("div",{staticClass:"content"},[0===t.current?a("step1",{on:{nextStep:t.nextStep}}):t._e(),1===t.current?a("step2",{on:{nextStep:t.nextStep,prevStep:t.prevStep}}):t._e(),2===t.current?a("step3",{on:{prevStep:t.prevStep,finish:t.finish}}):t._e()],1)],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-form",{staticStyle:{"max-width":"500px",margin:"40px auto 0"}},[a("a-form-item",{attrs:{label:t.$t("payment"),labelCol:{span:7},wrapperCol:{span:17}}},[a("a-select",{attrs:{value:"1",placeholder:"ant-design@alipay.com"}},[a("a-select-option",{attrs:{value:"1"}},[t._v("ant-design@alipay.com")])],1)],1),a("a-form-item",{attrs:{label:t.$t("collection"),labelCol:{span:7},wrapperCol:{span:17}}},[a("a-input-group",{staticStyle:{display:"inline-block","vertical-align":"middle"},attrs:{compact:!0}},[a("a-select",{staticStyle:{width:"100px"},attrs:{defaultValue:"alipay"}},[a("a-select-option",{attrs:{value:"alipay"}},[t._v(t._s(t.$t("alipay")))]),a("a-select-option",{attrs:{value:"wexinpay"}},[t._v(t._s(t.$t("wechat")))])],1),a("a-input",{style:{width:"calc(100% - 100px)"},attrs:{value:"test@example.com"}})],1)],1),a("a-form-item",{attrs:{label:t.$t("collectionName"),labelCol:{span:7},wrapperCol:{span:17}}},[a("a-input",{attrs:{value:"Alex"}})],1),a("a-form-item",{attrs:{label:t.$t("transferAmount"),labelCol:{span:7},wrapperCol:{span:17}}},[a("a-input",{attrs:{prefix:"￥",value:"5000"}})],1),a("a-form-item",{attrs:{wrapperCol:{span:17,offset:7}}},[a("a-button",{attrs:{type:"primary"},on:{click:t.nextStep}},[t._v(t._s(t.$t("nextStep")))])],1)],1)],1)},l=[],r={name:"Step1",i18n:a("fafe"),methods:{nextStep:function(){this.$emit("nextStep")}}},c=r,o=a("2877"),p=Object(o["a"])(c,i,l,!1,null,"cd29a5e4",null),u=p.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-form",{staticStyle:{"max-width":"500px",margin:"40px auto 0"}},[a("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{closable:!0,message:t.$t("note")}}),a("a-form-item",{staticClass:"stepFormText",attrs:{label:t.$t("payment"),labelCol:{span:7},wrapperCol:{span:17}}},[t._v(" ant-design@alipay.com ")]),a("a-form-item",{staticClass:"stepFormText",attrs:{label:t.$t("collection"),labelCol:{span:7},wrapperCol:{span:17}}},[t._v(" test@example.com ")]),a("a-form-item",{staticClass:"stepFormText",attrs:{label:t.$t("collectionName"),labelCol:{span:7},wrapperCol:{span:17}}},[t._v(" Alex ")]),a("a-form-item",{staticClass:"stepFormText",attrs:{label:t.$t("transferAmount"),labelCol:{span:7},wrapperCol:{span:17}}},[t._v(" ￥ 5,000.00 ")]),a("a-form-item",{attrs:{wrapperCol:{span:17,offset:7}}},[a("a-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.nextStep}},[t._v(t._s(t.$t("submit")))]),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.prevStep}},[t._v(t._s(t.$t("preStep")))])],1)],1)],1)},f=[],d={name:"Step2",i18n:a("fafe"),data:function(){return{loading:!1}},methods:{nextStep:function(){var t=this;t.loading=!0,setTimeout((function(){t.$emit("nextStep")}),1500)},prevStep:function(){this.$emit("prevStep")}}},v=d,b=(a("4ea0"),Object(o["a"])(v,m,f,!1,null,"2e94d02c",null)),x=b.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"max-width":"500px",margin:"40px auto 0","text-align":"center"}},[a("result",{attrs:{title:t.$t("success"),"is-success":!0}}),a("a-button",{attrs:{type:"primary"},on:{click:t.doOnceAgin}},[t._v(t._s(t.$t("doAgain")))]),a("a-button",{staticStyle:{"margin-left":"8px"}},[t._v(t._s(t.$t("bill")))])],1)},h=[],_=a("84a9"),y={name:"Step3",i18n:a("fafe"),components:{Result:_["a"]},methods:{doOnceAgin:function(){this.$emit("finish")}}},C=y,g=Object(o["a"])(C,S,h,!1,null,"029fdbb8",null),$=g.exports,w={name:"StepForm",i18n:a("fafe"),components:{Step1:u,Step2:x,Step3:$},data:function(){return{current:0}},computed:{desc:function(){return this.$t("pageDesc")}},methods:{nextStep:function(){this.current<2&&(this.current+=1)},prevStep:function(){this.current>0&&(this.current-=1)},finish:function(){this.current=0}}},A=w,k=(a("e101"),Object(o["a"])(A,n,s,!1,null,"6bf2a94e",null)),N=k.exports;e["default"]=N},"492c":function(t,e,a){},"4ea0":function(t,e,a){"use strict";a("59a7")},"556a":function(t,e,a){},"59a7":function(t,e,a){},"84a9":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"result"},[a("div",[a("a-icon",{class:[t.isSuccess?"success":"error","icon"],attrs:{type:t.isSuccess?"check-circle":"close-circle"}})],1),t.title?a("div",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),t.description?a("div",{staticClass:"desc"},[t._v(t._s(t.description))]):t._e(),a("div",{staticClass:"content"},[t._t("default")],2),a("div",{staticClass:"action"},[t._t("action")],2)])},s=[],i={name:"Result",props:["isSuccess","title","description"]},l=i,r=(a("1190"),a("2877")),c=Object(r["a"])(l,n,s,!1,null,"78c73a4c",null);e["a"]=c.exports},e101:function(t,e,a){"use strict";a("556a")},fafe:function(t,e){t.exports={messages:{CN:{pageDesc:"将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。",input:"请填写转账信息",confirm:"确认转账信息",complete:"完成",payment:"付款账户",collection:"收款账户",alipay:"支付宝",wechat:"微信",collectionName:"收款人姓名",transferAmount:"转账金额",nextStep:"下一步",preStep:"上一步",submit:"提交",note:"确认转账后，资金将直接打入对方账户，无法退回。",success:"支付完成",doAgain:"再转一笔",bill:"查看账单"},HK:{pageDesc:"將一個冗長或用戶不熟悉的表單任務分成多個步驟，指導用戶完成。",input:"請填寫轉賬信息",confirm:"確認轉賬信息",complete:"完成",payment:"付款賬戶",collection:"收款賬戶",alipay:"支付寶",wechat:"微信",collectionName:"收款人姓名",transferAmount:"裝張金額",nextStep:"下一步",preStep:"上一步",submit:"提交",note:"確認轉賬後，現金將直接打入對方賬戶，無法退回。",success:"支付完成",doAgain:"再轉一筆",bill:"查看賬單"},US:{pageDesc:"Divide a long or unfamiliar form task into several steps to guide the user to complete it.",input:"Fill transfer information",confirm:"Confirm transfer information",complete:"Complete",payment:"Payment account",collection:"Collection account",alipay:"Alipay",wechat:"Wechat",collectionName:"Name of payee",transferAmount:"Transfer amount",nextStep:"Next",preStep:"Back",submit:"Submit",note:"After confirming the transfer, the funds will be directly transferred into the other party's account and cannot be returned.",success:"Payment successful",doAgain:"Do Again",bill:"Check the bill"}}}}}]);