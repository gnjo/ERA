//r028
//EXP({debug:console.log})
EXP`640x360
MIM <<<,MRK
MIM >>>,IFJ
MIM ***,WAI
FON 18px planes 
VOL 0.1
COR #fff
DRW #0dd
///////////
CAS.
https://gnjo.github.io/mock3d/bg/back1.jpg
https://gnjo.github.io/mock3d/bg/back2.jpg
https://gnjo.github.io/mock3d/bg/back3.jpg

https://gnjo.github.io/mock3d/se/slash1.ogg
https://gnjo.github.io/mock3d/se/cursor1.mp3

https://gnjo.github.io/mock3d/mons/ajin1-min.png
https://gnjo.github.io/mock3d/mons/man2-min.png
END //
///////////
DRW #000,700
<<< #story1
CLR #000
IMG back1.jpg,f,0,0
IMG back1.jpg,f,0,0,#000a //暗く
IMG man2-min.png,l,0,0,#000c
CAP story1
*** 10
<<< #story1.loop
DRW story1,300 //fadein 300か700がよい。
SE_ cursor1.mp3

QUE.
君に問う。尾の長い生き物は多い。
それは身近にあるだろう。
足が長くて腕が短いものは何か？
,
恩行寺
愛染明王
益荒男
唐変木
この中にはない。
,0
END

SE_ slash1.ogg
DRW #000,300 //fadeoutの場合は#000に向かって行う。
SE_
>>> #story1.loop
`
