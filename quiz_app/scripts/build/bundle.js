!function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);var i,o,r=function(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var i=Array(e),o=0;for(n=0;n<t;n++)for(var r=arguments[n],c=0,s=r.length;c<s;c++,o++)i[o]=r[c];return i},c=function(e){return new Promise((function(n){e.style.height="auto",e.classList.remove("invisible-view"),e.ontransitionend=function(){e.ontransitionend=null,n()}}))},s=function(e){return new Promise((function(n){e.classList.add("invisible-view"),e.ontransitionend=function(){e.style.height="0px",e.ontransitionend=null,n()}}))},u=function(){var e;return JSON.parse(null!==(e=localStorage.getItem("best-scores"))&&void 0!==e?e:"[]")},d=function(e){var n=r(u(),[e]);localStorage.setItem("best-scores",JSON.stringify(n))},l=document.getElementById("result-view"),a=document.getElementById("answer-list"),m=document.getElementById("score"),f=document.getElementById("save-stats-btn"),y=document.getElementById("save-score-btn");f.onclick=function(){d(i),s(l).then((function(){return K()}))},y.onclick=function(){delete i.answers,d(i),s(l).then((function(){return K()}))};var p,g,v,b,w,I,h,E,L=function(e,n){return i=e,o={},n.questionList.forEach((function(e){o[e.id]=e,i.score+=i.answers[e.id].time,i.answers[e.id].content!==e.correctAnswer&&(i.score+=e.penalty)})),m.innerHTML="Twój wynik: "+i.score,a.innerHTML="",Object.keys(i.answers).forEach((function(e){var n=document.createElement("li"),t=parseInt(e);n.innerHTML=i.answers[t].content.toString(),a.appendChild(n)})),c(l)},q=document.getElementById("quiz-view"),B=document.getElementById("next-btn"),k=document.getElementById("prev-btn"),z=document.getElementById("cancel-btn"),j=document.getElementById("stop-btn"),M=document.getElementById("timer"),T=document.getElementById("quiz-description"),S=document.getElementById("q-content"),x=document.getElementById("ans-input"),O=function(){M.innerText=w+"s"},P=function(){var e,n;I[h.id]=null!==(e=I[h.id])&&void 0!==e&&e,v.answers[h.id]=null!==(n=v.answers[h.id])&&void 0!==n?n:{time:0,content:0},x.value=I[h.id]?v.answers[h.id].content.toString():"",S.innerHTML=h.content};B.onclick=function(){b+1<g.questionList.length&&(b+=1,h=g.questionList[b],b>0&&(k.disabled=!1),b+1==g.questionList.length&&(B.disabled=!0),P())},k.onclick=function(){b>0&&(b-=1,h=g.questionList[b],0==b&&(k.disabled=!0),b+1<g.questionList.length&&(B.disabled=!1),P())},j.onclick=function(){E===g.questionList.length&&(clearInterval(p),s(q).then((function(){return L(v,g)})))},z.onclick=function(){clearInterval(p),s(q).then((function(){return K()}))},x.onkeydown=function(e){13==e.keyCode&&B.click()},x.oninput=function(){""===x.value?(!0===I[h.id]&&(E-=1),I[h.id]=!1):(!1===I[h.id]&&(E+=1),I[h.id]=!0,v.answers[h.id].content=parseInt(x.value)),E===g.questionList.length?j.disabled=!1:j.disabled=!0};var H=function(e){return b=0,w=0,I={},h=(g=e).questionList[0],E=0,j.disabled=!0,k.disabled=!0,B.disabled=1==g.questionList.length,v={score:0,answers:{},quizID:g.id},T.textContent=g.description,O(),p=setInterval((function(){O(),w+=1,v.answers[h.id].time+=1}),1e3),P(),c(q)},A={id:1,content:"Ile to 2+3?",correctAnswer:5,penalty:7},C={id:2,content:"Ile to 2123+3?",correctAnswer:2126,penalty:7},_={id:3,content:"Ile to 21+37?",correctAnswer:58,penalty:7},D={id:4,content:"Ile to 80+3?",correctAnswer:83,penalty:7},J=[{id:1,name:"Działania arytmetyczne",description:"To jest quiz z podstawowych działań arytmetycznych",questionList:[A,C,_,D]},{id:1,name:"Mnożenie",description:"Pamiętaj, że wynik mnożenia to iloczyn!",questionList:[A,C,_,D]},{id:1,name:"Dodawanie",description:"Pamiętaj, że wynik mnożenia to iloczyn!",questionList:[A,C,_,D]},{id:1,name:"Dzielenie",description:"Pamiętaj, że wynik mnożenia to iloczyn!",questionList:[A,C,_,D]}],N=document.getElementById("main-view"),F=document.getElementById("score-list"),G=document.getElementById("quiz-list"),K=(document.getElementById("scores-sec"),function(){return G.innerHTML="",J.forEach((function(e){var n=document.createElement("button");n.textContent=e.name,n.onclick=function(){s(N).then((function(){return H(e)}))},G.appendChild(n)})),F.innerHTML="",u().sort((function(e,n){return e.score<n.score?-1:1})).slice(0,5).forEach((function(e){var n=document.createElement("li");n.innerHTML=e.score+" sek",F.appendChild(n)})),c(N)});K()}]);