const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
// API nyckel att använda ifall man enbart siktar på godkänt: solaris-vKkkQHqQboi7c6JF
let bodies = document.querySelector('.bodies');
let planets = document.querySelectorAll('.planet');
let bodyInfo = document.querySelector('.body-info');


async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    
    const data = await response.json();
    return data.key;
    
}

let planetData;

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        method: 'GET',
        headers: {
            'x-zocom': key
        }
    });
    planetData = await response.json();
    console.log(planetData);

}

getPlanets();


let selectedPlanetIndex = -1;
function clickEvent(i)
{ //Anropar alla mina variabler 
    let desc = document.getElementById('planetDesc');
    let circumference = document.getElementById('planetCircumference');
    let distance = document.getElementById('distance');
    let maxTemp = document.getElementById('maxTemp');
    let minTemp = document.getElementById('minTemp');
    let moons = document.getElementById('moons');
    let sun = document.getElementById('sun');
    let name = document.getElementById('name');
    let latinName = document.getElementById('latinName');

    //När man klickar någon av planeterna så ska den skifta färg från gul sol till blå
    if(selectedPlanetIndex == i) {
        bodyInfo.style.display='none';
        sun.style.backgroundColor = '#FFD029';
        selectedPlanetIndex = -1;
    } else {
        bodyInfo.style.display='block';
        sun.style.backgroundColor = '#428ED4';
        selectedPlanetIndex = i;
    }

    //Alla innerHTML
    desc.innerHTML = planetData.bodies[i].desc;
    circumference.innerHTML = planetData.bodies[i].circumference + ' km';
    distance.innerHTML = planetData.bodies[i].distance + ' km';
    maxTemp.innerHTML = planetData.bodies[i].temp.day + ' C';
    minTemp.innerHTML = planetData.bodies[i].temp.night + ' C';
    moons.innerHTML = planetData.bodies[i].moons;
    name.innerHTML = planetData.bodies[i].name;
    latinName.innerHTML = planetData.bodies[i].latinName;
}

//Click funktion för varje klick(planet) man klickar
for(let i = 0; i < planets.length; i++){
    planets[i].addEventListener('click', function() {
        clickEvent(i);
    });
}




