# ERA

```
ERA`640x480
CLR //offcanvas clear
IMG aaaa.jpg,f
IMG xyz.jpg,c,200,300
IMG xyz.jpg,l,200,300
CAP view1
DRW view1,700 //fadein fadeout
MES.
this is line one
line 2
3
4

どうしますか？
, //question
戦う //0
攻撃 //1
逃げる //2
冗談を云う //3
戻る //4
,1 //question cursol
`

```


### note
```
CLR
BGI aaaa.jpg
IMG xyz.jpg,c,200,300
CAP view1 //あらかじめシーンを作る

DRW view1,700 //fadein speed
MES.
aaaa
bbbb
cccc
, //question
戦う //0
攻撃 //1
逃げる //2
冗談を云う //3
戻る //4
,1 //question cursol
^
DRW view1,-700 //fadeout speed
//select number MES

IFJ $MES===1>>>#aaa
IFJ $MES===2>>>#bbb
IFJ $MES===3>>>#ccc

!!! debuglog
### #xxxaaa
>>> 1>>>#kkkk
>>> $MES===1 >>> #bbb

wasdjk,^v<>AB



>>> 戦うことにした >>> #aaa
<<< #aaa

>>> {$Q01===1} >>> #bbb
>>> #bbb
>>> #ccc



$00=xyz

!!! end


function MES(mes,question,qcursol){
 let memctx=backupcanvas(mainctx)
 let w,h,ctx,...
 ctx.draw(memctx,0,0)
 
 //(question)? modequestion.

}


```
