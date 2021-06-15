import {displayData} from "./create html dom.js"


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

    getMethod = async() => {
        // this.response = await fetch("http://localhost:3000/Mydata")
        // this.data = await this.response.json()
        // displayData(this.data)
        let res = await fetch('http://localhost:3000/Mydata')
        let jsonData = await res.json()
        return await displayData(jsonData)
    }

    postMethod = async() => {
        
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
        await((reply) => reply.json())
        await((data) => console.log(data)) 
    }

    showpopup = () => {
        this.popupbox.classList.add('active');
    }

    closepop = () => {
        this.popupbox.classList.remove('active');
    }

    addPost = () => {
       this.postButton.addEventListener('click', () => {
        if(this.titleInput.value === '' || this.categoryInput.value === '' || this.descriptionInput.value === '' || this.priceInput.value === '' || this.imageUrlInput.value === '') {
            console.log("This feild is required");
            document.querySelectorAll('.errorMessage').forEach(element => {
                element.classList.add('errorActive');
            });
            
        }
        else {
            this.postMethod();
        }
       });
    }

    addPostButtonFun = () => {
       this.addPostButton.addEventListener('click', this.showpopup);
    }

    closingPopFun = () => {
       this.closePopupbox.addEventListener('click', this.closepop)
    }

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
    }

    }

    editDatafun = (e) => {
        let val = e.target;
        let id = e.target.parentElement.parentElement.id;
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
        this.showpopup();
        this.editButton.addEventListener('click', () => {
            this.updatePost(id)
        })
    }

    updatePost = async(id) => {
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
        await (reply => reply.json())
        await (data => displayData(data))
    
        postButton.style.display = 'block';
    }
    
}

export let ApiMethodObj = new ApiMethods(postButton, editButton, titleInput, categoryInput, priceInput, descriptionInput, imageUrlInput, addPostButton, popupbox, closePopupbox);
ApiMethodObj.getMethod();
ApiMethodObj.addPostButtonFun();
ApiMethodObj.addPost();
ApiMethodObj.closingPopFun();

let arrowDownBtn = document.querySelector('.arrowDownBtn');

arrowDownBtn.addEventListener('click', () => {
    document.querySelector('.dropdownList').classList.add('dropdownListActive');
    arrowDownBtn.style.display = 'none';
    document.querySelector('#arrowUpBtnActive').style.display = 'block';
});

let arrowUpBtn = document.querySelector('.arrowUpBtn');

arrowUpBtn.addEventListener('click', () => {
    document.querySelector('.dropdownList').classList.remove('dropdownListActive');
    arrowUpBtn.style.display = 'none';
    document.querySelector('.arrowDownBtn').style.display = 'block';
});

let logoutBtn = document.querySelector('.dropdownList');
console.log(logoutBtn)
logoutBtn.addEventListener('click', () => {
    console.log("loggedout");
});

let loginUser = JSON.parse(sessionStorage.getItem('LoginUser'));
console.log(loginUser);
let 






