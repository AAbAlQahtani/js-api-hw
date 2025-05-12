//register
let registerForm = document.getElementById("registerForm")
if (registerForm) {
    let username = document.getElementById("username")
    let password = document.getElementById("password")

    let usernameError = document.getElementById("usernameError")
    let passwordError = document.getElementById("passwordError")

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault()

        let valid = true

        if (username.value.trim().length <= 4) {
            usernameError.classList.remove("d-none")
            valid = false
        } else {
            usernameError.classList.add("d-none")
        }

        if (password.value.length <= 3) {
            passwordError.classList.remove("d-none")
            valid = false
        } else {
            passwordError.classList.add("d-none")
        }

        if (valid) {
            localStorage.setItem("username", username.value.trim())
            localStorage.setItem("password", password.value)
            localStorage.setItem("isLoggedIn", "true")
            window.location.href = "index.html"
        }
    })
}

// login 
let loginForm = document.getElementById("loginForm")
if (loginForm) {
    let error = document.getElementById("errorMessage")

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()

        let username = document.getElementById("username").value.trim()
        let password = document.getElementById("password").value

        let savedUsername = localStorage.getItem("username")
        let savedPassword = localStorage.getItem("password")

        if (username === savedUsername && password === savedPassword) {
            localStorage.setItem("isLoggedIn", "true")
            error.classList.add("d-none")
            window.location.href = "index.html"
        } else {
            error.classList.remove("d-none")
        }
    })
}

// index
let username = localStorage.getItem("username")
let isLoggedIn = localStorage.getItem("isLoggedIn")

if (isLoggedIn == "null" || username == "null") {
    window.location.href = "login.html"
    console.log(username)
    console.log(isLoggedIn)
} else {
    let nameElement = document.getElementById("username")
    if (nameElement) {
        nameElement.innerText = username
        loadProducts()
    }
}

async function loadProducts() {

    let response = await fetch("https://fakestoreapi.com/products")
    let data = await response.json()
    let container = document.getElementById("products")

    data.forEach(p => {
        let col = document.createElement("div")
        col.className = "col-md-4 col-6 mb-4";

        let card = document.createElement("div")
        card.className = "card h-100 shadow-sm"

        let img = document.createElement("img")
        img.src = p.image;
        img.alt = p.title;
        img.className = "card-img-top p-3"

        let cardBody = document.createElement("div")

        let title = document.createElement("h5")
        title.textContent = p.title

        let price = document.createElement("p")
        price.className = "fw-bold text-success"
        price.textContent = `السعر: $${p.price}`

        cardBody.appendChild(title)
        cardBody.appendChild(price)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        container.appendChild(col)
    });
}


function logout() {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    window.location.href = "login.html"
}
