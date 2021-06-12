 Webcam.set({
    width: 300,
    height: 350,
    image_format: 'png',
    png_quality: 90
 });

 camera = document.getElementById("camera");
 Webcam.attach('#camera');


 function take_snapshot() {
     Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri  + '"/>';
     });
 }

 console.log('ml5 version', ml5.version);

 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);


 function modelLoaded() {
    console.log('Model Loaded');
 }

 function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
 }
 function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
 }
 function gotResult( error, results) {
    if(error) {
       console.log(error);
    } else {
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name2").innerHTML = results[1].label;
       prediction_1 = results[0].label;
       prediction_2 = results[1].label;
       speak();
       if(results[0].label == "happy") {
          document.getElementById("update_emoji").innerHTML = "&#128512;";
          document.getElementById("qoute").innerHTML = "Be happy for this moment.";
       } 
       if(results[0].label == "angry") {
          document.getElementById("update_emoji").innerHTML = "&#128545;";
          document.getElementById("qoute").innerHTML = "Sometimes, you have to get angry to get things done. ";
       }
       if(results[0].label == "sad") {
          document.getElementById("update_emoji").innerHTML = "&#128532;";
          document.getElementById("qoute").innerHTML = "Good, better, best. Never let it rest. 'Til your good is better and your better is best.";
       }

       if(results[1].label == "happy") {
          document.getElementById("update_emoji2").innerHTML = "&#128512;";
          document.getElementById("qoute2").innerHTML= "Be happy for this moment.";
       }
       if(results[1].label == "angry") {
          document.getElementById("update_emoji2").innerHTML = "&#128545;";
          document.getElementById("qoute2").innerHTML = "Sometimes, you have to get angry to get things done. ";
       }
       if(results[1].label == "sad") {
          document.getElementById("update_emoji2").innerHTML = "&#128532;";
          document.getElementById("qoute2").innerHTML = "Don't be sad and don't give up on your dreams. Dreams will come true one day. There's no person as beautiful as a person who dreams";
       }
    }
 }