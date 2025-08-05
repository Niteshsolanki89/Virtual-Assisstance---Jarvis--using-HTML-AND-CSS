let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let logo = document.querySelector("#logo");
let logo2 = document.querySelector("#logo2");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good evening sir");
    }
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    recognition.start();  // Restart recognition automatically
};

recognition.onerror = (e) => {
    console.error("Speech Recognition Error:", e);
    recognition.start();  // Restart on error
};

btn.addEventListener("click", () => {
    recognition.start();
    wishMe();
    btn.style.display = "none";
    voice.style.display = "block";
    logo.style.display = "none";
    logo2.style.display = "block";
});

function takeCommand(message) {
    // btn.style.display = "flex";
    // voice.style.display = "none";
    // logo.style.display = "flex";
    // logo2.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, how can I help you!");
    } else if (message.includes("who are you") || message.includes("are you")) {
        speak("I am a virtual assistant created by Nitesh sir! and I am an AI with the speed of 10 megabytes.");
    } 
    else if (message.includes("youtube")) {
        let query = message.replace("youtube", "").replace("search", "").trim();
        if (query.length === 0) {
            speak("Opening YouTube...");
            window.open("https://www.youtube.com/", "_blank");
        }
        else {
            speak(`Searching YouTube for ${query}`);
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        }
    }
    else if (message.includes("open google") || message.includes("google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook") || message.includes("facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram") || message.includes("instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator") || message.includes("calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp") || message.includes("whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("what is time") || message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("what is date") || message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak("Today's date is " + date);
    } else {
        let finalText = "Here's what I found on the internet regarding " + message.replace("jarvis", "").replace("javis", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("jarvis", "").replace("javis", "")}`, "_blank");
    }
}
