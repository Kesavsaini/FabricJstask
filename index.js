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
        img.scaleToWidth(400);
        img.scaleToHeight(400);
        canvas.add(img.set({
        }));
     
        canvas.requestRenderAll();
    })
})
canvas.on('mouse:wheel',(opt)=>{
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    const vpt =canvas.viewportTransform;
if (zoom < 400 / 1000) {
  vpt[4] = 200 - 1000 * zoom / 2;
  vpt[5] = 200 - 1000 * zoom / 2;
} else {
  if(vpt[4] >= 0) {
    vpt[4] = 0;
  } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
    vpt[4] = canvas.getWidth() - 1000 * zoom;
  }
  if (vpt[5] >= 0) {
    vpt[5] = 0;
  } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
    vpt[5] = canvas.getHeight() - 1000 * zoom;
  }
}

  
});
canvas.renderALL();

