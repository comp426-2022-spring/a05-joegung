
// Focus div based on nav button click
function focusHome() {
    document.getElementById("home").setAttribute("class", "");
    document.getElementById("single").setAttribute("class","hidden");
    document.getElementById("multi").setAttribute("class","hidden");
    document.getElementById("guess").setAttribute("class","hidden");
}

function focusSingleNav() {
    document.getElementById("single").setAttribute("class","");
    document.getElementById("home").setAttribute("class", "hidden");
    document.getElementById("multi").setAttribute("class","hidden");
    document.getElementById("guess").setAttribute("class","hidden");
}

function focusMultiNav() {
    document.getElementById("multi").setAttribute("class","");
    document.getElementById("home").setAttribute("class", "hidden");
    document.getElementById("single").setAttribute("class","hidden");
    document.getElementById("guess").setAttribute("class","hidden");
}

function focusGuessNav() {
    document.getElementById("guess").setAttribute("class", "");
    document.getElementById("home").setAttribute("class", "hidden");
    document.getElementById("single").setAttribute("class","hidden");
    document.getElementById("multi").setAttribute("class","hidden");
}
// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch("app/flip/", {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        document.getElementById("result").innerHTML = result.flip;
        document.getElementById("quarter").setAttribute("src", "./assets/img/"+ result.flip + ".png");
    })
}
// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
const coins = document.getElementById("coins");
coins.addEventListener("submit", flipCoins);

async function flipCoins(event) {
    event.preventDefault();

    const endpoint = "app/flip/coins/";
    const url = document.baseURI+endpoint;
    const formEvent = event.currentTarget;
    
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData});
        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.tails;
    } catch (error) {
        console.log(error);
    }
}

async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    }

    const response = await fetch(url, options);
    return response.json();
}

// Guess a flip by clicking either heads or tails button
function guessHeads() {
    fetch("app/flip/", {mode : 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        document.getElementById("guessResult").innerHTML = (result.flip == "heads" ? "It was heads. You guessed correctly!": "It was tails. You guessed incorrectly.");
        document.getElementById("quarterActual").setAttribute("src", "./assets/img/" + result.flip + ".png");
    })
}

function guessTails() {
    fetch("app/flip/", {mode : 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        document.getElementById("guessResult").innerHTML = (result.flip == "tails" ? "It was tails. You guessed correctly!": "It was heads. You guessed incorrectly.");
        document.getElementById("quarterActual").setAttribute("src", "./assets/img/" + result.flip + ".png");
    })
}
