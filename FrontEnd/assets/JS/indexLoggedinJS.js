//API Call
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



//PORTFOLIO  /////////////////////////////////////////////////////////////////
const portfolio = document.querySelector('#portfolio')

//PORTFOLIO - Creation des éléments, du titre Mes projets et du bouton ouverture



//PORTFOLIO - Titres et bouton modale
const projetsTitreContainer = document.createElement('div')
const titreContainerFiller = document.createElement('div')
const mesProjetsTitre = document.createElement('h2')

const lienModale = document.createElement('a')
const iconLienModale = document.createElement('i')
const lienModaleText = document.createElement('p')

projetsTitreContainer.setAttribute('id', "titres_container")
titreContainerFiller.setAttribute('id','titre_container_filler')
mesProjetsTitre.setAttribute('id','mes-projets-titre')
mesProjetsTitre.innerText='Mes Projets'

lienModale.href="#modal1"
lienModale.setAttribute('id','js-lien-modal')

iconLienModale.classList.add('fa-regular','fa-pen-to-square', 'modifier-icon',)
lienModaleText.innerText='modifier'

portfolio.appendChild(projetsTitreContainer)
projetsTitreContainer.appendChild(titreContainerFiller)
projetsTitreContainer.appendChild(mesProjetsTitre)
projetsTitreContainer.appendChild(lienModale)
lienModale.appendChild(iconLienModale)
lienModale.appendChild(lienModaleText)


//MODALE ///////////////////////////////////////////////////////////////////
//MODALE - Création des éléments - ASIDE
const baliseModale = document.querySelector('#modal1')
baliseModale.setAttribute('style','display:none' )// Masquer par défaut la modale


//MODALE- Selection des éléments - WRAPPER1

const modaleWrapper1 = document.querySelector('.modal_page1')
const galerieModale = document.querySelector('#Galerie-Modale')
const boutonFermerModale = document.querySelector('.js-modal-close')
const ajouterTravauxBtn = document.querySelector('#btn-ajouter-travaux')

//MODALE- Selection des éléments - WRAPPER2
const modaleWrapper2 = document.querySelector('.modal_page2')
modaleWrapper2.setAttribute('style','display:none' )// Masquer par défaut le wrapper2

const ajoutForm = document.querySelector('#ajoutPhotoForm')

//Bouton pour passer au wrapper2
const retournerFleche = document.querySelector('#modal_page2_return_btn')
retournerFleche.style.display = "none"

ajouterTravauxBtn.addEventListener('click',function(){
    modaleWrapper2.style.display = null
    modaleWrapper1.style.display = "none"
    retournerFleche.style.display = null
})

//Bouton pour retourner au wrapper1
retournerFleche.addEventListener('click', function(){
    modaleWrapper2.style.display = "none"
    modaleWrapper1.style.display = null
    retournerFleche.style.display = "none"
})


//MODALE- Fonction Ouverture de la modale
let modal = null
const openModal = function(e){ //Fonction pour ouvrir
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden') //Pour l'accessibilité
    target.setAttribute('aria-modal', 'true')//Pour l'accessibilité
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stoppropag').addEventListener('click', stopPropagation)
}

const closeModal = function(e){ // fonction pour fermer
    if (modal === null)return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')//Pour l'accessibilité
    modal.removeAttribute('aria-modal')//Pour l'accessibilité
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stoppropag').removeEventListener('click', stopPropagation)

    modal = null
}

const stopPropagation = function(e){ // Stop la propagation (empeche de fermer avec un click)
    e.stopPropagation()
}

document.querySelectorAll('#js-lien-modal').forEach(a =>{ //Quand on clique sur le lien modal
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e){      //fermer la modale avec la touche escape
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
})

//MODALE - FONCTION - fonction qui genere les travaux de la modale
async function genererTravauxModale(travaux){
   
    for(let i=0; i< travaux.length; i++){
        const figureModale = document.createElement("figure")
        figureModale.classList.add('figure-modale')
        figureModale.setAttribute('id',travaux[i].id)
        const imageTravaux = document.createElement("img")
        imageTravaux.src = travaux[i].imageUrl
        imageTravaux.setAttribute("alt",travaux[i].title)
        
        const iconTrash = document.createElement('div')
        iconTrash.classList.add(
            'icon-trash',
            'fa-solid',
            'fa-trash-can')

        iconTrash.addEventListener('click',function(e){
            e.preventDefault()
            deleteTravail(travaux[i].id)
          
        })
        
        galerieModale.appendChild(figureModale)        
        figureModale.appendChild(iconTrash)        
        figureModale.appendChild(imageTravaux)
        }
}
genererTravauxModale(travaux) //Appel de la fonction


//MODALE - AJOUTER UNE PHOTO - Fonction pour creer les categories selon l'API
const requeteCategories = await fetch('http://localhost:5678/api/categories')
const categories = await requeteCategories.json()

const categorieSelection = document.querySelector('#categorie_selection')

for(let i=0; i < categories.length;i++){
    const categorieOption = document.createElement('option')
    categorieOption.setAttribute('value',categories[i].id)
    categorieOption.innerText= categories[i].name

    categorieSelection.appendChild(categorieOption)
}

//MODALE - Fonction pour effacer un travail 
async function deleteTravail(TravauxId){
    const urlApiDelete = `http://localhost:5678/api/works/${TravauxId}`

    const token = localStorage.getItem('Token') // Récupération du token
    console.log('Demander d','effacer le projet suivant:',TravauxId)

    if (!token){  //en cas d'absence de token
        console.error('Pas de token')
        return
    }
    const confirmation = window.confirm('Etes vous sûr de vouloir effacer le projet ?') // Demande de confirmation
    if(confirmation){
        const delResponse = await fetch(urlApiDelete, {
            method: 'DELETE',
            headers : {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`},
        })
        if(!delResponse.ok){
            console.log(delResponse.status)
        }else{
            console.log(`Suppression du travail ${TravauxId}` )
            
            const galerieModale = document.querySelector('#Galerie-Modale')//recharge la galerie modale
            galerieModale.innerHTML= '' 
            genererTravauxModale(travaux)


        }     
    }
    else{
        console.log('suppression annulée')
        }
    
    }




//MODALE - AJOUT D'UN TRAVAIL -

const photoForm = document.querySelector('#ajoutPhotoForm')
const imageUpload = document.querySelector('#image_upload')
const workTitle = document.querySelector('#title')
const workCategory = document.querySelector("#category_selection")


//MODALE - AJOUT D'UN TRAVAIL - Fonction pour envoyer un travail
async function posterUnTravail(form){
    
    const token = localStorage.getItem('Token') // Récupération du token
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
             },
        body: form,
    })
    
    console.log(response.status)

    if(response.status === 401){
        console.error('Authentification échouée')
    }else if (response.status ===500){
        console.error('Unexpected Error')
    }else if (response.status === 201){
        console.log('travail soumis')
        document.querySelector('.gallery').innerHTML= '' // reloading gallery
        genererTravaux(travaux)

    }else{
        console.error('erreur inconnue')
    }
    return false
}

//MODALE - AJOUT D'UN TRAVAIL - aperçu de l'image
const ajoutPhotoForm = document.querySelector('#ajoutPhotoForm')
const photoContainer = document.querySelector(".Photo-container")
const photoContent = document.querySelector(".Photo-content")


const imageApercu = document.createElement('img')//Création de l'image aperçu
imageApercu.style.display='none'
photoContainer.appendChild(imageApercu)

imageUpload.addEventListener('change',function(){ // Ajout de l'event
    imageApercu.src = URL.createObjectURL(imageUpload.files[0])
    imageApercu.style.display=null
    photoContent.style.display='none'
    console.log('image chargée :',imageUpload.files[0])


})

//MODALE - AJOUT D'UN TRAVAIL -  Evenemenement sur submit
const addPictureSubmit = document.querySelector('#btn_envoyer')

addPictureSubmit.addEventListener('click', function(event){
    event.preventDefault()
    const formData = new FormData(photoForm)

let baliseTitre = document.querySelector('#titre')
if(!baliseTitre.value){
   alert('Vous devez spécifier un titre')
}else{
posterUnTravail(formData)
closeModal(event)// Closing the modal
}



})
     

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
