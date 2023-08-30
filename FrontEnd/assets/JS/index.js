
//MENU //////////////////////////////////////////
const header = document.querySelector('header')
const nav = document.createElement("nav")
const ul = document.createElement("ul")
//MENU - projets
const liProjets = document.createElement("li")
const lienProjet = document.createElement("a")
lienProjet.innerText= "projets"
lienProjet.href = ""
//MENU - contact
const liContact = document.createElement("li")
const lienContact = document.createElement('a')
lienContact.innerText = "contact"
lienContact.href = ''
//MENU - lien login
const liLogin = document.createElement("li")
const lienLogin = document.createElement("a")
lienLogin.href = ""
lienLogin.innerText="login"

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