const urlApiLogin = "http://localhost:5678/api/users/login"



//MENU //////////////////////////////////////////
const header = document.querySelector('header')
const nav = document.createElement("nav")
const ul = document.createElement("ul")

//MENU - projets
const liProjets = document.createElement("li")
const lienProjet = document.createElement("a")
lienProjet.innerText= "projets"
lienProjet.href = "http://127.0.0.1:5500/FrontEnd/index.html"

//MENU - contact
const liContact = document.createElement("li")
const lienContact = document.createElement('a')
lienContact.innerText = "contact"
lienContact.href = ''

//MENU - lien login
const liLogin = document.createElement("li")
const lienLogin = document.createElement("a")
lienLogin.href = "http://127.0.0.1:5500/FrontEnd/Login.html"
lienLogin.innerText="login"
lienLogin.style.fontWeight='bold'

//MENU - insta
const liInsta = document.createElement("li")
const lienInsta = document.createElement("a")
lienInsta.href=''
const ImgInsta = document.createElement("img")
ImgInsta.src= "./assets/icons/instagram.png"
lienInsta.alt = "Instagram"

//MENU - parenting
header.appendChild(nav)
nav.appendChild(ul)
ul.appendChild(liProjets)
liProjets.appendChild(lienProjet)
ul.appendChild(liContact)
liContact.appendChild(lienContact)
ul.appendChild(liLogin)
liLogin.appendChild(lienLogin)
ul.appendChild(liInsta)
liInsta.appendChild(lienInsta)
lienInsta.appendChild(ImgInsta)


//LOGIN /////////////////////////////////////////
const baliseEmail = document.querySelector("#email")
const balisePassword = document.querySelector('#userPassword')

//LOGIN - Fonction pour se connecter
async function loginFunction(email, password){
    const requetePost = await fetch(urlApiLogin, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
             Accept: "application/json",
        },
        body : JSON.stringify({email, password}),
    })
    const retourPost = await requetePost.json
    console.log(requetePost.status)
    if(requetePost.status === 404){
        alert('user not found')
    }
    
    
}

//LOGIN - Bouton submit
const loginForm = document.querySelector('#form')
// const email = baliseEmail.value
// const password = balisePassword.value
const email = 'ssophie.bluel@test.tld'
const password = 'S0pdhie'

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    loginFunction(email, password)
      })