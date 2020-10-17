//script(src="https://gnjo.github.io/EXP/EXP.coded.js?v=r020")
//script(src="https://gnjo.github.io/hud/gameCanvas.js")

EXP({debug:console.log})

//DRW codeing...
function DRW(name,time){ 
 var o=EXP()
 o.is.color=(d)=>{return /rgb\(|rgba\(|hsl\(|hsla\(|#/i.test(d)}
 //time... afterwork
 let is=o.is,ctx=o.ctx,w=o.w,h=o.h,cash=o.cash
 if(is.color(name)){
  ctx.fillStyle=name
  ctx.fillRect(0,0,w,h)
  ctx.restore(),ctx.save()
  return ctx.canvas
 }else if(cash[name]){
  let img=cash[name]
  ctx.drawImage(img,0,0,w,h)
  return ctx.canvas
 }
 console.warn('DRW img notfound',name)
 return ctx.canvas
}

EXP`640x360
MIM <<<,MRK
MIM >>>,IFJ
MIM ***,WAI
///////////
CAS.
https://gnjo.github.io/mock3d/bg/bar.jpg
https://gnjo.github.io/mock3d/bg/castle.jpg
https://gnjo.github.io/mock3d/bg/city1.jpg
https://gnjo.github.io/mock3d/bg/city2.jpg
https://gnjo.github.io/mock3d/bg/inn.jpg
https://gnjo.github.io/mock3d/bg/insp1.jpg
https://gnjo.github.io/mock3d/bg/insp2.jpg
https://gnjo.github.io/mock3d/bg/insp3.jpg
https://gnjo.github.io/mock3d/bg/insp4.jpg
https://gnjo.github.io/mock3d/bg/insp5.jpg
https://gnjo.github.io/mock3d/bg/queen.jpg
https://gnjo.github.io/mock3d/bg/shop.jpg
https://gnjo.github.io/mock3d/bg/temple.jpg
https://gnjo.github.io/mock3d/se/nggggggggggggg.ogg
https://gnjo.github.io/mock3d/bg/treasure.jpg
https://gnjo.github.io/mock3d/se/crystal1.ogg
https://gnjo.github.io/mock3d/se/crystal2.ogg
https://gnjo.github.io/mock3d/se/damage1.ogg
https://gnjo.github.io/mock3d/se/open1.ogg
https://gnjo.github.io/mock3d/se/slash1.ogg
https://gnjo.github.io/mock3d/mons/ajin1-min.png
https://gnjo.github.io/mock3d/mons/ajin1-min.png
https://gnjo.github.io/mock3d/mons/ajin2-min.png
https://gnjo.github.io/mock3d/mons/ajin3-min.png
https://gnjo.github.io/mock3d/mons/ajin4-min.png
https://gnjo.github.io/mock3d/mons/ajin5-min.png
https://gnjo.github.io/mock3d/mons/ajin6-min.png
https://gnjo.github.io/mock3d/mons/ajin7-min.png
https://gnjo.github.io/mock3d/mons/ajin8-min.png
https://gnjo.github.io/mock3d/mons/ajin9-min.png
https://gnjo.github.io/mock3d/mons/ajin10-min.png
https://gnjo.github.io/mock3d/mons/ajin11-min.png
https://gnjo.github.io/mock3d/mons/ajin12-min.png
https://gnjo.github.io/mock3d/mons/ajin13-min.png
https://gnjo.github.io/mock3d/mons/ajin14-min.png
https://gnjo.github.io/mock3d/mons/ajin15-min.png
https://gnjo.github.io/mock3d/mons/ajin16-min.png
https://gnjo.github.io/mock3d/mons/ajin17-min.png
https://gnjo.github.io/mock3d/mons/boss1-min.png
https://gnjo.github.io/mock3d/mons/boss2-min.png
https://gnjo.github.io/mock3d/mons/boss3-min.png
https://gnjo.github.io/mock3d/mons/boss4-min.png
https://gnjo.github.io/mock3d/mons/boss5-min.png
https://gnjo.github.io/mock3d/mons/boss6-min.png
https://gnjo.github.io/mock3d/mons/man1-min.png
https://gnjo.github.io/mock3d/mons/man2-min.png
https://gnjo.github.io/mock3d/mons/man3-min.png
https://gnjo.github.io/mock3d/mons/man4-min.png
https://gnjo.github.io/mock3d/mons/man5-min.png
https://gnjo.github.io/mock3d/mons/man6-min.png
https://gnjo.github.io/mock3d/mons/man7-min.png
https://gnjo.github.io/mock3d/mons/man8-min.png
https://gnjo.github.io/mock3d/mons/man9-min.png
https://gnjo.github.io/mock3d/mons/man10-min.png
https://gnjo.github.io/mock3d/mons/mob1-min.png
https://gnjo.github.io/mock3d/mons/mob2-min.png
https://gnjo.github.io/mock3d/mons/mob3-min.png
https://gnjo.github.io/mock3d/mons/mob4-min.png
https://gnjo.github.io/mock3d/mons/mob5-min.png
https://gnjo.github.io/mock3d/mons/mob6-min.png
https://gnjo.github.io/mock3d/mons/mob7-min.png
https://gnjo.github.io/mock3d/mons/mob8-min.png
https://gnjo.github.io/mock3d/mons/mob9-min.png
https://gnjo.github.io/mock3d/mons/mob10-min.png
https://gnjo.github.io/mock3d/mons/mob11-min.png
https://gnjo.github.io/mock3d/mons/mob12-min.png
https://gnjo.github.io/mock3d/mons/mob13-min.png
https://gnjo.github.io/mock3d/mons/mob14-min.png
https://gnjo.github.io/mock3d/mons/mob15-min.png
https://gnjo.github.io/mock3d/mons/mob16-min.png
https://gnjo.github.io/mock3d/mons/mob17-min.png
https://gnjo.github.io/mock3d/mons/mob18-min.png
https://gnjo.github.io/mock3d/mons/mob19-min.png
https://gnjo.github.io/mock3d/mons/woman1-min.png
https://gnjo.github.io/mock3d/mons/woman2-min.png
https://gnjo.github.io/mock3d/mons/woman3-min.png
https://gnjo.github.io/mock3d/mons/woman4-min.png
https://gnjo.github.io/mock3d/mons/woman5-min.png
END //
///////////
<<< #story1
CLR #000
IMG xxx.jpg,f
IMG rrr.png,l,0,0
CAP story1
DRW story1,700
*** 1000
DRW insp1.jpg
MES.
夜の静けさよりも、何よりも。
迷宮は暗い。
しかし、暗闇の中では更なる五感が冴え渡る。
蠢く者の気配。地上より、よりはっきりと判る。
ここは、名もなき迷宮。
END
KEY

>>> #story1
`
