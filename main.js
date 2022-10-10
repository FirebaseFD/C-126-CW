song = "";
lristx = 0;
rristx = 0;
lristy = 0;
rristy = 0;
lristscore = 0;
rristscore = 0;
function setup(){
    canvas = createCanvas(600 ,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose',gotPoses);
}
function preload(){
    song = loadSound('pinkvenom.mp3');
}
function draw(){
    image(video,0,0,600,500);
    if(lristscore> 0.2){
        fill("#FF0000");
        stroke("#FF0000");
        circle(lristx , lristy, 20);

        InNoLRistY = Number(lristy);
        removedec = floor(InNoLRistY);
        vol = removedec/500;
        song.setVolume(vol);
        document.getElementById("volume").innerHTML = "Volume : "+vol;
    }
    if (rristscore > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(rristx , rristy, 20);

        if (rristy > 0 && rristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
            song.rate(0.5);
        }
        else if (rristy > 100 && rristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed : 1x";
            song.rate(1);
        }
        else if (rristy > 200 && rristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed : 1.5x";
            song.rate(1.5);
        }
        else if (rristy > 300 && rristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed : 2x";
            song.rate(2);
        }
        else if (rristy > 400 && rristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed : 2.5x";
            song.rate(2.5);
        }
    }    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("Model is Loaded");
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        lristx = results[0].pose.leftWrist.x;
        lristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+lristx+ " Left Wrist Y = "+lristy);
        rristx = results[0].pose.rightWrist.x;
        rristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rristx+ " Right Wrist Y = "+rristy);
        lristscore = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score : "+lristscore);
        rristscore = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score : "+rristscore);
    }
}
function stop(){
    song.stop();
}
