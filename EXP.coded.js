
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
let a
;
return _c(d).match(ma).map(d=>d.trim()).map(d=>{
 if(ma_dot.test(d))return a=d.match(ma_dot),(a[1]+' '+a[2]).trim()
 else if(ma_mark.test(d))return a=d.match(ma_mark),('<<<'+' '+a[2]).trim()
 else if(ma_jump.test(d))return a=d.match(ma_jump),('>>>'+' '+a[2]).trim()  
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
