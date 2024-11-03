let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let userName = "User"; // Default name
let tagline = "Ignite your ideas with spark!"; // Tagline

let maleVoice; // Variable to hold the male voice

function populateVoiceList() {
    let voices = window.speechSynthesis.getVoices();
    voices.forEach((voice) => {
        if (voice.name.toLowerCase().includes("male")) {
            maleVoice = voice; // Store the male voice
        }
    });
}

// Call this function to log voices after the voices are loaded
window.speechSynthesis.onvoiceschanged = populateVoiceList;

function speak(text) {
    console.log("Speaking:", text);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.7;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; // Change as needed

    // Use the stored male voice if available
    if (maleVoice) {
        text_speak.voice = maleVoice;
    }

    text_speak.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
    };

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    speak('Greetings ! and');
    if (hours >= 0 && hours < 12) {
        speak(`Good Morning ${userName}. ${tagline}`);
    } else if (hours >= 12 && hours < 16) {
        speak(`Good Afternoon ${userName}. ${tagline}`);
    } else {
        speak(`Good Evening ${userName}. ${tagline}`);
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
    content.innerText = "You: " + transcript;
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
    } else if (msg.includes("what can you do") || msg.includes("what are your abilities") || msg.includes("capabilities")) {
        speak("I can answer your basic questions and perform simple tasks as a virtual assistant.");
    } else if (msg.includes("what is your name") || msg.includes("your name")) {
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
    } else if (msg.includes("open word") || msg.includes("open microsoft word")) {
        speak("Opening Microsoft Word...");
        window.open("word://");
    } else if (msg.includes("open")) {
        let text = msg.replace("open", "").trim();
        speak("Opening...");
        window.open(`${text}://`);
    } else if (msg.includes("tell me a joke") || msg.includes("make me laugh")) {
        let jokes = [
            "Why did the chicken cross the road? To get to the other side!",
            "What do you call a bear with no teeth? A gummy bear!",
            "Why don’t scientists trust atoms? Because they make up everything!",
            "Why did the bicycle fall over? Because it was two-tired!",
            "What do you call fake spaghetti? An impasta!",
            "Why can't you give Elsa a balloon? Because she will let it go!",
            "How does a penguin build its house? Igloos it together!",
            "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
            "What do you call cheese that isn't yours? Nacho cheese!",
            "Why did the math book look sad? Because it had too many problems!",
            "What did one wall say to the other wall? I'll meet you at the corner!",
            "Why was the broom late? It swept in!",
            "Why don't skeletons fight each other? They don't have the guts!",
            "What did the zero say to the eight? Nice belt!",
            "Why was the computer cold? It left its Windows open!"
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    } else if (msg.includes("okay") || msg.includes("nice") || msg.includes("good") || msg.includes("great")) {
        speak("Glad to hear that! How can I assist you further?");
    } else if (msg.includes("bye") || msg.includes("quit") || msg.includes("exit") || msg.includes("see you")) {
        speak("Goodbye! Have a great day!");
        recognition.stop(); // Stop recognition if quitting
        content.innerText = "Good Bye!";
        voice.style.display = "none";
    } else if (msg.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The current time is ${time}.`);
    } else if (msg.includes("play")) {
        let text = msg.replace("play", "").trim();
        speak(`This is what I found on YouTube regarding ${text}.`);
        window.open(`https://www.youtube.com/results?search_query=${text}`, "_blank");
    } else if (msg.includes("help") || msg.includes("commands")) {
        speak("Here are some commands you can use: " +
              "Say 'hello', 'who are you', 'what can you do', 'open youtube', 'tell me a joke', " +
              "'time', or 'play' followed by a topic. " +
              "You can also say 'bye' to exit.");
    } else {
        let text = msg.replace("spark", "").trim();
        speak(`This is what I found on the internet regarding ${text}.`);
        window.open(`https://www.google.com/search?q=${text}`, "_blank");
    }
}
