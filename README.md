# EXP
例外が少なくコアの小さなエンジン。

```
var o={}
o.ma={}
ma.line
ma.jump=/^<<< (.*)$|^MRK (.*)$|^### (.*)$/
ma.code=/[^0-9A-Z!#$@*><_]{3}?[ \.=]/
ma.commentout

o.run=(text)=>{
 let d=text.replace(ma.commentout,'')
 o.lines=lex(d)
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


