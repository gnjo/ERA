;(function(root){
var is={}
is.object = function(obj){var type = typeof obj;return type === 'function' || type === 'object' && !!obj}
is.array = Array.isArray || function(obj){return toString.call(obj) === '[object Array]'}
is.void = function(obj){return obj === void 0}
is.string = function(obj){return toString.call(obj) === '[object String]'}
is.number = function(obj){return toString.call(obj) === '[object Number]'}

var o={}
o.is=is
o.root=root //
o.runtime=performance.now()
o.w=640
o.h=(640/16)*9
o.waiting=0
o.readline=0
o.lines// ary
o.jumps// object
o.jumpback //jumpbackline
o.stop=stop
o.next=next
o.isend=isend
o.debug=()=>{ }
o.callfunc=callfunc
o.run=run
o.cash={}
o.canvas //canvas
o.ctx //o.canvas.getContext('2d')
o.offcanvas //o.offcanvas...
o.offctx
o.bgm //video class .bgm
o.se //video class .se
o.copyImage=o.copyimage=destcolor

function EXP(str){
 if(is.array(str))return run(str[0]) //tag
 else if(is.string(str))return run(str) //simple call
 else if(is.void(str))return o //getter
 else if(is.object(str))return o=Object.assign(o,str) //setter
 return console.warn('dont reach EXP:',str)
}
root.EXP=EXP

////////////////////////
function run(str){
 var o=EXP()
 valuable(o.root) //r020 $00-$ZZ
 let a=lexsize(str)
 o.w=a.w
 o.h=a.h
 o.lines=lex(str)
 o.jumps=lexjump(o.lines)
 ///
 if(o.canvas){
  //キャンバスがある場合はサイズ指定を無効とする。
  o.w=o.canvas.width,o.h=o.canvas.height
  o.canvas.style='image-rendering:pixelated;' //拡大時にはドットで。
 }else{
  o.canvas=gameCanvas(o.w,o.h)  
 }
 o.ctx=o.canvas.getContext('2d') 
 o.se=gameSE()
 o.bgm=gameBGM()
 o.offcanvas=document.createElement('canvas')
 o.offcanvas.width=o.w,o.offcanvas.height=o.h
 o.offctx=o.offcanvas.getContext('2d')
 ///font
 let fsize=~~(o.h/20)
 o.ctx.font=o.offctx.font=`${fsize}px exp` //r029
 ///
 o.debug(o)
 o.next(0) 
 return o
 ;
}

function stop(){
 var o=EXP()
 return o.waiting=1
}

function next(n){
 var o=EXP()
 o.waiting=0
 if(is.void(n)) o.readline++
 else o.readline=n
 if(o.isend()){
  o.runtime=performance.now()-o.runtime   
  return console.log(`endline ${o.runtime.toFixed(3)}ms`,o)
 }
 if(!o.waiting)o.callfunc(o.lines[o.readline])  
}

function isend(){
 var o=EXP()  
 return o.lines.length-1<o.readline 
}

function callfunc(line){
 var o=EXP()   
 o.stop()
 ;
 let f=line.slice(0,3),ary=_a(line.slice(4)),ch='$',self=o.root,r
 ;
 o.debug(o.readline,line,ary)
 ;//
 if(!self[f])return o.next()
 //o.debug('a',f,self[ch+f])
 r=self[f].apply(self,ary)
 if(isPromise(r))return r.then(d=>{ self[ch+f]=d,o.next() });
 else return self[ch+f]=r,o.next()
 //返り値は$+関数名  MES -> $MES
}
/////////////////////////////////
function isPromise(obj){return obj instanceof Promise || (obj && typeof obj.then === 'function')}
function _a(d){
 ////most
 return d.split(',').map(d=>_t(d)).map(d=>_m2(d)).map(d=>_n(d))  
}
function _t(d){return d.replace(/^[ \r\n\t\uFEFF\xA0]+|[ \t\r\n\uFEFF\xA0]+$/g, '')}
//numbalable
function _n(d){return /^[+,-]?([1-9]\d*|0)(\.\d+)?$/.test(d)?parseFloat(d):d}
function _(d){return eval(d)}
 
 
function _ms(obj){return obj.replace(/{(.*?)}/g,(d,dd)=>{return _(dd) }) }
function _mv(obj){return obj.replace(/{(.*?)}/g,(d,dd)=>{return dd}) }
//{xyz}//算術指示がある場合はevalする  
function _m2(obj){

 //eval issue r030
 if(/^{(.*?)}$/.test(obj))return _(_mv(obj)) //値の可能性
 else if(/{(.*?)}/.test(obj))return _ms(obj) //文字列
 else return obj; 
 
}
/*
function _m(obj){return obj.replace(/{(.*?)}/g,(d,dd)=>{return dd}) }
//{xyz}//算術指示がある場合はevalする  
function _m2(obj){
 if(!/{(.*?)}/.test(obj))return obj;
 return _(_m(obj))
}
*/
function valuable(self){
if(!self)return console.warn('valuable() param1 need',self)
let a="01234567890abcdefghijklmnopqrstuvwxyz$_".split('').map(d=>d.toUpperCase()) 
,len=a.length,j,i
;for(j=0;j<len;j++)for(i=0;i<len;i++)self['$'+a[i]+a[j]]='';
return len*len
}
////////////////////////
//lex https://codepen.io/gnjo/pen/abZNKOp?editors=0010
//lexjump 
//lexsize
function lexsize(str){
 let head=str.match(/^(\d{2,4})x(\d{2,4})/)||[]
 let o={}
 //console.log(head)
 o.w=parseInt(head[1]||640)
 o.h=parseInt(head[2]||360)
 return o
}

function lex(d){
 function _c(d){return d.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,'')} 

 let ma=/([A-Z!#$@*><_][0-9A-Z!#$@*><_]{2})\.([\s\S]*?)END|([A-Z!#$@*><_][0-9A-Z!#$@*><_]{2})(?:\n|$)|([A-Z!#$@*><_][0-9A-Z!#$@*><_]{2})[ =](.*)(?:\n|$)/g
 let ma_dot=/([A-Z!#$@*><_][0-9A-Z!#$@*><_]{2})\.([\s\S]*?)END/
 let ma_eq=/([A-Z!#$@*><_][0-9A-Z!#$@*><_]{2})=(.*)(?:\n|$)/
 let ma_mark=/(MRK|###|<<<) (.*)(?:\n|$)/
 let ma_jump=/(IFJ|>>>) (.*)(?:\n|$)/
 ;
 return _c(d).match(ma).map(d=>d.trim()).map(d=>{
  let a   
  if(ma_dot.test(d))return a=d.match(ma_dot),(a[1]+' '+a[2]).trim()
  else if(ma_mark.test(d))return a=d.match(ma_mark),('MRK'+' '+a[2]).trim() //MIMの問題があるため、大本の関数へ
  else if(ma_jump.test(d))return a=d.match(ma_jump),('IFJ'+' '+a[2]).trim() //MIMの問題があるため、大本の関数へ 
  else if(ma_eq.test(d))return 'EVL'+' '+d  
  else return d
 })
}

function lexjump(ary){
 let ma_mark=/(MRK|###|<<<) (.*)(?:\n|$)/
 let obj={}
 ary.map((d,i)=>{
  if(!ma_mark.test(d))return d
  let a=d.match(ma_mark)
  obj[a[2]]=i
 })
 return obj
}

function destcolor(img,color) {
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d');
canvas.width = img.width
canvas.height = img.height;
if(color){
 //colorを指示すれば、マスク化。しなければコピーのみ。
 ctx.fillStyle = makecolor(color);///r030
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 ctx.globalCompositeOperation = 'destination-in';
}
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
return canvas;
}

})(this); 

//>>>r001
function MIM(tar,org){
var o=EXP()
let root=o.root
root[tar]=root[org]
//console.log(tar,ZAP_THIS[tar])
return tar;
}

function MRK(str){
var o=EXP()
//o.jumpback=o.readline+1 //???+1
o.jumpback=o.readline
o.debug(`MRK ${str}:${o.readline}`)  
return o.jumpback
}

function IFJ(str,chk){
/*
>>> #aaa,{$KEY==='A'}
>>> #aaa,{$KEY==='B'}
>>> #xyz,1 //loop
>>> #xyz //same  
*/
var o=EXP(),is=o.is
if(is.void(chk)) chk=1
if(!chk)return
if(/^#/.test(str)){
 o.debug('IFJ hit',str,o.jumps[str])
 if(o.jumps[str])return o.readline=o.jumps[str]
 return;
}else if(is.number(str)){
 //number
 return o.readline=str
}
return console.warn('IFJ dont reach',str,chk)
}

function EVL(str){
return eval(str)
}
////////////////////////
//polling
function POL(caller,time){return new Promise(sol=>{
lop()
function lop(){ 
 setTimeout(()=>caller()?sol():lop(),Math.max(time||5,5)) 
}
})}
//wait
function WAI(time){return new Promise(sol=>{
setTimeout(()=>sol(time),time||0) 
})}
//keywait
$KEC=KEC()
function KEY(map){return new Promise(sol=>{
let dom=document.documentElement,del=()=>dom.onkeydown=void 0;
let map=inverseObject($KEC)
dom.onkeydown=function(ev){ 
 if(map[ev.which]) del(),sol(map[ev.which])
}
function inverseObject (obj, keyIsNumber) {
 return Object.keys(obj).reduceRight(function (ret, k) {
  return (ret[obj[k]] = keyIsNumber ? parseInt(k, 10) : k, ret);
 }, {});
}
})}

//$KEC=KEC(38,40,37,39,13,32)
function KEC(...ary){
var o=EXP()
ary=ary||[87,83,65,68,69,81]
let map={}
map['^']=ary[0]||87 //w
map['v']=ary[1]||83 //s
map['<']=ary[2]||65 //a
map['>']=ary[3]||68 //d
map['A']=ary[4]||69 //e
map['B']=ary[5]||81 //q
o.debug('keyconfig',ary,map)//,map,inverseObject(map))
return map
/*
ArrowUp:38
ArrowDown:40
ArrowLeft:37
ArrowRight:39
KeyX:88
KeyZ:90
KeyW:87
KeyA:65
KeyS:83
KeyD:68
KeyJ:74
KeyK:75
KeyE:69
KeyQ:81
KeyI:73
KeyU:85
KeyO:79
Space:32
Enter:13
*/
}
//<<<r012

function CLR(color){
var o=EXP()
let ctx=o.offctx,w=o.w,h=o.h
if(!color)return ctx.clearRect(0,0,w,h)
ctx.fillStyle=makecolor(color)//r030
ctx.fillRect(0,0,w,h)
//
ctx.restore(),ctx.save()
}

function CAP(name){
var o=EXP()
let offctx=o.offctx,w=o.w,h=o.h,cash=o.cash
let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d');
canvas.width = w,canvas.height = h
ctx.drawImage(offctx.canvas, 0, 0, canvas.width, canvas.height);
cash['CAP']=cash['$CAP']=canvas;
if(name) cash[name]=canvas
return canvas
}

//fontload r029 always font-family exp
function CAS(str){
//ZAP_CASH={}
var o=EXP(),cash=o.cash,time=performance.now()
let ma_v =/\.amr$|\.awb$|\.m4a$|\.mp4$|\.mp3$|\.wma$|\.aac$|\.mid$|\.midi$|\.ogg$|\.oga$|\.wav$|\.flac$/i
let ma_i =/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/i
let ma_f =/\.woff$|\.otf$|\.ttf$|\.eot$/i //fontload
return Promise.all(str.split('\n').map(d=>get(d) ))
 .then(d=>{ o.debug('cash time:'+(performance.now()-time) ) ;return d})
;
function get(url){return new Promise((sol)=>{
 //fontload
 if(ma_f.test(url))return sol(fontload(url))
 //fontload
 let obj,f=()=>{cash[url]=cash[url.split('/').pop()]=obj,sol(url)}
 if(ma_v.test(url)){
  obj=document.createElement('video')
  obj.onloadedmetadata=f/////////
 }else{
  obj=new Image()
  obj.onload =f
 }
 if(!obj)return o.debug('NG> '+url),sol(url)
 obj.onerror=()=>{o.debug('NG> '+url);sol(url) }
 obj.crossOrigin='anonymous'////
 obj.src=url ////
})}
;
function fontload(url){return new Promise(sol=>{
 let head=document.querySelector('head')
 let linktype=url.split('.').pop().toLowerCase() //
 let map={
  'otf':'opentype'
  ,'ttf':'truetype'
  ,'woff':'woff'
  ,'eot':'eot'  
 }
 let type=map[linktype]||'truetype'
 
 let fn={}
 fn.i3=(d)=>{
  if(typeof d !=='string') return d
  var el=document.createElement('table'); el.innerHTML=d.trim();
  var me=el.childNodes[0]
  el=void 0;
  return me
 }
 
let link=`<link rel="preload" href="${url}" as="font" type="font/${linktype}" crossorigin="anonymous">`
let style=`<style>@font-face {font-family:exp; src: url('${url}') format('${type}');}</style>`
let ell=fn.i3(link)
let els=fn.i3(style)
ell.onload=()=>{ 
 return sol(url)
}
ell.onerror=()=>{sol(url) }
 document.head.appendChild(ell) //
 document.head.appendChild(els)
 
})} 
 
}

//<<<r020
function BGM(url){
var o=EXP()
if(!o.cash[url]) o.bgm.src=''
else o.bgm.src= o.cash[url].src||'',o.bgm.dataset.needsUpdate=true 
return url
}

function SE_(url){
var o=EXP()
if(!o.cash[url]) o.se.src=''
else o.se.src= o.cash[url].src||'',o.se.dataset.needsUpdate=true 
return url
}

function VOL(val,opt){
var o=EXP(),is=o.is
//volume 0.0 - 1.0
//VOL 0.5,se //target se other bgm
//VOL 0.5 //se and bgm
if(is.void(opt))return o.se.volume=val,o.bgm.volume=val
if(/^s/i.test(opt)) return o.se.volume=val
else  return o.bgm.volume=val
}

function roleColor(){
var o=EXP(),is=o.is
if(is.void(o.roleColor)) o.roleColor=0
o._roleColor++; 
let n=10,h=o._roleColor*n%360
return `hsl(${h},100%,70%)`
}

function FON(str){
var o=EXP()
let ctx=o.ctx
if(!str) return ctx.font
ctx.font=str
ctx.save()//
return ctx.font
}

function COR(str){
var o=EXP()
let ctx=o.ctx
if(!str) return ctx.fillStyle
ctx.fillStyle=str
ctx.save()//
return ctx.fillStyle
}

//<<< r023
function IMG(url,lcr,ox,oy,color){
//offctx
var o=EXP()
let ctx=o.offctx,w=o.w,h=o.h,cash=o.cash
if(!cash[url])return
lcr=lcr||'',ox=ox||0,oy=oy||0
let ch=lcr.charAt(0),img=cash[url],iw=img.width,ih=img.height,spw=w/6
if(color) img=o.copyImage(img,color) 
if(ch==='l') ctx.drawImage(img,spw-iw/2+ox ,h/2-ih/2+oy ,iw,ih) 
else if(ch==='r') ctx.drawImage(img,w-spw-iw/2+ox ,h/2-ih/2+oy ,iw,ih)
else if(ch==='c') ctx.drawImage(img,w/2-iw/2+ox ,h/2-ih/2+oy ,iw,ih)
else ctx.drawImage(img,0,0,w,h)
return url
}

//<<< r024

function setTimecount(caller,dt,count){return new Promise(sol=>{
 //if count 10 is 0 - 9
 let i=0
 count=count||0
 lop()
 ///
 function lop(){return setTimeout(()=>{
  if(count<=i)return sol(i);
  caller(i),i++,lop()
 },dt)}
})}//

var setTimeCount=setTimecount
function setAnimcount(caller,count,opt){return new Promise(sol=>{
 //if count 10 is 0 - 9
 let i=0,fi=0,ret
 count=count||0,opt=opt||1
 lop()
 ///
 function lop(){
  if(count<=i)return sol(ret)
  requestAnimationFrame(lop)
  if(fi%opt===0) ret=caller(i),i++
  fi++
 }
 /*
 await setAnimcount((i)=>{
  fn.q('pre').textContent=i
  //if(i%2===0) ... //30fps
  //if(i%3===0) ... //20fps
  //4 15fps
  //5 12fps
  //6 10fps
 },500,6) 
 */
})}//
var setAnimCount=setAnimcount

function DRW(name,time){ 
 var o=EXP()
 o.is.color=(d)=>{return /rgb\(|rgba\(|hsl\(|hsla\(|#/i.test(d)}
 //time... afterwork
 let is=o.is,ctx=o.ctx,w=o.w,h=o.h,cash=o.cash
 ,fadein=time>0
 ,frames= ~~(Math.abs(time)/(1000/60))||1
 //console.log('frames',frames)
 if(!name)return ctx.clearRect(0,0,w,h),ctx.canvas //r029
 //
 let f=(i)=>{
  let alpha=(i+1)/frames
  //o.debug(alpha)
  ctx.globalAlpha=alpha
  if(is.color(name)){
   ctx.fillStyle=makecolor(color)//r030
   ctx.fillRect(0,0,w,h)
   ctx.restore(),ctx.save()
   return ctx.canvas
  }else if(cash[name]){
   let img=cash[name]
   ctx.drawImage(img,0,0,w,h)
   ctx.restore(),ctx.save()   
   return ctx.canvas
  }
  console.warn('DRW img notfound',name)
  return ctx.canvas
 }
 return setAnimCount(f,frames,1)
}

//<<< r025

function makepen(_ctx,_lineh,_incolor,_outcolor){
 /*
let pen=makepen(ctx,1.3,'#fff','#f26a')
ctx.font='20px planes'
;[0,1,2,3,4,5,6].map((d,i)=>{
 pen('漢字あいうえを',i,'c')
 if(i===3)pen('漢字あいうえを',i,'c',12)
}) 
 */
 const incolor=_incolor||'#000'
 const outcolor=_outcolor||'#888'
 const ctx=_ctx
 const lineh=_lineh
 return function pen(text,line,lcr,blink){
  //ctx=
  let w=ctx.canvas.width,h=ctx.canvas.height,fh=parseInt(ctx.font),fw=fh/2
  ,wpx=ctx.measureText(text).width,hpx=(fh*line+fh)*lineh ,wk,x
  ;
  let sp='漢',t=Array.from({length:blink}).map(d=>sp).join('')
  wpx=ctx.measureText(t).width
  ;
  lcr=lcr||ctx.textAlign
  lcr=lcr.charAt(0)
  if(lcr==='l')ctx.textAlign='left',x=fw/2  
  if(lcr==='c')ctx.textAlign='center',x=w/2
  if(lcr==='r')ctx.textAlign='right',x=w-fw/2
  if(blink){
   ctx.fillStyle=outcolor
   if(lcr==='l') ctx.fillRect(x-fw,hpx-fh+2,wpx+fw+x,fh)
   if(lcr==='c') ctx.fillRect(w/2-wpx/2-fw/2,hpx-fh+2,wpx+fw,fh)
   if(lcr==='r') ctx.fillRect(x-wpx-fw/2,hpx-fh+2,wpx+fw,fh)
  }
  ctx.globalAlpha=0.9  
  ctx.fillStyle=incolor
  ctx.fillText(text,x,hpx)
  return ctx.restore(),ctx.save()
 } 
}

async function MES(str){
 var o=EXP()
 //console.log(str,question,cursor)
 let ctx=o.ctx,w=o.w,h=o.h
 let backup=o.copyImage(o.canvas)
 let empty=Array.from({length:5}).map(d=>'')
 let ary=empty.concat(str.split('\n')).concat(empty)
 let max=ary.map(d=>d.length).reduce((a,b)=>Math.max(a,b))
 let pen=makepen(ctx,1.3,'#fff','#f26a')
 let pos=1,oh=5
  
  for(pos=1;pos<ary.length-5;pos++){
   ctx.drawImage(backup,0,0)
   pen(ary[pos+0],0+oh,'c')
   pen(ary[pos+1],1+oh,'c')
   pen(ary[pos+2],2+oh,'c')
   pen(ary[pos+3],3+oh,'c')
   pen(ary[pos+4],4+oh,'c')  
   await KEY()
   await WAI(1000/60)
  }
  //mode question
  return 
}

//<<< r027

async function QUE(str,question,cursor){
 var o=EXP()
 //console.log(str,question,cursor)
 let ctx=o.ctx,w=o.w,h=o.h
 let backup=o.copyImage(o.canvas)
 //let empty=Array.from({length:5}).map(d=>'')
 let ary=str.split('\n') //empty.concat(str.split('\n')).concat(empty)
 let ansary=question.split('\n')
 let max=ansary.map(d=>d.length).reduce((a,b)=>Math.max(a,b))
 let pen=makepen(ctx,1.3,'#fff','#f26a')
 let pos=cursor||0,oh=2,key,nmax=ansary.length
 let keyse=o.se.src  
  for(;key!='A';){
   ctx.drawImage(backup,0,0)
   oh=2
   //question
   pen('Question',0+oh,'c')   
   pen(ary[0]||'',1+oh,'c')
   pen(ary[1]||'',2+oh,'c')
   pen(ary[2]||'',3+oh,'c')
   
   oh=2+ary.length+2
   //ans
   //選択肢が３０ほど大量にあった場合の対応は？
   pen(ansary[0]||'',0+oh,'c',pos%nmax===0?max:0)
   pen(ansary[1]||'',1+oh,'c',pos%nmax===1?max:0)
   pen(ansary[2]||'',2+oh,'c',pos%nmax===2?max:0)
   pen(ansary[3]||'',3+oh,'c',pos%nmax===3?max:0)
   pen(ansary[4]||'',4+oh,'c',pos%nmax===4?max:0)
   SE_(keyse)
   key=await KEY()
   if(key==='^') pos+=ansary.length-1
   if(key==='v') pos++   
   await WAI(1000/60)
  }
  return pos
  //mode question
  //return 
}
//<<< r028

function makecolor(c,ctx){
 //makecolor('#502-#904-#502')
 let color=c,h=ctx.canvas.height
 if(/#/.test(c)&&/-/.test(c)){
  let ary=c.split('-'),len=ary.length
  color=ctx.createLinearGradient(0,0,0,h)
  if(ary.length===2){
   color.addColorStop(0,ary[0]);
   color.addColorStop(1,ary[1]);    
  }else{
   color.addColorStop(0,ary[0]);
   color.addColorStop(0.5,ary[1]);
   color.addColorStop(1,ary[2]);
  }
 }
 return color
}

