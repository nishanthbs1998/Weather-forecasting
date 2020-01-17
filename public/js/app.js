console.log(`Client side JS running`)

const weatherForm=document.querySelector(`form`)
const search=document.querySelector(`input`)
const messageOne=document.querySelector(`#messageOne`)
const messageTwo=document.querySelector(`#messageTwo`)

weatherForm.addEventListener(`submit`,(e)=>{
    e.preventDefault()//To prevent page from reloading on clicking search button
    const location=search.value
    messageOne.textContent=`Loading...`
    messageTwo.textContent=``
    
    fetch(`http://localhost:3000/weather?address=`+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
            messageTwo.textContent=``
        }
        else{
            
            messageOne.textContent=data.Location
            messageTwo.textContent=`It is `+data.forecast.Summary+`with current temperature being `+ data.forecast.Temperature+` degree celcius. The probability of rain is `+ data.forecast.Probability_of_rain+`%` 
        }
        
        // console.log(data.forecast.Summary)//    Instead of specifying each object we can 
        //                                    //     just say console.log(data.forecast)
        // console.log(data.forecast.Temperature)
        // console.log(data.forecast.Probability_of_rain)
    })
})

})

