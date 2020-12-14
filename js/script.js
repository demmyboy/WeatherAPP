const search = document.getElementById('search')
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const form = document.getElementById('form')
const main = document.getElementById('main')



async function getCityTemp() {
    try {
        const city = search.value
        const res = await axios.get(`${API_URL}${city}&appid=13515bb020bd78b28c20e336ca557eac`)
        createCityCard(res.data)
            //console.log(res.data)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('City Not Found')
                //console.log(err)
        }
    }
}

function createCityCard(city) {
    const cardHTML = `
    <div class="cards">
        <div class="weather-info">
            <div id="city" class="mb-3">
                <h3><span>CITY : </span> ${city.name} </h3>
            </div>
            <div id="country" class="mb-3">
                <h3><span>COUNTRY : </span> ${city.sys.country} </h3>
            </div>
            <div id="temperature" class="mb-3">
                <h3><span>TEMP : </span> ${Math.round(kelvinToCelcius(city.main.temp))}
                    <sup>0</sup>C
                </h3>
            </div>
        </div>
    </div>
    
    `
    main.innerHTML = cardHTML
}

function kelvinToCelcius(kelvin) {
    const celcius = kelvin - 273.15
    return celcius
}

function createErrorCard(message) {
    const cardHTML = `
    <div class="cards">
        <h2>${message}</h2>
    </div>`

    main.innerHTML = cardHTML

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchcity = search.value
    if (searchcity) {
        getCityTemp()
        search.value = ''
    }
})

getCityTemp()