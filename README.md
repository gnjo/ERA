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
r021 IMG MES DRW
r022 BGM SE
```

```
var o={}

o.run=(text)=>{
 o.text=text
 o.lines=lex(text)
 o.jumps=lexjump(o.lines)
 o.next(0) //
}
o.stop()
o.next()
o.isend()
o.callfunc()
lex()
lexjump()

```

### 構文
```
EXP`640x480 //size
<<< #xyz //mark

KEY //keywait ^v<>AB
//keyjump
>>> #aaa,$KEY==='^' //return value -> $CMD
>>> #aaa,$KEY==='v'
>>> #aaa,$KEY==='<'
>>> #aaa,$KEY==='>'
>>> #aaa,$KEY==='A'
>>> #aaa,$KEY==='B'

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


