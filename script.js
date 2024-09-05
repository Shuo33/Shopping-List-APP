const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false; 



// Function - display storage data on the UI 
function displayItems() {
    const itemsFromStorage = itemsStoredInStorage();
    itemsFromStorage.forEach(
        function (item) {
            addItemToDOM(item);
        }
    );

    checkItems();
}

// Functions - add items to DOM & storage 
function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;

    // validate input
    if (newItem === '') {
        alert('Please add an item');
        return; 
    } 

    // check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode'); // the items chosen (will get edit have the 'edit-mode' class, so here we put the chosen items into 'itemToEdit'

        removeItemFromStorage(itemToEdit.textContent); //the variable 'itemToEdit' will give the li item, but we need the text of the li item since the function 'removeItemFromStorage' takes only the text of the items, so now we can remove the chosen items from the storage 

        itemToEdit.classList.remove('edit-mode'); //since the chosen items has been removed from the storage, we need to remove it's class so the items will be back to normal

        itemToEdit.remove(); // remove the chosen item from DOM 

        isEditMode = false; 
        
    }






    // new elements will be add to the DOM 
    addItemToDOM(newItem);

    // add those new elements to local storage 
    addItemToStorage(newItem);

    checkItems(); 

    itemInput.value = '';
}


// Functions - create items 
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button; 
}

// Function - add items to DOM
function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item)); 

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}

// Function - get items aleady stored in storage 
function itemsStoredInStorage() {
    let itemsFromStorage;

    // check if there's already items in local storage
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
        //set the key to 'items' and null means nothing in the varable of 'itemsFromStorage', then we set this varable to an empty array
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
        //in case there's already some items, set thoses items into an array and put it into the varable 'itemsFromStorage' 
    }

    return itemsFromStorage; 
}


// Function - add new items to storage
    function addItemToStorage(item) {
    //create a varable named 'itemsFromStorage' which represente the array of items in local storage
    const itemsFromStorage = itemsStoredInStorage();

    // Add new item to the array of 'itemsFromStorage' 
    itemsFromStorage.push(item);

    // Convert the array of 'itemsFromStorag' to String so to set it to local storage, with 'item' as key and JSON.stringify(itemsFromStorage) as it's value
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// A handler of click, so differents functions could get fired 
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}



// set item to edit 
function setItemToEdit(item) {
    isEditMode = true; 

    itemList.querySelectorAll('li').forEach(function (i) {
        i.classList.remove('edit-mode');
    });

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item'
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent; 

}



// Functions - remove items
function removeItem(item) {
    if (confirm('Are you sure ?')) {
        item.remove();  //remove item from DOM
        removeItemFromStorage(item.textContent);  //remove item from the storage, since the function 'removeItemFromStorage' takes only the text of the items

        checkItems();
    }
}


function removeItemFromStorage(item) {
    let itemsFromStorage = itemsStoredInStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item); //filter out item to be removed, so the clicked ones will get removed from the variable
    
    localStorage.setItem('items', JSON.stringify(itemsFromStorage)); // re-set to localstorage
}




// Function - clear all items (method 1)
// function clearAll(e) {
//     if (e.target.classList.contains('btn-clear')) {
//         itemList.remove();
//     }
// }

// Function - clear all items (method 2)
function clearAll() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);  
    }
    checkItems();

    localStorage.removeItem('items'); //clear from localStorage
}


// Function - filter items 
function filterItems(e) {
    // récupérer the text tappé (new)
    const text = e.target.value.toLowerCase();
    // console.log(text);
    
    // les text déjà tapé seront généré une list, et on va récupérer les text de cette list
    const items = itemList.querySelectorAll('li');
    items.forEach(function (item) {
        const itemName = item.firstChild.textContent.toLowerCase(); 
        // console.log(itemName);

        // comparer les text tappé (new) avec les text (annciennes) dans la list
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}




// Function - check if there's no items then we delete the filter and the clear button, the submit button will back to normal instead of 'update item' mode, the input will initialise to nothing 

function checkItems() {

    itemInput.value = ''; // initialise the input 


    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    // console.log(items);

    //submit button back to normal 
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'; 

    isEditMode = false; 
}


// Initialize Application
function init() {
    itemForm.addEventListener('submit', onAddItemSubmit); // add new items to DOM and local storage 
    itemList.addEventListener('click', onClickItem); 
    clearBtn.addEventListener('click', clearAll); // to clear all 
    itemFilter.addEventListener('input', filterItems); // to filter the items
    document.addEventListener('DOMContentLoaded', displayItems);
    
    checkItems();
}

init();

