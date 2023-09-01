//Appel de l'API
const requeteTravaux = await fetch("http://localhost:5678/api/works")
const travaux = await requeteTravaux.json()



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
lienModale.href="#modal1"
lienModale.classList.add('js-lien-modal')
const iconLienModale = document.createElement('i')
iconLienModale.classList.add('fa-regular','fa-pen-to-square', 'modifier-icon')

//PORTFOLIO - Parenting
portfolio.appendChild(folioTitreContainer)
portfolio.appendChild(mesProjetsTitre)
folioTitreContainer.appendChild(lienModale)
lienModale.appendChild(iconLienModale)

//MODALE ///////////////////////////////////////////////////////////////////
//MODALE - Création des éléments - ASIDE
const baliseModale = document.createElement('aside')
baliseModale.classList.add('modal-container')
baliseModale.setAttribute('id','modal1')
baliseModale.setAttribute('aria-hidden','true')
baliseModale.setAttribute('role', 'dialog')
baliseModale.setAttribute('aria-modal', 'false')
baliseModale.setAttribute('style','display:none' )// Masquer par défaut la modale


//MODALE- Création des éléments - WRAPPER
const modaleWrapper = document.createElement('div')
modaleWrapper.classList.add('modal-window')
modaleWrapper.classList.add('js-modal-stoppropag')

const galerieModale = document.createElement('div')
galerieModale.setAttribute('id','Galerie-Modale')

const barreGrise = document.createElement('div')
barreGrise.setAttribute('id','barre-grise')

const boutonFermerModale = document.createElement('button')
boutonFermerModale.classList.add('js-modal-close')
boutonFermerModale.innerText = 'fermer la modale'




portfolio.appendChild(baliseModale)
baliseModale.appendChild(modaleWrapper)
modaleWrapper.appendChild(galerieModale)
modaleWrapper.appendChild(barreGrise)
modaleWrapper.appendChild(boutonFermerModale)


//MODALE- Ouverture de la modale
let modal = null
const openModal = function(e){ //Fonction pour ouvrir
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stoppropag').addEventListener('click', stopPropagation)
}

const closeModal = function(e){ // fonction pour fermer
    if (modal === null)return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stoppropag').removeEventListener('click', stopPropagation)

    modal = null
}

const stopPropagation = function(e){ // empeche de fermer la modale avec un click dans le contenu
    e.stopPropagation()
}

document.querySelectorAll('.js-lien-modal').forEach(a =>{ //Quand on clique sur le lien modal
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e){      //fermer la modale avec la touche escape
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
})

//MODALE - FONCTION - fonction qui genere les travaux de la modale
function genererTravauxModale(travaux){
   
    for(let i=0; i< travaux.length; i++){
        const figureModale = document.createElement("figure")
        figureModale.classList.add('figure-modale')
        const imageTravaux = document.createElement("img")
        imageTravaux.src = travaux[i].imageUrl
        imageTravaux.setAttribute("alt",travaux[i].title)
        
        const iconTrash = document.createElement('div')
        iconTrash.classList.add(
            'icon-trash',
            'fa-solid',
            'fa-trash-can')
        
        galerieModale.appendChild(figureModale)
        figureModale.appendChild(imageTravaux)
        figureModale.appendChild(iconTrash)        
        }
}


genererTravauxModale(travaux) //Appel de la fonction









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
