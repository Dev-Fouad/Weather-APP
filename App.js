let key = 'LKTNMJ5YjbvG9z2tKW1MMvLh4qX49LRg';

// get weather information
let getWeather = async (id) => {

    let base = 'http://dataservice.accuweather.com/currentconditions/v1/{locationKey}'
    let query = `${id}?apikey=${key}`

    let response = await fetch(base + query)
    let data = await response.json()
    return data
} 

// Get city information
let getcity = async (city) => {

    let base = 'http://dataservice.accuweather.com/locations/v1/cities/search' 
    let query = `?apikey=${key}&q=${city}`;

    let response = await fetch(base + query)
    let data = await response.json()

    return data[0]
}




let cityform = document.querySelector('form')
let card = document.querySelector('.card')
let details = document.querySelector('.details')
let time = document.querySelector('times')
let updateUI = async (data) => {
    let {citydets , weather} = data

    // Update details template
    details.innerHTML = `
        <h5 class="my-3">${citydets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `

    // Remove the d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

let updatecity = async (city) => {

    let citydets = await getcity(city)
    let weather = await getWeather(citydets.key) 

    return{
        citydets: citydets,
        weather: weather
    }
}


cityform.addEventListener('submit' , e => {
    // Prevent from default
    e.preventDefault()

    // get city value
    let city = cityform.city.value.trim()
    cityform.reset()

    // update UI WITH NEW CITY
    updatecity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err))
})
