document.addEventListener("DOMContentLoaded", () => {

let dogsArray = []
let filtering = false
const dogBar = document.getElementById("dog-bar")
const detailsArea = document.getElementById("dog-summary-container")
const filterButton = document.getElementById("good-dog-filter")

//fetch get
fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogData => {
        dogsArray = dogData
        renderAllDogs(dogsArray)
    })

function renderAllDogs(dogs){
    dogs.forEach(renderName)
}


//create dog with data
function renderName(dog){
    const doggo = document.createElement("span")
    doggo.innerText = dog.name
    doggo.dataset.id = dog.id

    dogBar.append(doggo)
}

function renderDogDeets(dog){

    const status = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    const doggoImg = document.createElement("img")
    doggoImg.src = dog.image
    const doggoHeader = document.createElement("h2")
    doggoHeader.innerText = dog.name
    const doggoButton = document.createElement("button")
    doggoButton.dataset.id = dog.id
    doggoButton.innerText = status
       
    detailsArea.append(doggoImg, doggoHeader, doggoButton)
}

dogBar.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      const dogId = parseInt(e.target.dataset.id)
      const clickDog = dogsArray.find(dog => dog.id === dogId)
      renderDogDeets(clickDog)
    }
})

detailsArea.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const dogId = parseInt(e.target.dataset.id)
        const clickDog = dogsArray.find(dog => dog.id === dogId)
        clickDog.isGoodDog = !clickDog.isGoodDog
        renderDogDeets(clickDog)
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify({ isGoodDog: clickDog.isGoodDog})
        })
    }
})

filterButton.addEventListener("click", () => {
    filtering = !filtering
    filterButton.textContent = `Filter good dogs: ${filtering ? "ON" : "OFF"}` 
    if (filtering){
        const goodDogsOnly = dogsArray.filter((dog) => dog.isGoodDog)
        dogBar.innerHTML = ""
        renderAllDogs(goodDogsOnly)
    } else {
        dogBar.innerHTML = ""
        renderAllDogs(dogsArray)
    }
})

});










