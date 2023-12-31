//MENU //////////////////////////////////////////
const header = document.querySelector('header')
const nav = document.createElement("nav")
const ul = document.createElement("ul")

//MENU - button projets
const liProjets = document.createElement("li")
const lienProjet = document.createElement("a")
lienProjet.innerText= "projets"
lienProjet.href = "http://127.0.0.1:5500/FrontEnd/index.html"

//MENU - button contact
const liContact = document.createElement("li")
const lienContact = document.createElement('a')
lienContact.innerText = "contact"
lienContact.href = ''

//MENU - button login
const liLogin = document.createElement("li")
const lienLogin = document.createElement("a")
lienLogin.href = "http://127.0.0.1:5500/FrontEnd/Login.html"
lienLogin.innerText="login"

//MENU - button insta
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

//PORTFOLIO///////////////////////////////////////////////
//PORTFOLIO - Title
const portfolio = document.querySelector('#portfolio')

const projetsTitreContainer = document.createElement('div')
projetsTitreContainer.setAttribute('id', "titres_container")

const mesProjetsTitre = document.createElement('h2')
mesProjetsTitre.setAttribute('id','mes-projets-titre')
mesProjetsTitre.innerText='Mes Projets'

portfolio.appendChild(projetsTitreContainer)
projetsTitreContainer.appendChild(mesProjetsTitre)

// FILTERS ////////////////////////////////////////////
// FILTERS - API call
const requeteCategories = await fetch('http://localhost:5678/api/categories')
const categories = await requeteCategories.json()


// FILTRES - container and button "tous"
const divFiltres = document.createElement('div')
divFiltres.classList.add('filtres-container')

const buttonTous = document.createElement('button')
buttonTous.setAttribute('id','filtres-btn-tous')
buttonTous.innerText='Tous'
divFiltres.appendChild(buttonTous)

buttonTous.addEventListener("click", function(){     //Event listener button "tous"
    document.querySelector(".gallery").innerHTML = '';
    genererTravaux(travaux) // Galery dynamic update
    })

// FILTRES - button creation with a loop for each categories
for( let i=0; i < categories.length;i++){
    const button = document.createElement('button')
    button.setAttribute('id',categories[i].name)
    button.innerText= categories[i].name

    button.addEventListener("click", function(){  //Event listener
        const travauxFiltres = travaux.filter(function(travaux){ //Function sorting the projects
        return travaux.categoryId === categories[i].id
        })
    document.querySelector(".gallery").innerHTML = '';
    genererTravaux(travauxFiltres)// Galery dynamic update
    })

    divFiltres.appendChild(button)
}

// FILTRES - parenting
portfolio.appendChild(divFiltres)


//GALLERY ////////////////////////////////////////////
//GALLERY -  API call
const requeteTravaux = await fetch("http://localhost:5678/api/works")
const travaux = await requeteTravaux.json()

//GALLERY - DOM creation
const gallery = document.createElement("div")
gallery.classList.add('gallery')
portfolio.appendChild(gallery)

//GALLERY - function to create the projects
function genererTravaux(travaux){
    try{
        for(let i=0; i<travaux.length; i++){
                const figure = document.createElement("figure")
                const imageTravaux = document.createElement("img")
                const titresTravaux = document.createElement("figcaption")

                imageTravaux.src = travaux[i].imageUrl
                imageTravaux.setAttribute("alt",travaux[i].title)
                titresTravaux.innerText = travaux[i].title
                figure.setAttribute('id','travaux[i].id')

                gallery.appendChild(figure)
                figure.appendChild(imageTravaux)
                figure.appendChild(titresTravaux)
            }
        }
    catch(error){
        console.log(error)
    }
}


genererTravaux(travaux)



