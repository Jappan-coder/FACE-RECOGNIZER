Webcam.set({
    width: 350,
    height: 300,
    image_format : 'png',
    png_quality : 90,
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6aGh_x1JA/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model is loaded");
}
function check(){
    image=document.getElementById("captured_image") ;
    classifier.classify(image, gotresult);
}
function gotresult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_person_name").innerHTML=results[0].label;
        document.getElementById("result_person_accuracy").innerHTML=results[0].confidence.toFixed(3)*100+"%";
    }

}