//weather app
const weatherForm=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="e52f4400a7c60fc75dd25942a8e9781a";


weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityInput.value;

    if(city){
        try{
            const weatherData=await getweatherdata(city);
            displayweatherinfo(weatherData);
        }
        catch(error){
            console.error();
            displayError("please enter the city");
        }
    }
    else{
        displayError("please enter the city");
    }

});
async function getweatherdata(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response= await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    return await response.json();
}
function displayweatherinfo(data)
{
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;


        card.textContent="";
        card.style.display="flex";

        const citydisplay=document.createElement("h1");
        const tempdisplay=document.createElement("p");
        const humiditydisplay=document.createElement("p");
        const descdisplay=document.createElement("p");
        const weatherEmoji=document.createElement("p");


        citydisplay.textContent=city;
        tempdisplay.textcontent=`${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
        humiditydisplay.textContent=`Humidity: ${humidity}%`;
        descdisplay.textContent=description;
        weatherEmoji.textContent=getweatherEmoji(id);


        citydisplay.classList.add("citydisplay");
        tempdisplay.classList.add("tempdisplay");
        humiditydisplay.classList.add("humiditydisplay");
        descdisplay.classList.add("descdisplay");
        weatherEmoji.classList.add("weatherEmoji");


    card.appendchild("citydisplay");
    card.appendchild("tempdisplay");
    card.appendchild("humiditydisplay");
    card.appendchild("descdisplay");
    card.appendchild("weatherEmoji");
        
    }
    function getweatherEmoji(weatherId)
    {
        switch(true){
            case (weatherId>=200  && weatherId<300):
                return "🌧";
            case (weatherId>=300  && weatherId<400):
                return "🌧";
            case (weatherId>=500  && weatherId<600):
                return "🌧";
            case (weatherId>=600  && weatherId<700):
                return "❄";
            case (weatherId>=700  && weatherId<800):
                return "🎐";
            case (weatherId>=801 && weatherId<810):
                return "☁";
            case (weatherId===800 ):
                return "🌞";
            default:
                return "❓";
        }
    }



    
    function displayError(message){
        const errorDisplay=document.createElement("p");
        errorDisplay.textContent=message;
        errorDisplay.classList.add("errorDisplay");
        card.textContent="";
        card.style.display="flex";
        
        
        card.appendChild(errorDisplay);
        
    }

        
    
    

            
        