(function(t){function i(i){for(var e,s,r=i[0],l=i[1],c=i[2],u=0,g=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&g.push(o[s][0]),o[s]=0;for(e in l)Object.prototype.hasOwnProperty.call(l,e)&&(t[e]=l[e]);d&&d(i);while(g.length)g.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,i=0;i<n.length;i++){for(var a=n[i],e=!0,r=1;r<a.length;r++){var l=a[r];0!==o[l]&&(e=!1)}e&&(n.splice(i--,1),t=s(s.s=a[0]))}return t}var e={},o={app:0},n=[];function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,i,a){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)s.d(a,e,function(i){return t[i]}.bind(null,e));return a},s.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=i,r=r.slice();for(var c=0;c<r.length;c++)i(r[c]);var d=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,i,a){t.exports=a("56d7")},"006b":function(t,i,a){},"06be":function(t,i,a){},1:function(t,i){},3226:function(t,i,a){"use strict";var e=a("006b"),o=a.n(e);o.a},"56d7":function(t,i,a){"use strict";a.r(i);var e=a("2b0e"),o=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("router-view")],1)},n=[],s={name:"App"},r=s,l=a("2877"),c=Object(l["a"])(r,o,n,!1,null,null,null),d=c.exports,u=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"loginPage"},[a("h1",{attrs:{href:"./"}},[t._v("홍덕해듀오")]),a("div",{staticClass:"IDPW",staticStyle:{"margin-top":"25%"}},[a("div",{staticClass:"ID"},[a("p",[t._v("아이디")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.id,expression:"id"}],attrs:{placeholder:"아이디를 입력해주세요"},domProps:{value:t.id},on:{input:function(i){i.target.composing||(t.id=i.target.value)}}})]),a("div",{staticClass:"PW"},[a("p",[t._v("비밀번호")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"비밀번호를 입력해주세요"},domProps:{value:t.password},on:{input:function(i){i.target.composing||(t.password=i.target.value)}}})])]),a("div",{staticClass:"buttons"},[a("div",{staticClass:"btn loginbtn"},[a("button",{staticClass:"btn btn-success",on:{click:function(i){return t.login()}}},[t._v("로그인")])]),a("div",{staticClass:"btn loginbtn"},[a("router-link",{staticClass:"btn btn-warning",attrs:{to:"/register",tag:"button"}},[t._v("회원가입")])],1)])])])},g=[],m=a("bc3a"),p=a.n(m),h={name:"loginPage",props:{title:String},data:function(){return{id:"",password:""}},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{login:async function(){let t=await p.a.post("/api/login",{id:this.id,pw:this.password});t.data.ok?(alert(t.data.msg),await this.$router.push("/mainPage")):alert(t.data.msg)}}},_=h,f=(a("3226"),Object(l["a"])(_,u,g,!1,null,null,null)),v=f.exports,w=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"registerPage"},[a("div",{staticStyle:{"grid-column-start":"1","grid-column-end":"3"}},[a("h1",{on:{click:t.goto_login}},[t._v("홍덕해듀오")]),a("h4",{staticStyle:{"margin-top":"5%"}},[t._v("회원가입")])]),a("div",{staticClass:"IDPW",staticStyle:{"grid-column-start":"1","grid-column-end":"3"}},[a("div",{staticClass:"ID"},[a("p",[t._v("아이디")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.id,expression:"id"}],attrs:{placeholder:"아이디를 입력해주세요"},domProps:{value:t.id},on:{input:function(i){i.target.composing||(t.id=i.target.value)}}})]),a("div",{staticClass:"PW"},[a("p",[t._v("비밀번호")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"비밀번호를 입력해주세요"},domProps:{value:t.password},on:{input:function(i){i.target.composing||(t.password=i.target.value)}}})]),a("div",{staticClass:"PWCheck"},[a("p",[t._v("비밀번호 확인")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordCheck,expression:"passwordCheck"}],attrs:{type:"password",placeholder:"비밀번호를 입력해주세요"},domProps:{value:t.passwordCheck},on:{input:function(i){i.target.composing||(t.passwordCheck=i.target.value)}}})]),a("div",{staticClass:"sex",staticStyle:{"margin-top":"5%","grid-column-start":"1","grid-column-end":"3"}},[a("b-form-group",{attrs:{label:"자신의 성별을 골라주세요"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-1",options:t.options,name:"flavour-1"},model:{value:t.sex,callback:function(i){t.sex=i},expression:"sex"}})],1)],1)]),a("div",{staticClass:"buttons",staticStyle:{"grid-column-start":"1","grid-column-end":"3"}},[a("div",{staticClass:"btn"},[a("button",{staticClass:"btn btn-warning",on:{click:t.register}},[t._v("회원가입")])])])])},b=[],y={name:"registerPage",props:{title:String},data:function(){return{id:"",password:"",passwordCheck:"",options:[{text:"남자",value:"male"},{text:"여자",value:"female"}],sex:[]}},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{register:async function(){if(this.id&&this.password===this.passwordCheck){let t=await p.a.post("/api/register",{id:this.id,pw:this.password,sex:this.sex});alert(t.data.msg),t.data.ok&&await this.$router.push("/register2")}else this.password!==this.passwordCheck?alert("입력한 비밀번호가 서로 다릅니다"):this.id||alert("아이디를 입력해주세요")},goto_login:async function(){await this.$router.push("/login")}}},k=y,C=(a("e0f0"),Object(l["a"])(k,w,b,!1,null,null,null)),x=C.exports,P=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"registerPage2"},[a("div",{staticStyle:{"grid-column-start":"1","grid-column-end":"3","margin-top":"12%"}},[a("h1",{on:{click:t.goto_login}},[t._v("홍덕해듀오")]),a("h4",{staticStyle:{"margin-top":"5%"}},[t._v("사진 업로드")]),a("p",{staticStyle:{"margin-top":"10%"}},[t._v("자신의 사진을 업로드 해주세요!")])]),a("div",{staticStyle:{"grid-column-start":"1","grid-column-end":"3"}},[a("div",{staticClass:"file-upload-form"},[a("input",{attrs:{type:"file",accept:"image/*"},on:{change:t.previewImage}})]),t.imageData.length>0&&!1===t.loading?a("div",{staticClass:"image-preview"},[a("img",{staticClass:"preview",attrs:{src:t.imageData}})]):t._e(),!0===t.loading?a("div",{staticClass:"loader"}):t._e(),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"5%","grid-column-start":"1","grid-column-end":"3"}},[a("div",{staticClass:"btn",staticStyle:{"margin-top":"2%"}},[a("button",{staticClass:"btn btn-warning",on:{click:t.img_upload}},[t._v("사진 업로드")])])])])])},$=[],S={name:"registerPage2",props:{title:String},data:function(){return{id:"",password:"",passwordCheck:"",imageData:"",loading:!1,modal_idol:""}},created:async function(){let t=await p.a.post("/api/get_id");t.data.ok?this.id=t.data.id:(alert(t.data.msg),await this.$router.push("/login"))},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{img_upload:async function(){if(this.imageData){this.loading=!0;let t=await p.a.post("/api/upload_img",{img:this.imageData});this.loading=!1,await this.$router.push("/mainPage"),alert(t.data.msg)}else alert("이미지를 먼저 업로드해주세요")},previewImage:function(t){let i=t.target;if(i.files&&i.files[0]){let t=new FileReader;t.onload=t=>{this.imageData=t.target.result},t.readAsDataURL(i.files[0])}},insert_chatList:async function(){let t=await p.a.post("/api/insert_chatList",{id:this.id,person:this.modal_idol.split(".")[0]});t.data.ok?alert(this.modal_idol.split(".")[0]+"님이 대화상대에 추가되었습니다!"):alert("대화상대에 추가에 실패하였습니다..")},goto_login:async function(){await this.$router.push("/login")}}},L=S,E=(a("8ded"),Object(l["a"])(L,P,$,!1,null,null,null)),O=E.exports,j=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"img_recognition"},[a("b-dropdown",{attrs:{id:"dropdown",variant:"primary",text:"Menu"}},[a("b-dropdown-item",[t._v("이미지 인식 소개팅")]),a("b-dropdown-item",{on:{click:t.goto_mainPage_worldcup}},[t._v("이상형 월드컵")]),a("b-dropdown-item",{on:{click:t.goto_chatList}},[t._v("채팅방")])],1),a("b-button",{attrs:{id:"logout",variant:"danger"},on:{click:t.logout}},[t._v("로그아웃")]),a("div",{staticStyle:{"grid-column-start":"1","grid-column-end":"3"}},[a("h1",{on:{click:t.goto_main}},[t._v("홍덕해듀오")]),a("h4",{staticStyle:{"margin-top":"5%"}},[t._v("사진 업로드")]),a("p",{staticStyle:{"margin-top":"10%"}},[t._v("원하는 이상형 사진을 업로드 해주세요!")]),a("p",{staticStyle:{"margin-top":"5%"}},[t._v("AI를 통해 이상형의 얼굴과 가장 비슷한 사람을 찾아드립니다.")])]),a("div",{staticStyle:{"grid-column-start":"1","grid-column-end":"3"}},[a("div",{staticClass:"file-upload-form"},[a("input",{attrs:{type:"file",accept:"image/*"},on:{change:t.previewImage}})]),t.imageData.length>0&&!1===t.loading?a("div",{staticClass:"image-preview"},[a("img",{staticClass:"preview",attrs:{src:t.imageData}})]):t._e(),!0===t.loading?a("div",{staticClass:"loader"}):t._e(),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"5%","grid-column-start":"1","grid-column-end":"3"}},[a("div",{staticClass:"btn",staticStyle:{"margin-top":"2%"}},[a("button",{staticClass:"btn btn-warning",on:{click:t.find_idol}},[t._v("이상형 찾기")])])])]),a("b-modal",{attrs:{id:"bv-modal-example","hide-footer":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[t._v(" 닮은 사람 소개팅 ")]},proxy:!0}])},[a("div",{staticClass:"d-block text-center"},[a("h3",[t._v(t._s(this.modal_idol.id))]),a("img",{staticClass:"person",attrs:{src:this.modal_idol.img}})]),a("b-button",{staticClass:"mt-3",attrs:{variant:"success",block:""},on:{click:function(i){t.insert_chatList(),t.$bvModal.hide("bv-modal-example")}}},[t._v("받을래요!")]),a("b-button",{staticClass:"mt-3",attrs:{block:""},on:{click:function(i){return t.$bvModal.hide("bv-modal-example")}}},[t._v("죄송합니다.")])],1)],1)},D=[],M={name:"image_recognition",props:{title:String},data:function(){return{id:"",password:"",passwordCheck:"",imageData:"",loading:!1,modal_idol:{id:"",img:""}}},created:async function(){let t=await p.a.post("/api/get_id");t.data.ok?this.id=t.data.id:(alert(t.data.msg),await this.$router.push("/login"))},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{find_idol:async function(){if(this.imageData){this.loading=!0;let t=await p.a.post("/api/img_recognition",{img:this.imageData});this.loading=!1,t.data.ok?(this.modal_idol=t.data.matched_person,console.log(t.data.matched_person),this.$bvModal.show("bv-modal-example")):alert(t.data.msg)}else alert("이미지를 먼저 업로드해주세요")},previewImage:function(t){let i=t.target;if(i.files&&i.files[0]){let t=new FileReader;t.onload=t=>{this.imageData=t.target.result},t.readAsDataURL(i.files[0])}},goto_main:async function(){await this.$router.push("/mainPage")},insert_chatList:async function(){let t=await p.a.post("/api/insert_chatList",{id:this.id,person:this.modal_idol.id});t.data.ok?alert(this.modal_idol.id+"님이 대화상대에 추가되었습니다!"):alert("대화상대에 추가에 실패하였습니다..")},goto_chatList:async function(){await this.$router.push("/chatList")},goto_mainPage_worldcup:async function(){await this.$router.push("/mainPage_worldcup")},logout:async function(){await p.a.get("/api/logout"),await this.$router.push("/login")}}},R=M,I=(a("e8f6"),Object(l["a"])(R,j,D,!1,null,null,null)),N=I.exports,T=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"main"}},[a("b-dropdown",{attrs:{id:"dropdown",variant:"primary",text:"Menu"}},[a("b-dropdown-item",{on:{click:t.goto_image_recognition}},[t._v("이미지 인식 소개팅")]),a("b-dropdown-item",{on:{click:t.goto_mainPage_worldcup}},[t._v("이상형 월드컵")]),a("b-dropdown-item",[t._v("채팅방")])],1),a("b-button",{attrs:{id:"logout",variant:"danger"},on:{click:t.logout}},[t._v("로그아웃")]),a("div",{attrs:{id:"title"}},[a("h1",{on:{click:t.goto_main}},[t._v("상대 리스트")]),a("div",{staticStyle:{"margin-bottom":"50px"}},[t._v(t._s(this.id)+"님 환영합니다!")]),a("ul",{staticClass:"list-group"},t._l(t.chatList,(function(i){return a("li",{staticClass:"list-group-item"},[a("div",{staticStyle:{float:"left"}},[t._v(t._s(i.split(".")[0]))]),a("div",{staticStyle:{float:"right"}},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button",id:"startchat"},on:{click:function(a){t.person=i,t.$bvModal.show("bv-modal-example")}}},[t._v("채팅하기")]),a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button",id:"deletechat"},on:{click:function(a){return t.deleteChat(i)}}},[t._v("삭제")])])])})),0)]),a("b-modal",{attrs:{id:"bv-modal-example","hide-footer":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[t._v(" 채팅방 ")]},proxy:!0}])},[a("div",{staticClass:"d-block text-center"},[a("h3",[t._v(t._s(this.person))])]),a("div",[a("b-form-textarea",{attrs:{id:"textarea",rows:"3","max-rows":"6"},model:{value:t.chat.join("\n"),callback:function(i){t.$set(t.chat,"join('\n')",i)},expression:"chat.join('\\n')"}})],1),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"form-control",attrs:{type:"text",placeholder:"메시지를 입력하세요.","aria-label":"Recipient's username","aria-describedby":"button-addon2"},domProps:{value:t.message},on:{input:function(i){i.target.composing||(t.message=i.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button",id:"button-addon2"},on:{click:function(i){t.chat.push(t.message),t.message=""}}},[t._v("전송")])])])])],1)},W=[];history.pushState(null,null,location.href),window.onpopstate=function(){history.go(1)};var A={name:"chatList",props:{title:String},data:function(){return{id:"",chatList:[],chat:[],person:"",message:""}},created:async function(){let t=await p.a.post("/api/get_id");t.data.ok?this.id=t.data.id:(alert(t.data.msg),await this.$router.push("/login")),t=await p.a.post("/api/get_chatList",{id:this.id}),this.chatList=t.data.chatList},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{goto_main:async function(){await this.$router.push("/mainPage")},goto_image_recognition:async function(){await this.$router.push("/image_recognition")},goto_mainPage_worldcup:async function(){await this.$router.push("/mainPage_worldcup")},deleteChat:async function(t){await p.a.post("/api/deleteChat",{person:t});let i=await p.a.post("/api/get_chatList",{id:this.id});this.chatList=i.data.chatList,alert("삭제 되었습니다")},logout:async function(){await p.a.get("/api/logout"),await this.$router.push("/login")}}},F=A,J=(a("c241"),Object(l["a"])(F,T,W,!1,null,null,null)),K=J.exports,U=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"mainPage"}},[a("b-dropdown",{staticClass:"m-md-2",attrs:{id:"dropdown",variant:"primary",text:"Menu"}},[a("b-dropdown-item",{on:{click:t.goto_image_recognition}},[t._v("이미지 인식 소개팅")]),a("b-dropdown-item",{on:{click:t.goto_mainPage_worldcup}},[t._v("이상형 월드컵")]),a("b-dropdown-item",{on:{click:t.goto_chatList}},[t._v("채팅방")])],1),a("b-button",{attrs:{id:"logout",variant:"danger"},on:{click:t.logout}},[t._v("로그아웃")]),a("div",{attrs:{id:"title"}},[a("h1",[t._v("홍덕해듀오")]),a("div",[t._v(t._s(this.id)+"님 환영합니다!")]),a("div",[t._v("원하시는 방법을 선택해주세요!")])]),a("div",{attrs:{id:"imageRecognition"},on:{click:function(i){return t.imageRecognition()}}},[a("img",{staticClass:"menu",attrs:{src:"./images/imageRecognition.png"}})]),a("div",{attrs:{id:"worldcupRecognition"},on:{click:function(i){return t.worldcupRecognition()}}},[a("img",{staticClass:"menu",attrs:{src:"./images/worldcupRecognition.png"}})])],1)},q=[];history.pushState(null,null,location.href),window.onpopstate=function(){history.go(1)};var z={name:"mainPage",props:{title:String},data:function(){return{id:""}},created:async function(){let t=await p.a.post("/api/get_id");t.data.ok?this.id=t.data.id:(alert(t.data.msg),await this.$router.push("/login"))},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{imageRecognition:async function(){await this.$router.push("/image_recognition")},worldcupRecognition:async function(){await this.$router.push("/mainPage_worldcup")},goto_chatList:async function(){await this.$router.push("/chatList")},goto_image_recognition:async function(){await this.$router.push("/image_recognition")},goto_mainPage_worldcup:async function(){await this.$router.push("/mainPage_worldcup")},logout:async function(){await p.a.get("/api/logout"),await this.$router.push("/login")}}},B=z,G=(a("8f42"),Object(l["a"])(B,U,q,!1,null,null,null)),H=G.exports,Q=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"main"}},[a("b-dropdown",{attrs:{id:"dropdown",variant:"primary",text:"Menu"}},[a("b-dropdown-item",{on:{click:t.goto_image_recognition}},[t._v("이미지 인식 소개팅")]),a("b-dropdown-item",[t._v("이상형 월드컵")]),a("b-dropdown-item",{on:{click:t.goto_chatList}},[t._v("채팅방")])],1),a("b-button",{attrs:{id:"logout",variant:"danger"},on:{click:t.logout}},[t._v("로그아웃")]),a("div",{attrs:{id:"title"}},[a("h1",{on:{click:t.goto_main}},[t._v("오늘의 이상형 월드컵")]),a("div",[t._v(t._s(this.id)+"님 환영합니다!")])]),a("div",{attrs:{id:"round"}},[t._v(t._s(this.round))]),t.round_num>1?a("div",{attrs:{id:"left_idol"},on:{click:function(i){return t.select_left()}}},[a("img",{staticClass:"rank",attrs:{src:"./images/idol/"+this.left}})]):t._e(),t.round_num>1?a("div",{attrs:{id:"right_idol"},on:{click:function(i){return t.select_right()}}},[a("img",{staticClass:"rank",attrs:{src:"./images/idol/"+this.right}})]):t._e(),1===t.round_num?a("div",{attrs:{id:"winner"}},[a("img",{staticClass:"rank",attrs:{src:"./images/idol/"+this.winner},on:{click:function(i){return t.get_similar_person(t.winner)}}})]):t._e(),a("div",{attrs:{id:"bottom"}},[a("h6",[t._v("역대 우승자")]),a("ul",t._l(t.winners_list,(function(i){return a("li",[a("img",{staticClass:"winner",attrs:{src:"./images/idol/"+i},on:{click:function(a){return t.get_similar_person(i)}}})])})),0)]),a("b-modal",{attrs:{id:"bv-modal-example","hide-footer":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[t._v(" 닮은 사람 소개팅 ")]},proxy:!0}])},[a("div",{staticClass:"d-block text-center"},[a("h3",[t._v(t._s(this.modal_idol.split(".")[0]))]),a("img",{staticClass:"person",attrs:{src:"./images/people/"+this.modal_idol}})]),a("b-button",{staticClass:"mt-3",attrs:{variant:"success",block:""},on:{click:function(i){t.insert_chatList(),t.$bvModal.hide("bv-modal-example")}}},[t._v("받을래요!")]),a("b-button",{staticClass:"mt-3",attrs:{block:""},on:{click:function(i){return t.$bvModal.hide("bv-modal-example")}}},[t._v("죄송합니다.")])],1)],1)},V=[];history.pushState(null,null,location.href),window.onpopstate=function(){history.go(1)};var X={name:"mainPage_worldcup",props:{title:String},data:function(){return{id:"",right:"",left:"",winner:"",round_num:16,round:"16 강",modal_idol:"",images:[],seleted_idol:[],winners_list:[]}},created:async function(){let t=await p.a.post("/api/get_id");t.data.ok?this.id=t.data.id:(alert(t.data.msg),await this.$router.push("/login")),t=await p.a.post("/api/get_imgs_list"),this.images=t.data.imgs,this.right=await this.get_random_img(),this.left=await this.get_random_img(),t=await p.a.post("/api/get_winners_list"),this.winners_list=t.data.winners_list},sockets:{connect:function(){console.log("socket connected")},customEmit:function(t){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},methods:{get_random_img:async function(){let t=Math.floor(100*Math.random())%this.images.length;return console.log("11:",this.images[t]),this.images.splice(t,1)[0]},select_left:async function(){this.seleted_idol.push(this.left),0===this.images.length&&(this.round_num/=2,1===this.round_num?(this.round="우승",this.winner=this.left,await p.a.post("/api/insert_winner",{winner:this.winner})):2===this.round_num?this.round="준우승":this.round=this.round_num+"강",this.images=this.seleted_idol,this.seleted_idol=[]),this.left=await this.get_random_img(),this.right=await this.get_random_img()},select_right:async function(){this.seleted_idol.push(this.right),0===this.images.length&&(this.round_num/=2,1===this.round_num?(this.round="우승",this.winner=this.right,await p.a.post("/api/insert_winner",{winner:this.winner})):2===this.round_num?this.round="준우승":this.round=this.round_num+"강",this.images=this.seleted_idol,this.seleted_idol=[]),this.left=await this.get_random_img(),this.right=await this.get_random_img()},get_similar_person:async function(t){let i=await p.a.post("/api/get_similar_person",{winner:t});i.data.ok?(this.modal_idol=i.data.person,this.$bvModal.show("bv-modal-example")):alert(i.data.msg)},insert_chatList:async function(){let t=await p.a.post("/api/insert_chatList",{id:this.id,person:this.modal_idol.split(".")[0]});t.data.ok?alert(this.modal_idol.split(".")[0]+"님이 대화상대에 추가되었습니다!"):alert("대화상대에 추가에 실패하였습니다..")},goto_chatList:async function(){await this.$router.push("/chatList")},goto_main:async function(){await this.$router.push("/mainPage")},goto_image_recognition:async function(){await this.$router.push("/image_recognition")},logout:async function(){await p.a.get("/api/logout"),await this.$router.push("/login")}}},Y=X,Z=(a("61bf"),Object(l["a"])(Y,Q,V,!1,null,null,null)),tt=Z.exports,it=a("8c4f"),at=new it["a"]({mode:"history",routes:[{path:"/",component:v},{path:"/login",component:v},{path:"/register",component:x},{path:"/register2",component:O},{path:"/image_recognition",component:N},{path:"/mainPage",component:H},{path:"/mainPage_worldcup",component:tt},{path:"/chatList",component:K},{path:"*",component:{template:"<div>Not Found</div>"}}]}),et=a("5132"),ot=a.n(et),nt=a("5f5b"),st=a("b1e0"),rt=(a("f9e3"),a("2dd8"),a("8055")),lt=a.n(rt);e["default"].config.productionTip=!1,e["default"].use(it["a"]),e["default"].use(nt["a"]),e["default"].use(st["a"]),e["default"].use(new ot.a({debug:!0,connection:lt()("localhost:3000"),vuex:{actionPrefix:"SOCKET_",mutationPrefix:"SOCKET_"},options:{path:"/frontend/"}})),new e["default"]({el:"#app",render:t=>t(d),router:at}).$mount("#app")},"61bf":function(t,i,a){"use strict";var e=a("99f4"),o=a.n(e);o.a},"8ded":function(t,i,a){"use strict";var e=a("06be"),o=a.n(e);o.a},"8f42":function(t,i,a){"use strict";var e=a("a007"),o=a.n(e);o.a},"99f4":function(t,i,a){},a007:function(t,i,a){},bdf0:function(t,i,a){},c241:function(t,i,a){"use strict";var e=a("bdf0"),o=a.n(e);o.a},d766:function(t,i,a){},e0f0:function(t,i,a){"use strict";var e=a("e3ea"),o=a.n(e);o.a},e3ea:function(t,i,a){},e8f6:function(t,i,a){"use strict";var e=a("d766"),o=a.n(e);o.a}});
//# sourceMappingURL=app.2e137bd2.js.map