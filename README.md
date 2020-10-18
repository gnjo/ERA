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
r030 coding LST TBL
r031 coding MES

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

