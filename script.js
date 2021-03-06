"use strict";

const loadContent = () => {
    const container = document.createElement("div")
    container.classList.add("container")
    document.body.appendChild(container)

    const card = document.createElement("div")
    card.classList.add("card")
    document.body.appendChild(card)

    const form = document.createElement("form")
    form.id = "form"
    const label = document.createElement("label")
    label.for = "location";
    const input = document.createElement("input")
    input.type = "text"
    input.id = "location"
    const button = document.createElement("button")
    button.innerText = "Look"

    container.appendChild(form)
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(button)
}

const renderShow = () => {
    let card = document.querySelector(".card")
    const div = document.createElement("div")
    div.classList.add("data")

    const cities = document.createElement("h2")
    cities.classList.add("city")

    const temp = document.createElement("h3")
    temp.classList.add("celcius")
    temp.classList.add("active")

    const temp2 = document.createElement("h3")
    temp2.classList.add("fahrenheit")

    const weather = document.createElement("h4")
    weather.classList.add("mainweather")

    card.appendChild(div)
    div.appendChild(cities)
    div.appendChild(temp)
    div.appendChild(temp2)
    div.appendChild(weather) 
    unitToggle()
}

const renderLocation = (city, celcius, fahrenheit, description) => {   
    document.querySelector(".city").innerText = city
    document.querySelector(".celcius").innerText = celcius + " °C"
    document.querySelector(".fahrenheit").innerText = fahrenheit + " °F"
    document.querySelector(".mainweather").innerText = description
}

const unitToggle = () => { 
    let data = document.querySelector(".data")
    data.addEventListener("click", () => {
            if (data.hasChildNodes()) {
  if (data.childNodes[1].className === "celcius active") {
        data.childNodes[2].classList.add("active")
        data.childNodes[1].classList.remove("active")
  } else if (data.childNodes[2].className === "fahrenheit active") {
    data.childNodes[1].classList.add("active")
    data.childNodes[2].classList.remove("active")
  }
}
    })
}

const toCelcius = (kelvin) => {
    let number = kelvin - 273.15
    let result = Math.trunc(number)
    return result
}

const toFahrenheit = (kelvin) => {
    let number = (kelvin * 9 / 5) - 459.67
    let result = Math.trunc(number)
    return result
}

const userInput = () => {
    let button = document.querySelector("button")
    button.addEventListener("click", (e) => {
        e.preventDefault()
        let loc = document.querySelector("input").value
        showLocation(loc)
        document.querySelector("input").value = "";
    })
}

async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function showLocation(loc) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=81353d18461f4d7562760894feb3ada0`
    let data = await fetchData(url)
    let kelvin = data.main.temp
    let celcius = toCelcius(`${kelvin}`)
    let fahrenheit = toFahrenheit(`${kelvin}`)
    let city = data.name
    let description = data.weather[0]["description"]
    renderLocation(city, celcius, fahrenheit, description)
}

async function showPosition(pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coordinates = [latitude, longitude]
    const lat = coordinates[0]
    const lon = coordinates[1]
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=81353d18461f4d7562760894feb3ada0`;
    let data = await fetchData(url);
    let kelvin = data.main.temp
    let celcius = toCelcius(`${kelvin}`)
    let fahrenheit = toFahrenheit(`${kelvin}`)
    let city = data.name
    let description = data.weather[0]["description"]
    renderLocation(city, celcius, fahrenheit, description)
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("alert")
    }
}

window.onload = loadContent()
window.onload = getLocation()
window.onload = userInput()
window.onload = renderShow()

