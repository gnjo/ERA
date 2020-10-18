EXP({debug:console.log})

EXP`640x360
MIM <<<,MRK
MIM >>>,IFJ
MIM ***,WAI
///////////
CAS.
https://gnjo.github.io/mock3d/bg/city1.jpg
https://gnjo.github.io/mock3d/bg/city2.jpg
https://gnjo.github.io/mock3d/bg/city3.jpg
https://gnjo.github.io/mock3d/bg/inn.jpg
https://gnjo.github.io/mock3d/bg/insp1.jpg
https://gnjo.github.io/mock3d/mons/ajin1-min.png
END //
///////////
<<< #story1
CLR #000 //背景製作開始
IMG inn.jpg,f,0,0
IMG ajin1-min.png,c,0,0
CAP bg1 //背景をキャプチャして、名前をつけて保存
<<< #story1.loop
DRW bg1,500 //fadein
KEY
DRW #000,300 //fadeoutの場合は#000に向かって行う。
>>> #story1.loop
`
