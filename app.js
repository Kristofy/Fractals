
let currentFunction="dashboard";
let dashboard;
let selection = document.querySelectorAll("nav.nav ul li");
let imgw, imgh;
let x = 0;
let isFirst;

selection.forEach(element =>{
  element.addEventListener('click', (e)=>{
    selection.forEach(elem => elem.classList.remove("active"));
    element.classList.add("active");
    currentFunction = element.id;
    functions[currentFunction].setup();
  })

})

let functions = {
  "dashboard":{
    setup: ()=>{},
    draw: ()=>{image(dashboard, 0, 0, width, height)}
  },
  "S-triangle":{
    setup: ()=>{ x = 1;},
    draw: ()=>{
      const maximum = 7;
      const segment = width/maximum;
      if(mouseX >=0 && mouseX < width && mouseY >= 0 && mouseY < height)
        x = floor(mouseX/segment)+1;
      background(201);
      stroke(0)
      push();
      translate(0, (height - sqrt(3)/2*width)/2);
      let n = x;
      function f(depth, width, height, nextx=0, nexty=0){
        fill(0, (depth/n)*255)
        let ax = 0, ay=  height, bx = width, by = height, cx = width/2, cy = height-sqrt(3)/2*width;
        if(depth >= n) return;
        push();
        
        translate(nextx, nexty);
        beginShape()
        vertex(ax, ay);
        vertex(bx, by);
        vertex(cx, cy);
        endShape(CLOSE);
        f(depth+1, width/2, height/2, 0, height-sqrt(3)/2*(width/2));
        f(depth+1, width/2, height/2, width/2, height-sqrt(3)/2*(width/2));
        f(depth+1, width/2, height/2, width/4, 0);
        pop();
      }
      f(0, width, sqrt(3)/2*width);
      pop();
    }
  },
  "S-szonyeg-3":{
    setup: ()=>{ x = 1;},
    draw: ()=>{
      const maximum = 7;
      const segment = width/maximum;
      if(mouseX >=0 && mouseX < width && mouseY >= 0 && mouseY < height)
        x = floor(mouseX/segment)+1;
      background(201);
      stroke(0)
      push();
      translate(10, 10);
      let n = x;
      function f(depth, width, height, nextx=0, nexty=0){
        fill(0, (depth/n)*255)
        let ax = 0, ay=  height, bx = width, by = height, cx = width, cy = 0, dx = 0, dy = 0;
        if(depth >= n) return;
        push();
        
        translate(nextx, nexty);
        beginShape()
        vertex(ax, ay);
        vertex(bx, by);
        vertex(cx, cy);
        vertex(dx, dy);
        endShape(CLOSE);
        f(depth+1, width/2, height/2, 0, height/2);
        f(depth+1, width/2, height/2, width/2, height/2);
        f(depth+1, width/2, height/2, width/2, 0);
        pop();
      }
      f(0, width - 20, height -20);
      pop();
    }
  },
  "S-szonyeg-9":{
    setup: ()=>{ x = 1;},
    draw: ()=>{
      const maximum = 5;
      const segment = width/maximum;
      isFirst = false;
      if(mouseX >=0 && mouseX < width && mouseY >= 0 && mouseY < height){
        isFirst = x != floor(mouseX/segment)+1; 
        x = floor(mouseX/segment)+1;
      }
      if(isFirst){
        background(201);
        stroke(0)
        push();
        translate(10, 10);
        let n = x;
        function f(depth, width, height, nextx=0, nexty=0){
          fill(0, (depth/n)*255)
          let ax = 0, ay=  height, bx = width, by = height, cx = width, cy = 0, dx = 0, dy = 0;
          if(depth >= n) return;
          push();
          
          translate(nextx, nexty);
          beginShape()
          vertex(ax, ay);
          vertex(bx, by);
          vertex(cx, cy);
          vertex(dx, dy);
          endShape(CLOSE);
          for(let i = 0; i <= 2; i++){
            for(let j = 0; j <= 2; j++){
              if(i != 1 || j != 1){
                f(depth+1, width/3, height/3, i*(width/3), j*(height/3))
              }
            }
          }
          pop();
        }
        f(0, width - 20, height -20);
        pop();
      }
    }
  }
  
};

function preload(){
  dashboard = loadImage("dashboard.jpg");
}

function setup(){
  let C = createCanvas(400, 400);
  C.parent('parent');
}

function draw(){
  functions[currentFunction].draw();
}

