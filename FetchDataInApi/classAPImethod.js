import {displayData} from "./createHtmlDom.js"


const inputDetails = document.querySelector('.inputDetails')
let postButton = document.querySelector('#Post')
let editButton = document.getElementById('editPost')
let titleInput = document.querySelector('#titleInput')
let categoryInput = document.querySelector('#categoryInput')
let priceInput = document.querySelector('#priceInput')
let descriptionInput = document.querySelector('#descriptionInput')
let imageUrlInput = document.querySelector('#imageInput')
let addPostButton = document.querySelector('.addpostbtn')
let popupbox = document.querySelector('.popupbox')
let closePopupbox = document.querySelector('.fa-close')

class ApiMethods {
    constructor(postButton, editButton, titleInput, categoryInput, priceInput, descriptionInput, imageUrlInput, addPostButton, popupbox, closePopupbox) {
        this.postButton = postButton;
        this.editButton = editButton;
        this.titleInput = titleInput;
        this.categoryInput = categoryInput;
        this.priceInput = priceInput;
        this.descriptionInput = descriptionInput;
        this.imageUrlInput = imageUrlInput;
        this.addPostButton = addPostButton;
        this.popupbox = popupbox;
        this.closePopupbox = closePopupbox;
    }

    /**
     * Get Method function
     * @returns 
     */
    getMethod = async() => {
        // this.response = await fetch("http://localhost:3000/Mydata")
        // this.data = await this.response.json()
        // displayData(this.data)
        let res = await fetch('http://localhost:3000/Mydata')
        let jsonData = await res.json()
        return await displayData(jsonData)
    }

    /**
     * Post Method Function
     * @returns 
     */
    postMethod = () => {
        this.postFetch();
        this.closepop();
        this.clearPopUp();
        document.querySelector('.tableBody').innerHTML = '';
        return this.getMethod();
    }

    /**
     * postFetch function
     */
    postFetch = async() => {
        await fetch("http://localhost:3000/Mydata", {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                category : this.categoryInput.value,
                description : this.descriptionInput.value,
                image : this.imageUrlInput.value,
                price : this.priceInput.value,
                title : this.titleInput.value
        }) 
    }) 
    }
    /**
     * Showpopup function
     */
    showpopup = () => {
        this.popupbox.classList.add('active');
    }

    /**
     * Closepop function
     */
    closepop = () => {
        this.popupbox.classList.remove('active');
    }

    /**
     * Add post function
     */
    addPost = () => {
       this.postButton.addEventListener('click', () => {
        if(this.titleInput.value === '' || this.categoryInput.value === '' || this.descriptionInput.value === '' || this.priceInput.value === '' || this.imageUrlInput.value === '') {
            document.querySelectorAll('.errorMessage').forEach(element => {
                element.classList.add('errorActive');
            }); 
        }
        else {
            this.postMethod();
        }
       });
    }

    /**
     * Add post button function
     */
    addPostButtonFun = () => {
       this.addPostButton.addEventListener('click', this.showpopup);
    }

    /**
     * losing POp function
     */
    closingPopFun = () => {
       this.closePopupbox.addEventListener('click', this.closepop)
    }

    /**
     * Delete Method Function
     * @param {*} e 
     */
    deleteDatafun = async(e) => {
        e.preventDefault();
        let val = e.target;
        let id = val.parentElement.parentElement.id;
        if(id) {
           await fetch(`http://localhost:3000/Mydata/${id}`, {
            method: "DELETE" ,
        })
        await (reply => reply.json())
        await (data => displayData(data));
        let value = document.getElementById(id);
        value.remove();
        }
    }

    /**
     * Edit Post Function
     * @param {*} e 
     */
    editDatafun = async(e) => {
        console.log(e.target)
        console.log(e.target.parentElement.parentElement.id)
        let id = e.target.parentElement.parentElement.id;
        let response = await fetch(`http://localhost:3000/Mydata/${id}`);
        let idData = await response.json();
        console.log(idData)
        console.log(idData.id)
        console.log(idData.title)
        console.log(idData.category)
        console.log(idData.description)
        console.log(idData.image)
        console.log(idData.price)
        titleInput.value = idData.title;
        categoryInput.value = idData.category;
        descriptionInput.value = idData.description;
        priceInput.value = idData.price;
        imageUrlInput.value = idData.image;
        postButton.style.display = 'none';
        this.showpopup();
        this.editButton.addEventListener('click', () => {
            this.updatePost(id)
        })
    }

    updatePost = async(id) => {
        console.log(id)
        await fetch(`http://localhost:3000/Mydata/${id}` , {
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
    this.closepop();
    this.clearEditPopUp();
    postButton.style.display = 'block';
    document.querySelector('.tableBody').innerHTML = '';
    return this.getMethod();
    }
    /**
     * clear popup function
     */
    clearPopUp = () => {
        this.titleInput.value = '';
        this.categoryInput.value = '';
        this.descriptionInput.value = '';
        this.priceInput.value = '';
        this.imageUrlInput.value = '';
    }

    /**
     * Clear edit pop up function
     */
    clearEditPopUp = () => {
        categoryInput.value = '';
        descriptionInput.value = '';
        titleInput.value = '';
        priceInput.value = '';
        imageUrlInput.value = '';
    }  
}

export let ApiMethodObj = new ApiMethods(postButton, editButton, titleInput, categoryInput, priceInput, descriptionInput, imageUrlInput, addPostButton, popupbox, closePopupbox);
ApiMethodObj.getMethod();
ApiMethodObj.addPostButtonFun();
ApiMethodObj.addPost();
ApiMethodObj.closingPopFun();


// Drop down and Drop Up button
let arrowDownBtn = document.querySelector('.arrowDownBtn');

/**
 * Arrow Down button function
 */
arrowDownBtn.addEventListener('click', () => {
    document.querySelector('.dropdownList').classList.add('dropdownListActive');
    arrowDownBtn.style.display = 'none';
    document.querySelector('#arrowUpBtnActive').style.display = 'block';
});

let arrowUpBtn = document.querySelector('.arrowUpBtn');

/**
 * Arrow up button function
 */
arrowUpBtn.addEventListener('click', () => {
    document.querySelector('.dropdownList').classList.remove('dropdownListActive');
    arrowUpBtn.style.display = 'none';
    document.querySelector('.arrowDownBtn').style.display = 'block';
});

/**
 * Logout button function
 */
let logoutBtn = document.querySelector('.dropdownList');
logoutBtn.addEventListener('click', () => {
    console.log("loggedout");
    sessionStorage.removeItem('LoginUser');
    window.location.href = "../index.html";
});

// Redirecting to login page without login

let loginUser = JSON.parse(sessionStorage.getItem('LoginUser'));
if(!loginUser) {
    window.location.href = "../index.html";
}

// Username displaying

let userName = JSON.parse(sessionStorage.getItem('LoginUser'));
document.querySelector('.usernameList').innerHTML = userName.Username;






// editDatafun = async(e) => {
//     let val = e.target;
//     console.log(val)
//     let id = e.target.parentElement.parentElement.id;
//     console.log(id)
//     let titleContent = val.parentElement.parentElement.childNodes[1].textContent;
//     titleInput.value = titleContent;
//     let categoryContent = val.parentElement.parentElement.childNodes[2].textContent;
//     categoryInput.value = categoryContent;
//     let priceContent = val.parentElement.parentElement.childNodes[3].textContent;
//     priceInput.value = priceContent;
//     let descriptionContent = val.parentElement.parentElement.childNodes[4].textContent;
//     descriptionInput.value = descriptionContent;
//     let imageUrlContent = val.parentElement.parentElement.childNodes[5].childNodes[0].src;
//     imageUrlInput.value = imageUrlContent;
//     postButton.style.display = 'none';
//     this.showpopup();
//     this.editButton.addEventListener('click', () => {
//         this.updatePost(id)
//     })
// }

// /**
//  * Update post function
//  * @param {*} id 
//  * @returns 
//  */
// updatePost = async(id) => {
//     console.log(id)
//     this.editFetch(id);
//     this.closepop();
//     this.clearEditPopUp();
//     postButton.style.display = 'block';
//     document.querySelector('.tableBody').innerHTML = '';
//     return this.getMethod();   
// }

// editFetch = async(id) => {
//     await fetch(`http://localhost:3000/Mydata/${id}` , {
//         method: "PUT",
//         headers:  {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             category : categoryInput.value,
//             description : descriptionInput.value,
//             image : imageUrlInput.value,
//             price : priceInput.value,
//             title : titleInput.value
//         })
//     })
// }
