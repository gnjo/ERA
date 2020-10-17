EXP({
 debug:console.log
})

EXP`
MIM >>>,IFJ
MIM <<<,MRK
MIM ***,WAI

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


<<< #aaa
EVL console.log($MRK)
j
MES. 
aaaaaaa
aaaaaaa
aaaaaaa
aaaaaaa
END

*** 1000

>>> #xyz
`
