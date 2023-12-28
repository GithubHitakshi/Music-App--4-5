rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
leftWrist_Score = "";
rightWrist_Score = "";


function setup(){
    canvas = createCanvas(350,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350,300);
    video.hide();
    posenet = ml5.poseNet(video, modalLoaded);
    posenet.on("pose", getResults);

    
}

function draw(){
    image(video,0,0,350,300);
    fill("red");
    stroke("black");
    if (leftWrist_Score>0.2){
         circle(leftWrist_x, leftWrist_y,50);
        if(song1.isPlaying()==false){
            song2.stop();
            song1.play();
           document.getElementById("status").innerHTML = "Song 1 is playing";

        }
       
    }
    if (rightWrist_Score>0.2){
        circle(rightWrist_x, rightWrist_y,50);
        if(song2.isPlaying()==false){
            song1.stop();
            song2.play();
            document.getElementById("status").innerHTML = "Song 2 is playing";

        }
    }
}

function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}

function modalLoaded(){
    console.log("Modal Loaded");
}

function getResults(results){
    if (results.length>0){
        console.log(results);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        leftWrist_Score = results[0].pose.keypoints[9].score;
        rightWrist_Score = results[0].pose.keypoints[10].score;
    }

}
