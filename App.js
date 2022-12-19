let key = 'LKTNMJ5YjbvG9z2tKW1MMvLh4qX49LRg';

// get weather information
let getWeather = async (id) => {

    let base = 'http://dataservice.accuweather.com/currentconditions/v1/{locationKey}'
    let query = `${id}?apikey=${key}`
} 

// Get city information
let getcity = async (city) => {

    let base = 'http://dataservice.accuweather.com/locations/v1/cities/search' 
    let query = `?apikey=${key}&q=${city}`;

    let response = await fetch(base + query)
    let data = await response.json()

    return data[0]
}

getcity('lagos')
    .then((data) => console.log(data))
    .catch((err) => console.log(er))