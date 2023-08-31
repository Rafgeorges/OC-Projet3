//MENU //////////////////////////////////////////
const header = document.querySelector('header')
const nav = document.createElement("nav")
const ul = document.createElement("ul")

//MENU - projets
const liProjets = document.createElement("li")
const lienProjet = document.createElement("a")
lienProjet.innerText= "projets"
lienProjet.href = "http://127.0.0.1:5500/FrontEnd/indexLoggedin.html"

//MENU - contact
const liContact = document.createElement("li")
const lienContact = document.createElement('a')
lienContact.innerText = "contact"
lienContact.href = ''

//MENU - lien logout
const liLogin = document.createElement("li")
const lienLogin = document.createElement("a")
lienLogin.href = "http://127.0.0.1:5500/FrontEnd/index.html"
lienLogin.innerText="logout"

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

//STORAGE - TEMP
console.log(localStorage)

//PORTFOLIO  /////////////////////////////////////////////////////////////////
const portfolio = document.querySelector('#portfolio')

//PORTFOLIO - Creation des éléments, du titre MES projets et du bouton ouverture
const folioTitreContainer = document.createElement('div')
folioTitreContainer.classList.add('folio-titre-container')
//PORTFOLIO - Titre MES PROJETS 
const mesProjetsTitre = document.createElement('h2')
mesProjetsTitre.setAttribute('id','mes-projets-titre')
mesProjetsTitre.innerText='Mes Projets'

//PORTFOLIO - Bouton ouverte modale
const lienModale = document.createElement('a')
lienModale.href="#Modale"
lienModale.classList.add('js-modal')
const iconLienModale = document.createElement('i')
iconLienModale.classList.add('fa-regular','fa-pen-to-square', 'modifier-icon')

//PORTFOLIO - Parenting
portfolio.appendChild(folioTitreContainer)
folioTitreContainer.appendChild(mesProjetsTitre)
folioTitreContainer.appendChild(lienModale)

//MODALE ///////////////////////////////////////////////////////////////////
//MODALE - Création des éléments - ASIDE
const baliseModale = document.createElement('aside')
baliseModale.setAttribute("id", "Modale")
baliseModale.classList.add('modal')
baliseModale.setAttribute('aria-hidden','true')
baliseModale.setAttribute('role', 'dialog')
baliseModale.setAttribute('aria-modal', 'false')
baliseModale.setAttribute('style','display:none' )


// FILTERS ////////////////////////////////////////////
// FILTERS - Appel de l'API
const requeteCategories = await fetch('http://localhost:5678/api/categories')
const categories = await requeteCategories.json()

// FILTRES - création de la balise, et du bouton "tous"
const divFiltres = document.createElement('div')
divFiltres.classList.add('filtres-container')

const buttonTous = document.createElement('button')
buttonTous.setAttribute('id','filtres-btn-tous')
buttonTous.innerText='Tous'
divFiltres.appendChild(buttonTous)

buttonTous.addEventListener("click", function(){ //Ajout event listener bouton TOUS
    document.querySelector(".gallery").innerHTML = '';
    genererTravaux(travaux)
    })

// FILTRES - boucle de création des boutons pour chaque catégories après le "tous"
for(let i=0; i < categories.length;i++){
    const button = document.createElement('button')
    button.setAttribute('id',categories[i].name)
    button.innerText= categories[i].name

    button.addEventListener("click", function(){ //Ajout d'un event listener
        const travauxFiltres = travaux.filter(function(travaux){
        return travaux.categoryId === categories[i].id
        })
    document.querySelector(".gallery").innerHTML = ''; //Reset du html
    genererTravaux(travauxFiltres)
    })
    divFiltres.appendChild(button)
}

// FILTRES - parenting
portfolio.appendChild(divFiltres)


























//GALLERY ////////////////////////////////////////////
//GALLERY -  Appel de l'API
const requeteTravaux = await fetch("http://localhost:5678/api/works")
const travaux = await requeteTravaux.json()

//GALLERY - Déclaration des éléments
const gallery = document.createElement("div")
gallery.classList.add('gallery')
portfolio.appendChild(gallery)

//GALLERY - Fonction creation des travaux
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
