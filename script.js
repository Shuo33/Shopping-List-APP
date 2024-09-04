const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



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



// Function - delete items
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();
            checkItems();
        }
    }
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




// Function - check if there's no items then we delete the filter and the clear button
function checkItems() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    // console.log(items);
}


// Initialize Application
function init() {
    itemForm.addEventListener('submit', onAddItemSubmit); // add new items to DOM and local storage 
    itemList.addEventListener('click', removeItem); // to remove items
    clearBtn.addEventListener('click', clearAll); // to clear all 
    itemFilter.addEventListener('input', filterItems); // to filter the items
    document.addEventListener('DOMContentLoaded', displayItems);
    
    checkItems();
}

init();

