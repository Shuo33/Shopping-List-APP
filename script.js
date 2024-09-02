const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');




// Functions - add item 
function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;

    // Validate input
    if (newItem === '') {
        alert('Please add an item');
        return; 
    } 

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem)); 

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button; 
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Function - delete items
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
}

// Function - clear all (method 1)
function clearAll(e) {
    if (e.target.classList.contains('btn-clear')) {
        itemList.remove(); 
    }
}

// Function - clear all (method 2)
// function clearAll() {
//     while (itemList.firstChild) {
//         itemList.removeChild(itemList.firstChild);  
//     }
// }



// Event Listeners
itemForm.addEventListener('submit', addItem); // To add items
itemList.addEventListener('click', removeItem); // To remove items
clearBtn.addEventListener('click', clearAll); // To clear all 
