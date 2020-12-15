Webcam.set({
    width: 360,
    heigth: 250,
    image_format: 'png',
    png_quality: 100 
});


var camera = document.getElementById("webcam");

Webcam.attach(camera);

function take_image() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '" />';
    });
}

console.log("Ml5 Version: " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7IfpxSpYs/model.json", modelLoaded); 

function modelLoaded() {
    console.log('Model Loaded');
}

function check() {
    var image = document.getElementById('captured_image');
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('result_objectName').innerHTML = results[0].label;
        document.getElementById('result_objectAccuracy').innerHTML = results[0].confidence.toFixed(3);
    }
}
