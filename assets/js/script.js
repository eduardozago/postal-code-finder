let form = document.querySelector("form");
let zipCode = document.querySelector(".zip-code");

let zipMask = IMask(
    zipCode, {
        mask: '00000-000'
    }
);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let code = zipCode.value.replace("-", "");
    
    if(/^[0-9]{8}$/.test(code)) {
        searchZipCode(code);
    } else {
        resultError("Invalid Zip Code");
    }
})

function searchZipCode(code) {
    let url = `https://viacep.com.br/ws/${code}/json/`;

    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            resultSuccess(result);
        })
        .catch((err) => {
            resultError("Zip code not found");
        })
}

function resultSuccess(value) {
    let result = document.querySelector(".result");
    result.innerHTML = "";

    if(value.erro === undefined) {
        result.style.display = 'block';

        result.insertAdjacentHTML(
            "beforeend",
            `<li>${value.cep}</li>`
        );

        if(value.complemento === "") {
            result.insertAdjacentHTML(
                "beforeend",
                `<li>${value.logradouro}</li>`
            );
        } else {
            result.insertAdjacentHTML(
                "beforeend",
                `<li>${value.logradouro}, ${value.complemento}</li>`
            ); 
        }

        result.insertAdjacentHTML(
            "beforeend",
            `<li>${value.localidade}, ${value.uf}</li>`
        );

        // for(let item in value) {
        //     result.insertAdjacentHTML(
        //         "beforeend",
        //         `<li>${item}: ${value[item]}</li>`
        //     );
        // }
    } else {
        resultError("Zip code not found");
    }
} 

function resultError(value) {
    let result = document.querySelector(".result");
    
    result.innerHTML = "";

    result.style.display = 'block';
    result.insertAdjacentHTML(
        "beforeend",
        `<h5 style="color: #CE2400">${value}</h5>`
    );
} 

