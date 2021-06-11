let nickname = prompt("Podaj nick")
let color = ""
function randColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  color = "#" + randomColor;
}
randColor()
async function poll() {

    var res = await fetch("/poll")
    var message = await res.text()
    document.querySelector("#messages .scroll-content").innerHTML += `${message} <br>`
    $('.scroll-content').emoticonize();
    poll()
}
function message() {
  var wiad = document.getElementById('input').value
  switch (wiad){
    case "/color":
      randColor();
      fetch( "/message",{
        method:"POST",
        body: "Użytkownik "+nickname+" zmienił kolor nicku",
      });
      break;
    case "/nick":
      previousNickname=nickname;
      nickname = prompt("Podaj ponownie nick");
      fetch( "/message",{
        method:"POST",
        body: "Użytkownik "+previousNickname+" zmienił Nick na " + nickname,});
      break;
    case "/quit":
      window.location.reload();
      fetch( "/message",{
        method:"POST",
        body: "Użytkownik "+nickname+" opuścił chat.",
      });
      break;
    default:
      fetch("/message", {
        method: "POST",
        body: "<span>"+"["+ new Date().toLocaleTimeString() + "]"+"</span><span style='color: " + color + "'>" + nickname + "</span><span> " + wiad + "</span> <br>",
      });
      break;

  }
  
}
poll();