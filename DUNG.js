/*
head 
 script(src="https://gnjo.github.io/EXP/EXP.coded.js?vv=r031")
 script(src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js")
 script(src="https://gnjo.github.io/hud/gameCanvas.js?v=0")
 script(src="https://gnjo.github.io/hud/Mover.js?v=5")
 script(src="https://gnjo.github.io/hud/Mesher.js?v=12")
 script(src="https://gnjo.github.io/hud/FloorMaker.js?v=12")
 script(src="https://gnjo.github.io/EXP/DUNG.js?v=r001")
*/

////////////////////////////////////
var scene
,renderer
,camera
,light
,loader
,grid
,mover
,boxsize=10
,abort=0
,ww=16*40,hh=9*40
,V3=THREE.Vector3
,mover
//,mm=new Mesher(boxsize)
,npc
,floors=[]
,floorsobj=[]
,mock3d
,canvas3d
,canvas2d
,p2
,ctx2d
,update2d
;


function init(){
 ///////////////////////////////////
 scene = new THREE.Scene();
 //scene.fog = new THREE.Fog(0x00ff00, 100,100*2);//
 //console.log(canvas3d)
 canvas3d=canvas3d||gameCanvas(ww,hh)
 let canvas=canvas3d
 renderer = new THREE.WebGLRenderer({antialias: true,canvas:canvas});
 renderer.setClearColor(0x000000,1)
 //renderer.setSize(ww,hh)
 renderer.setPixelRatio(1);
 canvas2d=canvas2d||canvas.cloneNode()
 p2=plane2d(renderer,canvas2d) //2d canvas
 ctx2d=p2.ctx2d,update2d=p2.update2d
 //45ぐらいが人間だが、背後から見ている方が酔いにくい。よって75。
 camera = new THREE.PerspectiveCamera( 75,ww/hh, 1, boxsize*4 );
 //0xddeeff //暗闇において、生体視野は、赤の減衰が多い、緑は中間、青は減衰しにくい。
 light = new THREE.SpotLight( 0xddeeff,1.0,boxsize*3,4);
 //light.near=0.1
 scene.add( light );

 /*
 npc=new THREE.Mesh(
  new THREE.PlaneBufferGeometry(boxsize*0.7,boxsize*0.7,16,16)
  ,new THREE.MeshPhongMaterial({map: void 0,visible:true,transparent:true,side:THREE.DoubleSide
                               }) )//Lambert
 
 npc.visible=false
 scene.add(npc)
 */

 ///////////////////////////////////
 mover=new Mover(boxsize,new V3(0))
 mover.wait=100;
 mover.split=32;

 mover.mover.visible=false;
 mover.add(camera,new V3(0,-0.1,-boxsize*0.49))
 //mover.add(light,new V3(0,boxsize*0.1,-boxsize*0.49))
 //天井にライトを当てることはない。上から床に。
 mover.add(light,new V3(0,boxsize*0.3,-boxsize*0.49))
 //mover.add(npc,new V3(0,-boxsize*(0.3/2),boxsize*0.2 )) //npc
 ;
 scene.add(mover.mover)
 scene.add(mover.grid)
 mover.grid.visible=false

 mover.movecheck=function(ch,o){
  // console.log(o.getp())
  return true;//move ok// if dont move, return false
 }

}

function animate(){
 if(abort)return;
 requestAnimationFrame(animate)
  ,renderer.clear(),renderer.render(scene, camera),update()
}
//function update(){}
function update(){
 try{
  //scene.fog.near=count2*100
  //role the icon
  roleicon()
  mover.chase()
  p2.update2d()
  //smokes.update()

 }catch(e){abort=1,console.error(e)}
}

function roleicon(){
 let a=scene.children.filter(d=>/^F/.test(d.name)).map(d=>d.children)
 if(a.length===0)return 
 a.pop().filter(d=>d.name==='icon').map(d=>d.rotation.y+=0.075) 
}

/////////2d world ////////////////////
function plane2d(renderer,_canvas){

 renderer.autoClear = false;////////////////

 let width=renderer.domElement.width
 ,height=renderer.domElement.height
 ,camera
 ,scene
 ,ctx
 ,canvas
 ;
 //console.log(width,height)

 canvas=_canvas||document.createElement('canvas')
 canvas.width=width,canvas.height=height
 ctx=canvas.getContext('2d')
 // Create the camera and set the viewport to match the screen dimensions.
 camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 3 );
 scene = new THREE.Scene();

 // Create texture from rendered graphics.
 var tex = new THREE.Texture(canvas) 
 tex.needsUpdate = true;
 tex.minFilter =THREE.NearestFilter;

 // Create HUD material.
 var material = new THREE.MeshBasicMaterial( {map: tex} );
 material.transparent = true;

 // Create plane to render the HUD. This plane fill the whole screen.
 var planeGeometry = new THREE.PlaneBufferGeometry( width, height );
 var plane = new THREE.Mesh( planeGeometry, material );
 scene.add( plane );

 function update2d(){
  tex.needsUpdate = true;    
  renderer.render(scene, camera);  
 }
 return {ctx2d:ctx,update2d:update2d}
}
///////////////////////////////////////


//loader=new THREE.TextureLoader()
///////////////////////////////////
//order control target over the 100
var order={}
order.lightOn=order.lighton=()=>{light.intensity=1.0;light.visible=true}
order.lightSmall=order.lightsmall=()=>{light.intensity=0.5;light.visible=true}
order.lightOff=order.lightoff=()=>{light.visible=false}
order.islightSmall=order.islightsmall=()=>{return light.intensity===0.5}
order.iconOn=order.iconon=()=>{ 
 let a=scene.children.filter(d=>/^F/.test(d.name)).map(d=>d.children)
 if(a.length===0)return 
 let children=a.pop()
 children.filter(d=>d.name==='icon').map(d=>d.visible=true)
}
order.iconOff=order.iconoff=()=>{
 let a=scene.children.filter(d=>/^F/.test(d.name)).map(d=>d.children)
 if(a.length===0)return 
 let children=a.pop()
 children.filter(d=>d.name==='icon').map(d=>d.visible=false)
}
order.npcOn=order.npcon=(url,n,size)=>{
 order.lightsmall();
 if(!url)return npc.visible=true
 npc.material.map =tex(url,n,size),npc.material.needsUpdate=true
 npc.visible=true;
}
order.npcOff=order.npcoff=()=>{
 npc.visible=false;
 order.lighton();
}
order.enterFloor=order.enterfloor=(num)=>{
 num=num||'F00'
 //let floors=mock3d.floors
 let s=(/^F/.test(num))?num: 'F'+('00'+num).slice(-2)
 ;
 if(scene.children.filter(d=>d.name===s).length)return;
 //console.log(s);
 floors.map(d=>{
  return (d.name===s)?d:scene.remove(d),d  
 }).map(d=>{if(d.name===s)scene.add(d) })
}

order.getaddr=order.getAddr=()=>{
 let p=mover.getp(),v=mover.getv()
 return 'F'+('00'+p.f).slice(-2)
  +'X'+('00'+p.x).slice(-2)
  +'Y'+('00'+p.y).slice(-2)
  +'.'+v
}
order.getminimap=order.getMinimap=(num,footflg)=>{
 num=num||'F00'
 let fo=floorsobj
 let s=(/^F/.test(num))?num: 'F'+('00'+num).slice(-2)
 ;
 if(!fo.filter(d=>d.name===s).length)return;
 let obj=fo.filter(d=>d.name===s).pop()
 //console.log(obj);

 return (footflg)?obj.footmap:obj.fullmap
}
;

/////////////////////////////////
function DUNG(){
 //run only
  init()
  mover.keyevent=false // 
  animate()
}
