let voiceBox = document.querySelector(".voiceBox");
let microPhone = document.querySelector(".microPhone");

const speakFunct = (input) => {
  let speakInput = new SpeechSynthesisUtterance(input);
  speakInput.rate = 1;
  speakInput.pitch = 1;
  speakInput.volume = 1;
  speakInput.lang = "en-IN";
  window.speechSynthesis.speak(speakInput);
};

window.onload = () => {
  greetingFun();
};

const greetingFun = () => {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 0 && hour < 12) {
    speakFunct("Goodmorning Buddy, How can I help You!");
  } else if (hour >= 12 && hour <= 16) {
    speakFunct("Goodafternoon Buddy, How can I help You!");
  } else {
    speakFunct("Goodevening Buddy, How can I help You!");
  }
};

let startVoiceInput = () => {
  if ("webkitSpeechRecognition" in window) {
    let recognize = new webkitSpeechRecognition();
    recognize.lang = "en_US";
    recognize.onresult = (e) => {
      let inputVoice = e.results[0][0].transcript;
      handleCommand(inputVoice.toLowerCase());
      console.log(inputVoice);
      microPhone.classList.remove("microPhoneClick");
      microPhone.innerHTML =
        '<i class="fa-solid fa-microphone-lines-slash"></i>';
    };
    recognize.start();
  } else {
    alert("Your windows doesn't support Voice assistant");
  }
};

microPhone.addEventListener("click", () => {
  microPhone.classList.add("microPhoneClick");
  microPhone.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
  startVoiceInput();
});

const handleCommand = (command) => {
  if (command.includes("hi") || command.includes("hello")) {
    speakFunct("Hello Buddi, How can I help You !");
  } else if (
    command.includes("who are you") ||
    command.includes("created you") ||
    command.includes("developed you")
  ) {
    speakFunct("I am a virtual Assistant, developed by Vinay Dhondi.");
  } else if (command.includes("tell me time") || command.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speakFunct(time);
  } else if (command.includes("tell me date") || command.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    speakFunct(date);
  } else if (command.includes("google") || command.includes("open google")) {
    speakFunct("Opening...Google");
    window.open("https://www.google.com/");
  } else if (command.includes("chat gpt") || command.includes("gpt")) {
    speakFunct("Opening... Chat gpt");
    window.open("https://chatgpt.com/");
  } else {
    speakFunct(`Here’s what I found on the internet regarding...${command}`);
    window.open(`https://www.google.com/search?q=${command}`);
  }
};
