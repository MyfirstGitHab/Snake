let canvas =document.getElementById('c1');
let ctx = canvas.getContext('2d');
let SCORE=document.querySelector('.score');
let RECORD=document.querySelector('.record');

const up=document.querySelector('.up');
const left=document.querySelector('.left');
const down=document.querySelector('.down');
const right=document.querySelector('.right');
let x;
let y;
let dir;
let btnDir=1;
let snake =[];
let head=[];
let food;
let score=0;
let record=0;
function init(){
    dir=1;
    btnDir=1;
    snake =[[10,10]];
    // snake =[[200,200],[200,210],[200,220],[200,230],[200,240],[200,250],[200,260],[200,260],[200,270]];
    head=[];
};
food =[Math.floor(Math.random()*19),Math.floor(Math.random()*19)];
console.log(food);


function farmFood(){
    food=[Math.floor(Math.random()*19),Math.floor(Math.random()*19)];
    const damage = snake.map((e,i,array)=>{
        if (e[0]==food[0] && e[1]==food[1]){
            farmFood();
        };
    });
}


init();


function Run(){
    dir=btnDir;
    ctx.clearRect(0,0,200,200);
    ctx.fillStyle='green';
    ctx.fillRect(food[0]*10,food[1]*10,10,10);

    let xH=snake[0][0];
    let yH=snake[0][1];
    
    switch (dir){
        case 1: yH-=1;break;
        case 2: xH+=1;break;
        case 3: yH+=1;break;
        case 4: xH-=1;break;
    }
    
    head=[xH,yH];

    if(head[0]==-1){
        head[0]=19;
    }
    if(head[0]==20){
        head[0]=0;
    }

    if(head[1]==-1){
        head[1]=19;
    }
    if(head[1]==20){
        head[1]=0;
    }
    const damage = snake.map((e,i,array)=>{
        if (e[0]==head[0] && e[1]==head[1]){
            console.log('Stop');
            if (score>=record){
                record=score;
            }
            score=0;

            // clearInterval(timerId);
            init();
            Run();
        }
    });
    
    snake.unshift(head);
    if (food[0]==head[0] && food[1]==head[1]){
        score++;
        farmFood();
    } else {
        snake.pop();
    };
    

    const kordinat = snake.map((e,i,array)=>{
        x=e[0];
        y=e[1];
        ctx.fillStyle= i== 0 ? 'red' : 'brown';
        ctx.fillRect(x*10,y*10,10,10);
    });
    console.log(head);
    console.log(SCORE);
    SCORE.textContent=`Score: ${score}`;
    RECORD.textContent=`Record: ${record}`;
}

up.addEventListener('click',()=>{
    if(dir!==3){
        btnDir=1;
    }
});
left.addEventListener('click',()=>{
    if(dir!==2){
        btnDir=4;
    }
});
down.addEventListener('click',()=>{
    if(dir!==1){
        btnDir=3;
    }
});

right.addEventListener('click',()=>{
    if(dir!==4){
        btnDir=2;
    }
});


document.addEventListener("keydown", event => {
    if (event.key=="w" || event.key=="ArrowUp" && dir!==3){
        btnDir=1;
        console.log(111);
    }
    if (event.key=="d" || event.key=="ArrowRight" && dir!==4){
        btnDir=2;
        console.log(222);
    }
    if (event.key=="s" || event.key=="ArrowDown" && dir!==1){
        btnDir=3;
        console.log(333);
    } 
    if (event.key=="a" || event.key=="ArrowLeft" && dir!==2){
        btnDir=4;
        console.log(444);
    }
    console.log(btnDir)
});

let timerId=setInterval(Run,200);




// ctx.beginPath();
// ctx.strokeStyle="red";
// ctx.moveTo(0,0);
// ctx.quadraticCurveTo(200,200,400,0);
// ctx.stroke();

// ctx.beginPath();
// ctx.strokeStyle="black";
// ctx.moveTo(400,0);
// ctx.lineTo(200,200);
// ctx.lineTo(0,0);
// ctx.stroke();

// canvas.addEventListener('mousemove',(e)=>{
//     let x=e.offsetX;
//     let y=e.offsetY;
//     console.log(x)
//     ctx.clearRect(0,0,400,200);
//     ctx.beginPath();
//     ctx.moveTo(100,100);
//     ctx.quadraticCurveTo(x,y,200,100);
//     ctx.stroke();


// });