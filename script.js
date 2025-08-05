let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")
let logo = document.querySelector("#logo");
let logo2 = document.querySelector("#logo2");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang="hi-GB" 
    window.speechSynthesis.speak(text_speak)
}
function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good morning sir")
    }
    else if (hours>=12 && hours<16){
        speak("Good afternoon sir")
    }
    else{
        speak("Good evening sir")
    }
    // speak("i am virtual assisstant how can i help you sir")
}
// window.addEventListener('load' ,()=>{
//     wishMe() 
// })
let speechRecognition1 = window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition = new speechRecognition1()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}
btn.addEventListener("click",()=>{
    recognition.start()
    wishMe()
    btn.style.display = "none"
    voice.style.display = "block"
    logo.style.display = "none"
    logo2.style.display = "block"
})
function takeCommand(message){
    btn.style.display = "flex"
    voice.style.display = "none"
    logo.style.display = "flex"
    logo2.style.display = "none"

    if(message.includes("hello") ||message.includes("hey") ){
        speak("Hello sir  how can i help you!")
    }
    else if(message.includes("who are you") || message.includes("are you")){
        speak("I am a virtual assisstant created by Nitesh sir! and I am an AI speed 10 mega bite")
    }
    else if(message.includes("open youtube")|| message.includes("Youtube")){
        speak("Opening youtube...")
        window.open("https://www.youtube.com/" , "_blank")
    }
    else if(message.includes("open google")|| message.includes("google")){
        speak("Opening google...")
        window.open("https://www.google.com/" , "_blank")
    }
    else if(message.includes("open facebook")|| message.includes("facebook")){
        speak("Opening facebook...")
        window.open("https://www.facebook.com/" , "_blank")
    }
    else if(message.includes("open instagram")|| message.includes("instagram")){
        speak("Opening instagram...")
        window.open("https://www.instagram.com/" , "_blank")
    }
    else if(message.includes("open calculator")|| message.includes("calculator")){
        speak("Opening calculator...")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")|| message.includes("whatsapp")){
        speak("Opening whatsapp...")
        window.open("whatsapp://")
    }
    else if(message.includes("what is time")|| message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("what is date")|| message.includes("date")){
        let date11 = new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"})
        speak(date11)
    }
    else{
        let finalText = "the result i found on internet regarding" + message.replace("jarvis","") || message.replace("javis","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("jarvis","") || message.replace("javis","")}`,"_blank")
    }
}