let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let userName = "User"; // Default name
let tagline = "Ignite your ideas with spark!"; // Tagline

function speak(text) {
    console.log("Speaking:", text);  // Debugging line
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.7;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "mr-IN"; // Change this to "en-US" if needed
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    speak('First of all, Jay Shree Raam');
    if (hours >= 0 && hours < 12) {
        speak(`and Good Morning ${userName}. ${tagline}`);
    } else if (hours >= 12 && hours < 16) {
        speak(`and Good Afternoon ${userName}. ${tagline}`);
    } else {
        speak(`and Good Evening ${userName}. ${tagline}`);
    }
}

window.addEventListener("load", () => {
    setTimeout(wishMe, 2000);
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    console.log(event);
    content.innerText = "You : " + transcript;
    takeCommand(transcript);
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};

btn.addEventListener("click", () => {
    if (recognition) {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    }
});

function takeCommand(message) {
    let msg = message.toLowerCase();
    btn.style.display = "flex";

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        speak(`Hello ${userName}, how can I help you?`);
    } else if (msg.includes("who are you") || msg.includes("tell me about yourself")) {
        speak("I am a virtual assistant named Spark, created by Swaraj Sir.");
    } else if (msg.includes("who is swaraj")) {
        speak("Swaraj Sir, a second-year student from G P Pune. He is a tech enthusiast as he created me.");
    } else if (msg.includes("what can you do?")) {
        speak("I can answer your basic questions and do all the simple things that an average virtual assistant can do!");
    } else if (msg.includes("what is your name")) {
        speak("My name is Spark. What is your name?");
        recognition.start(); // Start recognition to capture user name
    } else if (msg.includes("my name is")) {
        userName = msg.replace("my name is", "").trim();
        speak(`Nice to meet you, ${userName}!`);
    } else if (msg.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (msg.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (msg.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (msg.includes("open twitter")) {
        speak("Opening Twitter...");
        window.open("https://www.twitter.com/", "_blank");
    } else if (msg.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (msg.includes("open github")) {
        speak("Opening GitHub...");
        window.open("https://www.github.com/", "_blank");
    } else if (msg.includes("open linkedin")) {
        speak("Opening LinkedIn...");
        window.open("https://www.linkedin.com/", "_blank");
    } else if (msg.includes("open youtube channel of swaraj")) {
        speak("Opening YouTube Channel of Swaraj named Techh Spark...");
        window.open("https://www.youtube.com/@Techh-Spark", "_blank");
    } else if (msg.includes("open github account of swaraj")) {
        speak("Opening GitHub Account of Swaraj...");
        window.open("https://github.com/SwarajMohite", "_blank");
    } else if (msg.includes("open linkedin account of swaraj")) {
        speak("Opening LinkedIn Account of Swaraj...");
        window.open("https://www.linkedin.com/in/swaraj-mohite-04050731a/", "_blank");
    } else if (msg.includes("open instagram account of swaraj") || msg.includes("open twitter account of swaraj")) {
        speak("Sorry! Swaraj is not on the mentioned media...");
    } else if (msg.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    } else if (msg.includes("open word")) {
        speak("Opening Microsoft Word...");
        window.open("word://");
    } else if (msg.includes("open")) {
        let text = msg.replace("open", "").trim();
        speak("Opening...");
        window.open(`${text}://`);
    } else if (msg.includes("tell me a joke")) {
        let jokes = [
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I told my computer I needed a break, and now it won’t stop sending me to the beach!",
            "Why don’t scientists trust atoms? Because they make up everything!"
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    } 
    
    else if (msg.includes("okay") || msg.includes("nice") || msg.includes("good")) {
        speak("Glad to hear that! How can I assist you further?");
    } else if (msg.includes("bye") || msg.includes("quit") || msg.includes("exit")) {
        speak("Goodbye! Have a great day!");
        recognition.stop(); // Stop recognition if quitting
        // Optionally, you can hide the button or redirect the user
        content.innerText = "Good Bye!";
        voice.style.display = "none";
    }
    
    
    else if (msg.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The current time is ${time}.`);
    } else {
        let text = msg.replace("spark", "").trim();
        speak(`This is what I found on the internet regarding ${text}.`);
        window.open(`https://www.google.com/search?q=${text}`, "_blank");
    }
}
