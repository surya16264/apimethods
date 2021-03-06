import {ApiMethodObj} from "./classAPImethod.js"

// import { editDatafun, deleteDatafun} from "./APImethods.js";

  
 
// export const displayData = (data) => {
//     let tableData = document.querySelector('.tableBody');
//     let tableBody = document.createElement('tbody')
//     let tableHead = document.createElement('thead')
//     tableHead.innerHTML = `<tr><th>S.No</th><th>Title</th><th>Category</th><th>Price</th><th>Description</th><th>Images</th><th>Edit</th><th>Delete</th><tr>`
//     data.forEach(element => {
//         let tableRow = document.createElement('tr'); 
//         tableRow.className = `row${element.id}`;
//         tableRow.id = `${element.id}`
//         let tableId = document.createElement('td');
//         tableId.className = 'tableid'
//         tableId.innerHTML = `${element.id}`
//         let tableCategory = document.createElement('td');
//         tableCategory.className = 'tablecategory'
//         tableCategory.innerHTML = `${element.category}`
//         let tableTitle = document.createElement('td');
//         tableTitle.className = 'tabletitle'
//         tableTitle.innerHTML = `${element.title}`
//         let tableDescription = document.createElement('td');
//         tableDescription.className = 'tabledescription'
//         tableDescription.innerHTML = `${element.description}`
//         let tablePrice = document.createElement('td');
//         tablePrice.className = 'tableprice'
//         tablePrice.innerHTML = `${element.price}`
//         let tableImg = document.createElement('td');
//         tableImg.className = 'tableimg'
//         tableImg.innerHTML = `<img src = ${element.image}>`
//         let EditData = document.createElement('td');
//         EditData.className = 'editdata'
//         EditData.innerHTML = `<button class="editbtn" id="editbtn-id${element.id}">Edit</button>`
//         EditData.addEventListener('click', ApiMethodObj.editDatafun);
//         let DeleteData = document.createElement('td');
//         DeleteData.className = 'deletedata'
//         DeleteData.innerHTML = `<button class="deletebtn" id="deletebtn-id${element.id}">Delete</button>`
//         DeleteData.addEventListener('click', ApiMethodObj.deleteDatafun);
         
//         tableRow.appendChild(tableId)
//         tableRow.appendChild(tableTitle)
//         tableRow.appendChild(tableCategory)
//         tableRow.appendChild(tablePrice)
//         tableRow.appendChild(tableDescription)
//         tableRow.appendChild(tableImg)
//         tableRow.appendChild(EditData)
//         tableRow.appendChild(DeleteData)
//         tableBody.appendChild(tableRow)
//         tableData.appendChild(tableHead)
//         tableData.appendChild(tableBody)
//     }); 
// }

/**
 * data getting and displaying all the datas in HTML using html dom
 * @param {*} data
 * 
 */
export const displayData = (data) => {
    let tableData = document.querySelector('.tableBody');
    let tableBody = document.createElement('tbody')
    let tableHead = document.createElement('thead')
   tableHead.innerHTML = `<tr><th>S.NO</th><th>Title</th><th>Category</th><th>Price</th><th>Description</th><th>Images</th><th>Edit Data</th><th>Delete Data</th></tr>`
    data.forEach(element => {
        let tableRow = document.createElement('tr'); 
        tableRow.className = 'row';
        tableRow.id = `${element.id}`;
        let tableId = generatingElemnts('td','tableid',`${element.id}`);
        let tableCategory = generatingElemnts('td','tablecategory',`${element.category}`)
        let tableTitle =generatingElemnts('td','tabletitle',`${element.title}`)
        let tableDescription = generatingElemnts('td','tabledescription',`${element.description}`)
        let tablePrice = generatingElemnts('td','tableprice',`${element.price}`)
        let tableImg = generatingElemnts('td', 'tableimg', `<img src = ${element.image}>`)
        let EditData = generatingElemnts('td', 'editdata',  `<button class="editbtn" id="editbtn-id${element.id}">Edit</button>`)
        EditData.addEventListener('click', ApiMethodObj.editDatafun);
        let DeleteData = generatingElemnts('td', 'deletedata',  `<button class="deletebtn" id="deletebtn-id${element.id}">Delete</button>`)
        DeleteData.addEventListener('click', ApiMethodObj.deleteDatafun);
        appendingData(tableRow, tableData, tableId, tableTitle, tableCategory, tablePrice, tableDescription, tableImg, EditData, DeleteData,tableHead, tableBody);
    });
}

/**
 * Generating Elements function
 * @param {*} ElementName 
 * @param {*} ClassName 
 * @param {*} InnerhtmlData 
 * @returns element
 */
const generatingElemnts = (ElementName, ClassName, InnerhtmlData) => {
    let element = document.createElement(ElementName);
    ClassName ? element.className = ClassName : '';
    InnerhtmlData ? element.innerHTML = InnerhtmlData : '';
    return element;
}

/**
 * Appending data to the table function
 * @param {*} tableRow 
 * @param {*} tableData 
 * @param {*} tableId 
 * @param {*} tableTitle 
 * @param {*} tableCategory 
 * @param {*} tablePrice 
 * @param {*} tableDescription 
 * @param {*} tableImg 
 * @param {*} EditData 
 * @param {*} DeleteData 
 * @param {*} tableHead 
 * @param {*} tableBody 
 */
const appendingData = (tableRow, tableData, tableId, tableTitle, tableCategory, tablePrice, tableDescription, tableImg, EditData, DeleteData,tableHead, tableBody) => {
    tableRow.appendChild(tableId)
    tableRow.appendChild(tableTitle)
    tableRow.appendChild(tableCategory)
    tableRow.appendChild(tablePrice)
    tableRow.appendChild(tableDescription)
    tableRow.appendChild(tableImg)
    tableRow.appendChild(EditData)
    tableRow.appendChild(DeleteData)
    tableBody.appendChild(tableRow)
    tableData.appendChild(tableHead)
    tableData.appendChild(tableBody)
}