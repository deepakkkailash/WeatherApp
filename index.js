let submit = document.getElementById("SubmitButton");
let form = document.getElementById("inputForm");
let placeholder = document.getElementById("Form_PlaceHolder");

function createElem(){
    let div = document.createElement("div");
    div.id = "weather_content";
    div.style.position = "absolute";
    div.style.top = "20%";
    div.style.left = "20%";
    div.style.background = "black";
    div.style.color = "white";
    div.style.width = "60%";
    div.style.height = "60%";      
    div.style.padding = "40px";
    div.style.alignItems = "center";  
    div.style.borderRadius = "12px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.gap = "5px";
    return div;
}

function createGoback(){
    let goback = document.createElement("button")
    goback.id="goback_button";
    goback.innerHTML = "GO BACK!"
    goback.style.position = "absolute";
    goback.style.top = "90%";
    goback.style.left = "70%";
    goback.style.borderRadius = "12px";
    goback.style.padding = "2px";
    goback.style.background = "green";
    goback.style.color = "white";
    return goback;
}
submit.addEventListener("click", (event) => {
    event.preventDefault();
    var city = document.getElementById("inputCity");
    const apikey = `d3b204a4719212ff64d791bb8ae3a77c`;
    let radioButtons = document.getElementsByName('unit');
    for(var radio of radioButtons){
        if(radio.checked){
             var selected = radio.value;
        }
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
       
        weather_right_now = data.weather[0].main;
        var src = `images/${weather_right_now}.png`
        form.style.display = "none";
        let humidity= data.main.humidity;
        current_temp = data.main.temp;
        if(selected==="Celsius"){
            current_temp = (current_temp - 273.15).toFixed(2);
        }
        else if(selected === "Fahrenheit"){
            current_temp =((((current_temp - 273.15).toFixed(2))*9/5)+32).toFixed(2);
        }
        let div = createElem();
        div.innerHTML=`
                        <img src=${src} alt="weatherImage" style="width:20%">
                        <span style="text-align: center;"><strong>${weather_right_now}</strong></span>
                        <span><strong>Temp: ${current_temp}</strong></span>
                        <span> <strong>Humidity: ${humidity}%</strong></span>
        `;

        placeholder.append(div)
        
        let goback = createGoback();
        goback.addEventListener("click",()=>{
            goback.style.display = "none";
            if(div.style.display!="none"){
                div.style.display = "none";
            }
            if(form.style.display==="none"){
                form.style.display = "flex";
            }
        })

        placeholder.append(goback);
    })
    .catch(error => {
        form.style.display = "none";
       let div = createElem();
       div.innerHTML = "DID NOT FIND YOUR LOCATION. PLEASE SPECIFY A VALID LOCATION!"
       placeholder.append(div);
       let goback  = createGoback();
        placeholder.append(goback);
        goback.addEventListener("click",()=>{
            goback.style.display = "none";
            if(div.style.display!="none"){
                div.style.display = "none";
            }
            if(form.style.display==="none"){
                form.style.display = "flex";
            }
        })
    });
});
