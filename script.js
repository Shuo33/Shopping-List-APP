const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



// Functions - add items 
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

    // Add li to the DOM
    itemList.appendChild(li);

    checkItems(); 

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
    const text = e.target.value.toLowerCase();
    // console.log(text);
    
    const items = itemList.querySelectorAll('li');
    items.forEach(function (item) {
        const itemName = item.firstChild.textContent.toLowerCase(); 
        // console.log(itemName);

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







// Event Listeners
itemForm.addEventListener('submit', addItem); // To add items
itemList.addEventListener('click', removeItem); // To remove items
clearBtn.addEventListener('click', clearAll); // To clear all 
itemFilter.addEventListener('input', filterItems); // To filter the items


checkItems();