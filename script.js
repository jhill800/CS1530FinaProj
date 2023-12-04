// Run setup after page had loaded 
window.addEventListener("load", setup); 
 
function setup() { 
    addListeners(); 
    const data = retrieveItemsFromLocalStorage(); 
    populateBudgetsList(data); 
} 
 
// add listeners to the buttons 
function addListeners() { 
    document.getElementById("addNewItemButton").addEventListener("click", addNewItem); 
    document.getElementById("deleteSelectedItemsButton").addEventListener("click", 
deleteSelectedItems); 
    document.getElementById("selectAllItemsButton").addEventListener("click", 
selectAllItems); 
} 
 
function retrieveItemsFromLocalStorage() {    
//     create an empty data array. This array will be populated 
//     with item objects from the local storage 
//     An item object will have only one pair of (key,value) 
//     The "key" will be the item description, such as "banana", 
//     and the "value" will be the quantity, such as "2 dozen" 

    let savedList = [];

    for( let i=0; i<localStorage.length; i++){
       
        let item = new Object();

        item.key = localStorage.key(i);
        item.value = localStorage.getItem(item.key);
        console.log("Key:   " , item.key);
        console.log("Value: ", item.value);

        savedList.push(item);
    }

    console.log("Testing" , localStorage.key(0));
    console.log("Testing" , localStorage.key(1));
    console.log("Testing" , localStorage.key(2));   

    return savedList
} 
 
// my gift to you. I am giving this function ready to use   uncomment this for Version 2 
function populateBudgetsList(data) { 
    
    for(let i=0; i<data.length; i++){
        addItemToBudgetsListArea(data[i].key, data[i].value);
    }
} 

function navigateToCustomizePage(budgetName) {
    // Navigate to the new page and pass the budget name as a query parameter
    window.location.href = `customize-budget.html?budget=${encodeURIComponent(budgetName)}`;
}
 
function addItemToBudgetsListArea(key, value) { 
    // at this point there is only one key/value in datum object 
    const divElement = document.createElement("div"); 
 
    // creating the checkbox 
    const listItemCheckBoxElement = document.createElement("input"); 
    listItemCheckBoxElement.setAttribute("type", "checkbox"); 
    listItemCheckBoxElement.setAttribute("name", "checkBoxName"); 
    listItemCheckBoxElement.setAttribute("class", "checkBoxClass"); 
 
    // create the label that goes with the checkbox 
    const checkBoxLabelElement = document.createElement("label"); 
    checkBoxLabelElement.setAttribute("for", "checkBoxName"); 
 
  
    // getting the text that will be placed on the label 
    checkBoxLabelElement.textContent = `${key} - $${value}  `; 
    listItemCheckBoxElement.setAttribute("id", key); 

    // creating a button for each budget item
    const customizeBudgetButton = document.createElement("button");
    customizeBudgetButton.textContent = "Customize Budget";
    customizeBudgetButton.addEventListener("click", () => {
        // Pass the budget name to the new page
        navigateToCustomizePage(key);
    });
 
    // place a <br>
    const breakElement = document.createElement("br"); 
 
    // appending the new elements into the <div> 
    divElement.appendChild(listItemCheckBoxElement); 
    divElement.appendChild(checkBoxLabelElement); 
    divElement.appendChild(customizeBudgetButton);
    divElement.appendChild(breakElement);
    divElement.appendChild(breakElement);  
 
 
    // appending the new <div> into the existing <div> with id listOfItems 
    const listDivElement = document.getElementById("listOfItems"); 
    listDivElement.appendChild(divElement); 
} 
 
// create an input text field and an associate button to enter new item  
// into the budgets list 
function addNewItem() { 
    // creating the div element 
    const divElement = document.createElement("div"); 
 
    // creating the input text element 
    const itemInputTextElement = document.createElement("input"); 
    itemInputTextElement.setAttribute("type", "text"); 
    itemInputTextElement.setAttribute("size", 15); 
    itemInputTextElement.setAttribute("id", "newItemDescription"); 
 
    const quantityInputTextElement = document.createElement("input"); 
    quantityInputTextElement.setAttribute("type", "text"); 
    quantityInputTextElement.setAttribute("size", 15); 
    quantityInputTextElement.setAttribute("id", "newItemQuantity"); 
 
    // creating a button to add the new budget into the list the text entered 
    const addNewButton = document.createElement("input"); 
    addNewButton.setAttribute("type", "button"); 
    addNewButton.setAttribute("id", "addNewButtonID"); 
    addNewButton.setAttribute("value", "Add New Item"); 
    addNewButton.addEventListener("click", addNewItemToBudgetList); 
 
    // appending elements into the DOM under the already existing <div> (see HTML file)  
    const itemListDiv = document.getElementById("inputForNewItem"); 
    itemListDiv.appendChild(itemInputTextElement); 
    itemListDiv.appendChild(quantityInputTextElement); 
    itemListDiv.appendChild(addNewButton); 
} 
 
  
function addNewItemToBudgetList() { 
    // getting the text that will be placed on the label 
    const itemTextDescriptionElement = document.getElementById("newItemDescription"); 
    const quantityInputTextElement = document.getElementById("newItemQuantity"); 
    addItemToBudgetsListArea(itemTextDescriptionElement.value, quantityInputTextElement.value); 
 
    // removing the input field and the button associated with entering the new item 
    const itemListDiv = document.getElementById("inputForNewItem"); 
 
    // removing the temporary fields to enter the new data 
    itemListDiv.removeChild(itemTextDescriptionElement); 
    itemListDiv.removeChild(quantityInputTextElement); 
    itemListDiv.removeChild(document.getElementById("addNewButtonID")); 
 
    // adding item in the local storage, use description as the key and quantity as the value, both can be accesed later
    localStorage.setItem(itemTextDescriptionElement.value, quantityInputTextElement.value);
} 
 
function selectAllItems() { 
    // getting a list of the DOM elements that have class name checkBoxClass 
    const checkBoxList = document.getElementsByClassName("checkBoxClass"); 
 
    // loop over the list and set the checkbox to true 
    for (let i = 0; i < checkBoxList.length; i++) { 
        checkBoxList[i].checked = true; 
    } 
} 
 
function deleteSelectedItems() { 
    // getting a list of the DOM elements that have class name checkBoxClass 
    const checkBoxList = document.getElementsByClassName("checkBoxClass"); 
 
    // looping over the list and removing the parent <div>. 
    // by doing so, the checkbox and the associated label are removed 
    for (let i = checkBoxList.length - 1; i >= 0; i--) { 
        if (checkBoxList[i].checked === true) { 
 
            // add command to remove the item from the local storage here 
            //  listItemCheckBoxElement id values are set to the value of the localStorage key
            localStorage.removeItem(checkBoxList[i].id)
            // removing the deleted item from the list area 
            checkBoxList[i].parentElement.remove(); 
        } 
    } 
} 