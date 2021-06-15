import {displayData} from "./createHtmlDom.js"

/**
 * Function to fetch api datas
 */
 let FetchDataFromApi = () => {
    fetch("http://localhost:3000/Mydata")
    .then(reply => reply.json())
    .then(data => displayData(data)); 
}
// /**
//  * Calling function to fetch api datas
//  */
FetchDataFromApi()

let addPostButton = document.querySelector('.addpostbtn')
let popupbox = document.querySelector('.popupbox')
let closePopupbox = document.querySelector('.fa-close')

let showpopup = () => {
    popupbox.classList.add('active')
}
addPostButton.addEventListener('click', showpopup)

let closepop = () => {
    popupbox.classList.remove('active')
}
closePopupbox.addEventListener('click', closepop)

// Add post Method

// /**
//  * Initializing variables and calling POST method to post the data in API
//  */
const inputDetails = document.querySelector('.inputDetails')
let postButton = document.querySelector('#Post')
let editButton = document.getElementById('editPost')
let titleInput = document.querySelector('#titleInput')
let categoryInput = document.querySelector('#categoryInput')
let priceInput = document.querySelector('#priceInput')
let descriptionInput = document.querySelector('#descriptionInput')
let imageUrlInput = document.querySelector('#imageInput')

 /**
 * PostMethod function 
 */
 let postMethod = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/Mydata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            category : categoryInput.value,
            description : descriptionInput.value,
            image : imageUrlInput.value,
            price : priceInput.value,
            title : titleInput.value
        })
    }).then(reply => reply.json())
    .then(data => {
        console.log(data);
    })
}
/**
 * Calling that post method using callback function
 */
postButton.addEventListener('click',postMethod)

//Delete post Method

export let deleteDatafun = (e) => {
    let val = e.target;
    let id = val.parentElement.parentElement.id;
    if(id) {
        fetch(`http://localhost:3000/Mydata/${id}`, {
        method: "DELETE" ,
    })
    .then(reply => reply.json());
    
 }
}

//Edit post Method

export let editDatafun = (e) => {
    let val = e.target;
    let id = e.target.parentElement.parentElement.id;
    console.log(id)
    let titleContent = val.parentElement.parentElement.childNodes[1].textContent;
    titleInput.value = titleContent;
    let categoryContent = val.parentElement.parentElement.childNodes[2].textContent;
    categoryInput.value = categoryContent;
    let priceContent = val.parentElement.parentElement.childNodes[3].textContent;
    priceInput.value = priceContent;
    let descriptionContent = val.parentElement.parentElement.childNodes[4].textContent;
    descriptionInput.value = descriptionContent;
    let imageUrlContent = val.parentElement.parentElement.childNodes[5].childNodes[0].src;
    imageUrlInput.value = imageUrlContent;
    postButton.style.display = 'none';
    showpopup();
    editButton.addEventListener('click', () => {
        updatePost(id)
    })
}

let updatePost = (e) => {
    //alert(titleInput.value)
    fetch(`http://localhost:3000/Mydata/${e}` , {
        method: "PUT",
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category : categoryInput.value,
            description : descriptionInput.value,
            image : imageUrlInput.value,
            price : priceInput.value,
            title : titleInput.value
        })
    })
    .then(reply => reply.json())
    .then(data => displayData(data))

    postButton.style.display = 'block';
}

let logoutButton = document.getElementsByClassName('logoutBtn');
console.log(logoutButton)