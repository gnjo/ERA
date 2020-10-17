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
  o.canvas=gameCanvas(o.w,o.h)
  o.ctx=o.canvas.getContext('2d')
  o.se=gameSE()
  o.bgm=gameBGM()
  o.offcanvas=document.createElement('canvas')
  o.offcanvas.width=o.w,o.offcanvas.height=o.h
  o.offctx=o.offcanvas.getContext('2d')
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
 function _m(obj){return obj.replace(/{(.*?)}/g,(d,dd)=>{return dd}) }
 //{xyz}//算術指示がある場合はevalする  
 function _m2(obj){
  if(!/{(.*?)}/.test(obj))return obj;
  return _(_m(obj))
 }
 
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
 ctx.fillStyle=color
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

function CAS(str){
 //ZAP_CASH={}
 var o=EXP(),cash=o.cash,time=performance.now()
 let ma_v =/\.amr$|\.awb$|\.m4a$|\.mp4$|\.mp3$|\.wma$|\.aac$|\.mid$|\.midi$|\.ogg$|\.oga$|\.wav$|\.flac$/i
 let ma_i =/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/i
 return Promise.all(str.split('\n').map(d=>get(d) ))
  .then(d=>{ o.debug('cash time:'+(performance.now()-time) ) ;return d})
 ;
 function get(url){return new Promise((sol)=>{
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
 ////////////////
}

//<<<r020
