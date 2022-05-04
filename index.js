const canvas=new fabric.Canvas('canvas',{
    width:1350,
    height:620,
    backgroundColor:'grey',    
});


const inpt=document.getElementById('myimg');
const reader=new FileReader();
inpt.addEventListener('change',(e)=>{
    const file=inpt.files[0];
    reader.readAsDataURL(file);
   
});

reader.addEventListener('load',()=>{
    fabric.Image.fromURL(reader.result,(img)=>{
        canvas.add(img.set({
          hasControls: false,
          lockRotation:true,
          lockMovement: true,lockMovementY: true,lockMovementX: true,
          lockUniScaling: true,lockScalingY:true, lockScalingX:true,
          scaleX: 0.5,
          scaleY: 0.5 
        }));
        canvas.centerObject(img);
     
        canvas.requestRenderAll();
    })
})
canvas.on('mouse:wheel',(opt)=>{
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    const vpt =canvas.viewportTransform;
if (zoom < 800/2000) {
  vpt[4] = 400 - 2000 * zoom;
  vpt[5] = 400 - 2000 * zoom;
} else {
  if(vpt[4] >= 0) {
    vpt[4] = 0;
  } else if (vpt[4] < canvas.getWidth() - 2000 * zoom) {
    vpt[4] = canvas.getWidth() - 2000 * zoom;
  }
  if (vpt[5] >= 0) {
    vpt[5] = 0;
  } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
    vpt[5] = canvas.getHeight() - 1000 * zoom;
  }
}
  
});
canvas.renderALL();

