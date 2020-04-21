!function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);var i,o,r=function(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var i=Array(e),o=0;for(n=0;n<t;n++)for(var r=arguments[n],c=0,s=r.length;c<s;c++,o++)i[o]=r[c];return i},c=function(e){return new Promise((function(n){e.style.height="auto",e.classList.remove("invisible-view"),e.ontransitionend=function(){e.ontransitionend=null,n()}}))},s=function(e){return new Promise((function(n){e.classList.add("invisible-view"),e.ontransitionend=function(){e.style.height="0px",e.ontransitionend=null,n()}}))},u=function(){var e;return JSON.parse(null!==(e=localStorage.getItem("best-scores"))&&void 0!==e?e:"[]")},a=function(e){var n=r(u(),[e]);localStorage.setItem("best-scores",JSON.stringify(n))},l=document.getElementById("result-view"),d=document.getElementById("answer-list"),m=document.getElementById("score"),f=document.getElementById("save-stats-btn"),y=document.getElementById("save-score-btn");f.onclick=function(){a(i),s(l).then((function(){return G()}))},y.onclick=function(){delete i.answers,a(i),s(l).then((function(){return G()}))};var p,v,g,w,b,h,I,L,E=function(e,n){return i=e,o={},n.questionList.forEach((function(e){o[e.id]=e,i.score+=i.answers[e.id].time,i.answers[e.id].content!==e.correctAnswer&&(i.score+=e.penalty)})),m.innerHTML="Twój wynik: <b>"+i.score+"</b> sek.",d.innerHTML="",Object.keys(i.answers).forEach((function(e){var n=document.createElement("li"),t=parseInt(e);n.innerText=i.answers[t].content.toString(),i.answers[t].content===o[t].correctAnswer?n.classList.add("correct"):n.innerText+=" ("+o[t].penalty+" sek. kary)",d.appendChild(n)})),c(l)},q=document.getElementById("quiz-view"),k=document.getElementById("next-btn"),B=document.getElementById("prev-btn"),z=document.getElementById("cancel-btn"),j=document.getElementById("timer"),T=document.getElementById("quiz-description"),x=document.getElementById("q-content"),M=document.getElementById("ans-input"),S=function(){j.innerText=""+b},O=function(){var e,n;h[I.id]=null!==(e=h[I.id])&&void 0!==e&&e,g.answers[I.id]=null!==(n=g.answers[I.id])&&void 0!==n?n:{time:0,content:0},M.value=h[I.id]?g.answers[I.id].content.toString():"",x.innerHTML=I.content};k.onclick=function(){w+1<v.questionList.length&&(w+=1,I=v.questionList[w],w>0&&(B.disabled=!1),w+1==v.questionList.length&&(k.disabled=!0),O())},B.onclick=function(){w>0&&(w-=1,I=v.questionList[w],0==w&&(B.disabled=!0),w+1<v.questionList.length&&(k.disabled=!1),O())},j.onclick=function(){L===v.questionList.length&&(clearInterval(p),s(q).then((function(){return E(g,v)})))},z.onclick=function(){clearInterval(p),s(q).then((function(){return G()}))},M.onkeydown=function(e){13==e.keyCode&&k.click()},M.oninput=function(){""===M.value?(!0===h[I.id]&&(L-=1),h[I.id]=!1):(!1===h[I.id]&&(L+=1),h[I.id]=!0,g.answers[I.id].content=parseInt(M.value)),L===v.questionList.length?j.classList.remove("disabled"):j.classList.add("disabled")};var P=function(e){return w=0,b=0,h={},I=(v=e).questionList[0],L=0,B.disabled=!0,k.disabled=1==v.questionList.length,j.classList.add("disabled"),g={score:0,answers:{},quizID:v.id},T.textContent=v.description,S(),p=setInterval((function(){S(),b+=1,g.answers[I.id].time+=1}),1e3),O(),c(q)},A={id:1,content:"Ile to 2+3?",correctAnswer:5,penalty:7},C={id:2,content:"Ile to 2123+3?",correctAnswer:2126,penalty:7},H={id:3,content:"Ile to 21+37?",correctAnswer:58,penalty:7},_={id:4,content:"Ile to 80+3?",correctAnswer:83,penalty:7},D=[{id:1,name:"Działania arytmetyczne",description:"To jest quiz z podstawowych działań arytmetycznych",questionList:[A,C,H,_]},{id:1,name:"Mnożenie",description:"Pamiętaj, że wynik mnożenia to iloczyn!",questionList:[A,C,H,_]},{id:1,name:"Dodawanie",description:"Pamiętaj, że wynik mnożenia to iloczyn!",questionList:[A,C,H,_]},{id:1,name:"Dzielenie",description:"Pamiętaj, że wynik mnożenia to iloczyn!",questionList:[A,C,H,_]}],J=document.getElementById("main-view"),N=document.getElementById("score-list"),F=document.getElementById("quiz-list"),G=(document.getElementById("scores-sec"),function(){return F.innerHTML="",D.forEach((function(e){var n=document.createElement("button");n.textContent=e.name,n.onclick=function(){s(J).then((function(){return P(e)}))},F.appendChild(n)})),function(){N.innerHTML="";var e=u().sort((function(e,n){return e.score<n.score?-1:1}));e.length>0&&e.slice(0,5).forEach((function(e){var n=document.createElement("li");n.innerHTML=e.score+" sek.",N.appendChild(n)}))}(),c(J)});G()}]);