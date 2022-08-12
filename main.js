video="";
status="";
objects=[];

function preload()
{
    video=createVideo('videoplayback.mp4');
    video.hide();
}

function setup()
{
    canvas=createCanvas(400,400);
    canvas.center();
}

function draw()
{
    image(video,0,0,400,400);
    if(status!="")
    {
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Detecting Objects";
            document.getElementById("number").innerHTML="Number of objects"+objects.length;
            fill("lightsalmon");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " "+ percent+"%"+objects[i].x,objects[i].y);
            noFill();
            stroke("lavender");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results)
{
     if(error)
     {
        console.log(error);
     }
     else
     {
        console.log(results);
        objects=results;
     }
}