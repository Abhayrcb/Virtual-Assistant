const API_KEY = "AIzaSyDccNbkbM13YTrbJS8ClU7PjHM2fqCpwvA";
const URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
// ....................................................chatbot logic

const inputField = document.querySelector("#request");
const send_btn =document.querySelector("#chatsend");




async function sendMessage() {
    const chatBox = document.querySelector(".display-box");
    const userMessage = inputField.value.trim();
    if (userMessage === "") return;
  
    // Display user message
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("right-message");
    userMessageElement.innerHTML = `You: <pre>${userMessage}</pre>` ;
    chatBox.appendChild(userMessageElement);
  
    // Generate bot response
    
    const botResponse = await getBotResponse(userMessage);
   console.log(botResponse);
   


    setTimeout(() => {
      const botMessageElement = document.createElement("div");
      botMessageElement.classList.add("left-message");
      botMessageElement.innerHTML = `Bot: <pre>${(botResponse.candidates[0].content.parts[0].text).replace("**","")}</pre> `;
      console.log(botResponse.candidates[0].content.parts[0].text);
      chatBox.appendChild(botMessageElement);
    },1000);
    // Clear input
     // Clear input
  inputField.value = "";

  // Scroll to latest message
  chatBox.scrollTop = chatBox.scrollHeight;
}




// Basic chatbot response logic
async function getBotResponse(user_message) {

       const requestOptions = {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
         "contents":[
            {"parts":[{"text":user_message}]}
         ]
        }) 
     }

      try{
          let res = await fetch(URL,requestOptions);
          let data = await res.json();
          return data;
      }
      catch(error){
        console.log(error);
      }

}

send_btn.addEventListener("click",sendMessage);

