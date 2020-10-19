# EXP
例外が少なくコアの小さなエンジン。

```
r001 coded lex lexjump lexsize
r002 coded run stop next isend
r003 coded callfunc
r005 coded EXP entry function
r010 coded IFJ MRK KEY WAI POL KEC EVL
r011 coded test hard jump loop
r012 coded MIM
r013 coded CAS CLR CAP
r014 coded valuable
r020 coded ctx offctx 
r021 coded IMG
r022 coded BGM SE
r023 coded COR FON roleColor
r024 coded copyImage IMG
r025 coded DRW setAnimCount setTimeCount
r026 coded BGM SE bugfix
r027 coded MES makepen
r028 coded QUE
r029 coding much over QUE
issue font loaded check
r030 coding LST TBL

```

```
LST.
タイトル左文字幅を指す｜タイトル中央｜タイトル右
,
酒場｜酒場です
宿屋｜宿屋です。
街外れ｜街外れ。
,
1 //cursor
,0,0  //ox,oy//基本は中央表示
END
//基本色の0.5がオフカラー。
TBL.
//同じ構文だが、上下左右に｜｜を移動する。


```

### 構文
```
EXP({debug:console.log})

EXP`640x320
MIM >>>,IFJ
MIM <<<,MRK
MIM ***,WAI
/////
<<< #xyz //mark
<<< #bbbb
KEY //keywait ^v<>AB
//keyjump
>>> #aaa,{$KEY==='^'} //return value -> $CMD
>>> #aaa,{$KEY==='v'}
>>> #aaa,{$KEY==='<'}
>>> #aaa,{$KEY==='>'}
>>> #xyz,{$KEY==='A'}
>>> #xyz,{$KEY==='B'}
*** 100 //wait 100ms
MES. //multiline
aaaaaa
bbbbbb
cc
...
dddddd
eee
END //multiline end
>>> #xyz,1 //loop
>>> #xyz //same
`
```

```
EXP`640x320
MIM >>>,IFJ
MIM <<<,MRK
MIM ***,WAI
/////

DUN.

END
/////
<<< #dung

KEY
MOV {$KEY}
>>> #camp,{$KEY==='B'}
>>> {'#'+$MOV.g} //#ア
>>> {'#'+$MOV.addr} //#F00X00Y00.N
>>> #dung
/////

<<< #camp


>>> #dung,{#KEY==='B'}
>>> #camp
`

```


### note three.jsの2dと3dについて
```
//一番の問題は2d側のキャンバスサイズは、縦横比を柔軟に決めると体裁が崩れる事。
//統一的に扱うために2d側に依存したサイズにする必要がある。

var canvas3d=document.querySelector('canvas')
var {scene,camera,ctx2d,update3d,update2d}=build(canvas3d) //or build(640,360) //addChild the dom

//init()
//animate()

function animate(){
 requestAnimationFrame(animate)
 ,update3d()
 ,draw(ctx2d)
 ,update2d()
}

function draw(ctx){
//2d world
 let w=ctx.canvas.widith,h=ctx.canvas.height
 ctx.restore(),ctx.save(),ctx.clearRect(0,0,w,h)
 //
 ctx.fillStyle='#0f0'
 ctx.fillText(performance.now().toFixed(3),100,100)
}

```







