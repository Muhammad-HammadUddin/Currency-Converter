const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdown = document.querySelectorAll('.dropdown select');
const button = document.querySelector('.button');
const fromCurr = document.querySelector('.from');
const toCurr = document.querySelector('.to');
const msg = document.querySelector('.msg');

for (let drop of dropdown) {
    for (const code in countryList) {
        let option = document.createElement('option');
        option.innerHTML = code;
        option.value = code;
        
        if (drop.name === "from" && code === "USD") {
            option.selected = "selected";
        }
        if (drop.name === "to" && code === "INR") {
            option.selected = "selected";
        }
        
        drop.appendChild(option);
    }
    
    drop.addEventListener("change", function(e) {
        updateFlag(e.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

button.addEventListener("click", function(e) {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", function(e) {
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${baseURL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        
        let finalAmount = amtVal * rate;
        
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${toCurr.value}`;
    } catch (error) {
        console.error('Error fetching data:', error);
        msg.innerText = 'Error fetching data. Please try again later.';
    }
};
