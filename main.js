sound = " ";
 status = " ";
 objects = " ";

 function preload(){
     sound = loadSound('wake_up_alarm.mp3');
 }
function setup(){
    
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380,380);
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model is Loaded!");
    status = true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error, results ){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw(){
    image(video, 0,0,380,380);
    if(status  != "" ){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResults);

        for( i = 0; i<objects.length; i++){
            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby  detected";
                sound.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby is not detected";
                sound.play();
            }
            document.getElementById("status").innerHTML = " Status - Object Detected";
           
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100 );
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(object.length != 0){
        document.getElementById("number_of_objects").innerHTML = "Baby not detected";
        sound.play();
    }
    
}

