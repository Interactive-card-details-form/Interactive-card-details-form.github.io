//seleccion de inputs text
const cardName = document.querySelector(".card-name");
const cardNumber = document.querySelector(".card-number");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const cvc = document.querySelector(".cvc");

//seleccion descripcion de tarjeta
const p1Front = document.querySelector(".p1-front");
const nameInput = document.querySelector(".p2-front");
const p3Front = document.querySelector(".p3-front");
const monthInput = document.querySelector(".p-month");
const yearInput = document.querySelector(".p-year");
const cvcInput = document.querySelector(".p-cvc");

//seleccion de errores
const errorNumber = document.querySelector(".number");
const errorName = document.querySelector(".name");
const errorMonth = document.querySelector(".m");
const errorYear = document.querySelector(".y");
const errorCvc = document.querySelector(".c");

//seleccion de boton y containers
const confirm = document.querySelector(".confirm");
const form = document.querySelector(".form");
const formContainer = document.querySelector(".form-container");

window.addEventListener("load", () => {
    confirmValidation();
})
//validadores
let cardNameStatus = false,
    cardNumberStatus = false,
    monthStatus = false,
    yearStatus = false,
    cvcStatus = false;

//carga dinamica Card Name
let active = true;
cardName.addEventListener("input", e => {
    let inputValue = e.target.value;
    nameInput.textContent = cardName.value;
    spaceValidation(cardName, inputValue, active);
    let regExp = /[0-9]/g;
    if (regExp.test(cardName.value)) {
        errorName.textContent = "Wrong format, letters only";
        cardNameStatus = false
        active = true;
    }
    else if (cardName.value != "" && cardName.value.length < 3) {
        errorName.textContent = "min 3 letters";
        cardNameStatus = false;
        active = true;
    } 
    else {
        errorName.textContent = "";
        cardNameStatus = true;
        active = false;
    }
    if (cardName.value == "") {
        nameInput.textContent = "Jane Appleseed";
        cardNameStatus = false;
        active = true;
    }
    console.log("Status cardName: " + cardNameStatus);
    confirmValidation();
});

//Carga dinamica de Card Number
cardNumber.addEventListener("input", e => {
    p1Front.textContent = cardNumber.value;
    let regExp = /[A-z]/g;
    let inputValue = e.target.value;
    if (regExp.test(cardNumber.value)) {
        errorNumber.textContent = "Wrong format, numbers only";
        cardNumberStatus = false
    } else if (cardNumber.value != "" && cardNumber.value.length < 19) {
        errorNumber.textContent = "min 16 numbers";
        cardNumberStatus = false;
    } else {
        errorNumber.textContent = "";
        cardNumberStatus = true;
    }
    if (regExp.test(cardNumber.value) == false) {
        cardNumber.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
    }
    if (cardNumber.value == "") {
        p1Front.textContent = "0000 0000 0000 0000";
        cardNumberStatus = false;
    }
    console.log("status cardnumber: " + cardNumberStatus)
    confirmValidation();
});

//carga dinamica month
month.addEventListener("input", e => {
    let inputValue = e.target.value;
    month.value = inputValue.replace(/\s/g, '')
    monthInput.textContent = month.value;
    let regExp = /[A-z]/g;
    if (regExp.test(month.value)) {
        errorMonth.textContent = "Numbers Only";
        monthStatus = false;
    } else if (month.value != "" && month.value.length < 2) {
        errorMonth.textContent = "min 2 numbers";
        monthStatus = false;
    } else if (parseInt(month.value) > 12 || parseInt(month.value) < 1) {
        errorMonth.textContent = "Wrong Month";
        monthStatus = false;
    } else {
        errorMonth.textContent = "";
        monthStatus = true;
    }
    if (month.value == "") {
        monthInput.textContent = "00";
        monthStatus = false;
    }
    console.log("MonthStatus: " + monthStatus);
    confirmValidation();
})

//carga dinamica year
year.addEventListener("input", e => {
    let inputValue = e.target.value;
    year.value = inputValue.replace(/\s/g, '')
    yearInput.textContent = year.value;
    let regExp = /[A-z]/g;
    if (regExp.test(year.value)) {
        errorYear.textContent = "Numbers Only";
        yearStatus = false;
    } else if (year.value != "" && year.value.length < 2) {
        errorYear.textContent = "min 2 numbers";
        yearStatus = false;
    } else if (parseInt(year.value) > 30 || parseInt(year.value) < 23) {
        errorYear.textContent = "Wrong Year";
        yearStatus = false;
    } else {
        errorYear.textContent = "";
        yearStatus = true;
    }
    if (year.value == "") {
        yearInput.textContent = "00";
        yearStatus = false
    }
    console.log("Yearstatus: " + yearStatus);
    confirmValidation();
})

//carga dinamica cvc
cvc.addEventListener("input", e => {
    let inputValue = e.target.value;
    cvc.value = inputValue.replace(/\s/g, '')
    cvcInput.textContent = cvc.value;
    let regExp = /[A-z]/g;
    if (regExp.test(cvc.value)) {
        errorCvc.textContent = "Numbers Only";
        cvcStatus = false;
    } else if (cvc.value != "" && cvc.value.length < 3) {
        errorCvc.textContent = "min 3 numbers";
        cvcStatus = false
    } else {
        errorCvc.textContent = "";
        cvcStatus = true
    }
    if (cvc.value == "") {
        cvcInput.textContent = "000";
        cvcStatus = false
    }
    console.log("cvcStatus: " + cvcStatus);
    confirmValidation();
})

//Validador de espacio en blanco input cardName
const spaceValidation = (name, e, active) => {
    if (active) name.value = e.replace(/\s/g, '')
}

//funcion Input Vacios 
const validationBlank = (type, error) => {
    if (type.value == "") error.textContent = "can't be blank";
    else error.textContent = "";
}

//validacion Input Vacios
cardName.addEventListener("blur", () => {
    if (cardName.value == "") validationBlank(cardName, errorName);
})

cardNumber.addEventListener("blur", () => {
    if (cardNumber.value == "") validationBlank(cardNumber, errorNumber);
})

month.addEventListener("blur", () => {
    if (month.value == "") validationBlank(month, errorMonth);
})

year.addEventListener("blur", () => {
    if (year.value == "") validationBlank(year, errorYear);
})

cvc.addEventListener("blur", () => {
    if (cvc.value == "") validationBlank(cvc, errorCvc);
})

//Validacion de boton confirmar
const confirmValidation = () => {
    if (cardNameStatus && cardNumberStatus && monthStatus && yearStatus && cvcStatus) {
        confirm.removeAttribute("disabled");
        confirm.setAttribute("enabled", "");
        confirm.classList.remove("confirmDis");
        confirm.classList.add("confirm");
    } else {
        confirm.setAttribute("disabled", "");
        confirm.classList.remove("confirm");
        confirm.classList.add("confirmDis");
    }
}

//funcion boton confirm
confirm.addEventListener("click", e => {
    e.preventDefault();
    formContainer.style.display = "none";
    btnConfirm();
})

//Creando elementos de confirmacion
const btnConfirm = () =>{
    const div = document.createElement("DIV");
        const img = document.createElement("IMG");
        const h1 = document.createElement("H1");
        const h3 = document.createElement("H3");
        const button = document.createElement("INPUT");
        button.setAttribute("type", "submit");
        button.value = "Continue";
        h1.textContent = "THANK YOU!";
        h3.textContent = "We've added your card details";
        img.src = "images/icon-complete.svg";
        div.classList.add("confirm-card");
        img.classList.add("svg");
        button.classList.add("continue");
        h3.classList.add("gray");
        div.appendChild(img);
        div.appendChild(h1)
        div.appendChild(h3)
        div.appendChild(button)
        form.appendChild(div);
}