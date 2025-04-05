//  //elements
// const { exec } = require("child_process");

const start_audio = document.querySelector("#btn");
const listing = document.querySelector("#listen-gif");
const text = document.querySelector("#text");
const speak = document.querySelector("#speak");
const main = document.querySelector(".main");
const chat_bot =document.querySelector(".chat-bot");
const url ="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit&type=single";
let transcript;



async function getjoke(){
   // alert("hello");
   try{
         let data = await fetch(url);
         let original_data = await data.json();
         text.innerHTML=original_data.joke;
         readOut(original_data.joke);
   }
   catch(err){
         console.log(err);
   }
}



//speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Set recognition properties
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;


const takeCommand = async (message)=>{
    console.log(typeof message);
     if(message.includes("hii")||message.includes("hello")||message.includes("hey")){
       text.innerHTML="hello sir, how can i help you...";
       readOut("hello sir, how can i help you");
     }
     else if(message.includes("open what's up")||message.includes("open whatsapp")){
      text.innerHTML ="Opening Whatsapp sir...";
      readOut("opening Whatsapp sir");
      window.location.href="https://web.whatsapp.com/";
     }
     else if(message.includes("who develops you?")||message.includes("who you?")){
        text.innerHTML="Sir, I'm developed by BCA student";
        readOut("Sir, I'm developed by BCA student");
     }
     else if(message.includes("open chatbot")||message.includes("chatbot open")||message.includes("open chat bot")||message.includes("open chat board")||message.includes("open the chat bot")||message.includes("open the chat board")||message.includes("open your personal chat board")){


        if(chat_bot.style.display == "block"){
            text.innerHTML="Your chatbot is already opend....";
            readOut("your chatbot is alraedy opened");
            chat_bot.style.display = "block";
        }
        else{
            text.innerHTML="opening chatbot....";
            await readOut("opening chatbot..");
            setTimeout(()=>{
            main.style.width ="50%";
            chat_bot.style.display = "block";
            },2000);
        }
     }
     else if(message.includes("close chatbot")||message.includes("chatbot close")||message.includes("close chat bot")||message.includes("close chat board")||message.includes("close the chat bot")||message.includes("close the chat board")){
        if(chat_bot.style.display == "block"){
           
            text.innerHTML="closing chatbot....";
            await readOut("closing chatbot..");
            setTimeout(()=>{
            main.style.width ="100%";
            chat_bot.style.display = "none";
            },2000);
        }
        else{
          text.innerHTML="Your chatbot is already closed";
          readOut("your chat bot is already closed....");
          start_audio.style.display ="flex";
        }
     }
     else if(message.includes("what is your name")||message.includes("what's your name?")||message.includes("your name")||message.includes("who are you?")||message.includes("tell me about yourself")||message.includes("yurself")||message.includes("introduce yourself")){
        text.innerHTML="I'm jarvish your advance virtual assistant";
        readOut("I'm jarvish your advance virtual assistant");
     }
     else if(message.includes("can you have any feelings?")||message.includes("can you have any feeling?")||message.includes("you have any feeling")){
          text.innerHTML ="No sir, I'm virtual assistant i don't have any feelings...";
          readOut("No sir, I'm virtual assistant i don't have any feelings...");
     }
     else if(message.includes("open youtube")||message.includes("youtube")){
       text.innerHTML ="Opening youtube sir...";
       readOut("opening youtube sir");
       window.location.href="https://www.youtube.com/";
     }
     else if (message.includes("wish me")||message.includes("wishme")||message.includes("wis me")||message.includes("wisme")||message.includes("with me")){
        wishMe();
     }
     else if(message.includes("can you able to open social media?")||message.includes("you able to open social media")||message.includes("you able to open social media")){
        text.innerHTML="Yes sir I'm able to open social media page but not the account...";
        readOut("Yes sir I'm able to open social media page but not the account");
     }
     else if(message.includes("open facebook")||message.includes("facebook")){
        text.innerHTML ="Opening facebook sir...";
        readOut("opening facebook sir");
        window.location.href="https://www.facebook.com/";
     }
     else if(message.includes("open instagram")||message.includes("instagram")){
        text.innerHTML ="Opening instagrame sir...";
        readOut("opening instagram sir");
        window.location.href="https://www.instagram.com/";
     }
     else if(message.includes("open chatgpt")||message.includes("open chat gpt")){
        text.innerHTML="opening chatgpt..."
        await readOut("opening chat gpt sir");
        window.location.href="https://openai.com/";
     }
     else if(message.includes("open google")||message.includes("google")){
        text.innerHTML ="Opening google sir...";
        readOut("opening google sir");
        window.location.href="https://www.google.com/";
     }
     else if(message.includes("who")||message.includes("what")||message.includes("where")||message.includes("search for")){
         text.innerHTML="Searching your result on google..";
         readOut("searching your result...");
         window.location.href=`https://www.google.com/search?q=${message.replace("search for","")}`;
     }
     else if(message.includes("wikipidia")||message.includes("open wikipidia")||message.includes("wikipedia")||message.includes("open wekipedia")){
      text.innerHTML="Opening wikipedia...";
      readOut("Opening wikipedia sir");
      window.location.href=`https://www.wikipedia.org/`;
     }
     else if(message.includes("sorry")||message.includes("sorry jarvish")){
        text.innerHTML="Ok, but i am just a virtual assistant you don't need to apolozies";
        readOut("ok, but i am just a virtual assistant you don't need to apolozies");
     }
     else if(message.includes("tell me a joke")||message.includes("joke")){
        let joke = getjoke();
     }
     else if(message.includes("Open calculator")||message.includes("calculator")){
      text.innerHTML="Opening calculator sir...";
      readOut("Opening calculator sir")
      window.location.href="https://www.desmos.com/scientific"
     }
     else{
        text.innerHTML="sorry sir,I think i am not hear or may be i not able for your response";
        readOut("sorry sir,i think i am not hear or may be i not able for your response");
     }
}

let message;
//...................................................jarvis microphone
recognition.onstart = function(){
    text.innerHTML="Listning Sir...";
    listing.style.display ="block";
 };
recognition.onresult = function (event) {
    transcript = event.results[0][0].transcript;
    message=transcript.toLowerCase(); 
    takeCommand(message);
    listing.style.display ="none";
};


recognition.onend = function(){
    // start_audio.style.display ="flex";
    listing.style.display ="none";
    console.log("vr deactiveted");
    console.log(message);
    if(message == undefined){
      text.innerHTML="I'm shipra your advance virtual assistant";
      start_audio.style.display ="flex";
    }
}
 start_audio.addEventListener("click",() =>{
    start_audio.style.display ="none";
    recognition.start();
 });

//............................................... these is for jarvis voice/speaker 
 async function readOut(message){
    start_audio.style.display ="none";
    speak.style.display="block";
    const speech = new SpeechSynthesisUtterance();
    speech.text=message;
    speech.volume=1;
    // different voice
    const allvoices=speechSynthesis.getVoices();
    speech.voice=allvoices[5];
    window.speechSynthesis.speak(speech);
    speech.onstart =()=>{
        
    }
    speech.onend =()=>{
        text.innerHTML="I'm shipra your advance virtual assistant"
        off();
    }
 }

 function off(){
    start_audio.style.display ="flex";
    speak.style.display="none";
}
 //..............................................whenever browser load it wish you something
function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>0 && hour<12){
        text.innerHTML="Good Morning sir, how can i help you...";
        readOut("Good Morning sir, how can i help you");
    }
    else if(hour>=12 && hour<17){
        text.innerHTML="Good Afternoon sir, how can i help you...";
        readOut("Good Afternoon sir,  how can i help you");
    }
    else{
        text.innerHTML="Good Evening sir, how can i help you...";
        readOut("Good Evening sir,  how can i help you");
    }
}


