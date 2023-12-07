window.addEventListener("load", setup); 
 
function setup() { 
    addListeners(); 
    const data = retrieveItemsFromLocalStorage(); 
    populateBudgetsList(data); 
} 
 
// add listeners to the buttons 
function addListeners() { 
    document.getElementById("addNewItemButton").addEventListener("click", addNewItem); 
    document.getElementById("deleteSelectedItemsButton").addEventListener("click", deleteSelectedItems); 
    document.getElementById("selectAllItemsButton").addEventListener("click", selectAllItems); 
} 
 
function retrieveItemsFromLocalStorage() {    
//     create an empty data array. This array will be populated 
//     with item objects from the local storage 
    let savedList = [];

    for( let i=0; i<localStorage.length; i++){
       
        let item = new Object();

        item.key = localStorage.key(i);
        item.value = localStorage.getItem(item.key);
        savedList.push(item);
    } 

    return savedList
} 
 
function populateBudgetsList(data) { 
    
    for(let i=0; i<data.length; i++){
        addItemToBudgetsListArea(data[i].key, data[i].value);
    }
} 
 
function addItemToBudgetsListArea(key, value) { 
    const divElement = document.createElement("div"); 
    divElement.id = key;

    // creating the checkbox 
    const listItemCheckBoxElement = document.createElement("input"); 
    listItemCheckBoxElement.setAttribute("type", "checkbox"); 
    listItemCheckBoxElement.setAttribute("name", "checkBoxName"); 
    listItemCheckBoxElement.setAttribute("class", "checkBoxClass"); 
 
    // create the label that goes with the checkbox 
    const checkBoxLabelElement = document.createElement("label"); 
    checkBoxLabelElement.setAttribute("for", "checkBoxName"); 
 
  
    // getting the text that will be placed on the label 
    // categories are stored in the value string of each budget key, value pair, so
    // if a budget has categories, category values are removed from the value string
    let hasCategories = false;
    let valuesArray = [];
    if (value.includes(',')){
        hasCategories = true;
        valuesArray = value.split(',').map(value => value.trim());
        checkBoxLabelElement.textContent = `${key} - $${valuesArray[0]}  `;
    }
    else{
        checkBoxLabelElement.textContent = `${key} - $${value}  `; 
    }
    listItemCheckBoxElement.setAttribute("id", key); 

    // creating a button for each budget item
    const customizeBudgetButton = document.createElement("button");
    customizeBudgetButton.textContent = "Add Category";
    customizeBudgetButton.addEventListener("click", () => {
        // Pass the budget name to the new page
        addNewCategory(key);
    });
 
    const breakElement = document.createElement("br"); 
 
    // appending the new elements into the <div> 
    divElement.appendChild(listItemCheckBoxElement); 
    divElement.appendChild(checkBoxLabelElement); 
    divElement.appendChild(customizeBudgetButton);
    divElement.appendChild(breakElement);
 
    // appending the new <div> into the existing <div> with id listOfItems 
    const listDivElement = document.getElementById("listOfItems"); 
    listDivElement.appendChild(divElement); 

    // if the budget has categories, call a function to add categories to the view
    if(hasCategories){
        for (let i = 1; i < valuesArray.length/2; i++) {
            addItemToCategoriesListArea(key, valuesArray[i], valuesArray[i+1]);
        }
    }
} 
 
// create an input text field and an associate button to enter new item  
// into the budgets list 
function addNewItem() { 
 
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

function addNewCategory(key){
    // creating the input text element 
    const itemInputTextElement = document.createElement("input"); 
    itemInputTextElement.setAttribute("type", "text"); 
    itemInputTextElement.setAttribute("size", 15); 
    itemInputTextElement.setAttribute("id", "newCategoryDescription"); 
 
    const quantityInputTextElement = document.createElement("input"); 
    quantityInputTextElement.setAttribute("type", "text"); 
    quantityInputTextElement.setAttribute("size", 15); 
    quantityInputTextElement.setAttribute("id", "newCategoryQuantity"); 
 
    // creating a button to add the new budget into the list the text entered 
    const addNewCategoryButton = document.createElement("input"); 
    addNewCategoryButton.setAttribute("type", "button"); 
    addNewCategoryButton.setAttribute("id", "addNewCategoryButtonID"); 
    addNewCategoryButton.setAttribute("value", "Add New Item"); 
    addNewCategoryButton.addEventListener("click", function() {
        addNewItemToCategoryList(key);
    }); 
 
    // appending elements into the DOM under the already existing <div> (see HTML file)  
    const itemListDiv = document.getElementById(key); 
    itemListDiv.appendChild(itemInputTextElement); 
    itemListDiv.appendChild(quantityInputTextElement); 
    itemListDiv.appendChild(addNewCategoryButton); 
}

function addNewItemToCategoryList(key){

    // getting the text that will be placed on the label 
    const itemTextDescriptionElement = document.getElementById("newCategoryDescription"); 
    const quantityInputTextElement = document.getElementById("newCategoryQuantity"); 
    const addCategoryButton = document.getElementById("addNewCategoryButtonID");
    addItemToCategoriesListArea(key, itemTextDescriptionElement.value, quantityInputTextElement.value); 
 
    // removing the input field and the button associated with entering the new item 
    const itemListDiv = document.getElementById(key); 
 
    // removing the temporary fields to enter the new data 
    itemListDiv.removeChild(itemTextDescriptionElement); 
    itemListDiv.removeChild(quantityInputTextElement); 
    itemListDiv.removeChild(addCategoryButton);
 
    // adding item in the local storage, use description as the key and quantity as the value, both can be accesed later
    let budgetVal = localStorage.getItem(key);
    budgetVal = budgetVal + ", " + itemTextDescriptionElement.value + ", " + quantityInputTextElement.value;
    localStorage.removeItem(key);
    localStorage.setItem(key, budgetVal);
}

function addItemToCategoriesListArea(budget, key, value){

    const divElement = document.createElement("div"); 
    divElement.setAttribute("class", "category");

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
 
    // place a <br>
    const breakElement = document.createElement("br"); 
 
    // appending the new elements into the <div> 
    divElement.appendChild(listItemCheckBoxElement); 
    divElement.appendChild(checkBoxLabelElement); 
    divElement.appendChild(breakElement);

 
    // appending the new <div> into the existing <div> with id listOfItems 
    const budgetDivElement = document.getElementById(budget); 
    budgetDivElement.appendChild(divElement); 

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


module.exports = { retrieveItemsFromLocalStorage };