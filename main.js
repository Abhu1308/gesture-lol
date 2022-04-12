Webcam.set({
    height:400,
    width:400,
    image_format:"png",
    png_quality:100
});
Webcam.attach("#pic");

function snapshot() {
     Webcam.snap(function(data_uri){
         document.getElementById("Snp").innerHTML="<img id='i_1' src='"+data_uri+"'/>";        
     });
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WY6UyNzO-/model.json",modelLoaded);
function modelLoaded() {
    console.log("model loaded successfuly!")
}

function check() {
    img = document.getElementById("i_1")
    classifier.classify(img, gotResults)
}

function gotResults(error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
        document.getElementById("p1-name").innerHTML = result[0].label
        document.getElementById("p2-name").innerHTML = result[1].label

        pred_1 = result[0].label
        pred_2 = result[1].label
         speak()
        if (pred_1 == "Victory") {
            document.getElementById("p1-emoji").innerHTML = "&#9996;"
        }
        if (pred_1 == "Superb") {
            document.getElementById("p1-emoji").innerHTML = "&#128076;"
        }
        if (pred_1 == "All the best") {
            document.getElementById("p1-emoji").innerHTML = "&#128077;"
        }
        if (pred_2 == "Victory") {
            document.getElementById("p2-emoji").innerHTML = "&#9996;"
        }
        if (pred_2 == "Superb") {
            document.getElementById("p2-emoji").innerHTML = "&#128076;"
        }
        if (pred_2 == "All the best") {
            document.getElementById("p2-emoji").innerHTML = "&#128077;"
        }

    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1="The first prediction is"+pred_1;
    speak_data2="The second prediction is"+pred_2;
    var s = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(s);
}