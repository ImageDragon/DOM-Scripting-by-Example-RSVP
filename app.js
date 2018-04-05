document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('div.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

//filter checkbox to hide or show the unresponded invitees
filterLabel.textContent = "Hide thoese who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);

filterCheckBox.addEventListener ('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked){
    for (let i = 0; i < lis.length; i += 1){
    let li = lis[i];
    if (li.className == 'responded'){
      li.style.display = 'block';
    }else {
      li.style.display = 'none';
    }
    }
  }else{
  for (let i = 0; i < lis.length; i += 1){
    let li = lis[i];
    li.style.display = 'block';
    }
    }
  });

//creat name lists in the input
function createLi (text) {
  function createElement (elementName, property, value){
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
  }
  
  function appendToLi(elementName, property, value) {
   const element = createElement(elementName, property, value); 
   li.appendChild(element);
    return element;
  }
  
  const li = document.createElement('li');
  appendToLi('span', 'textContent', text); 
  appendToLi('label', 'textContent', 'confirmed').appendChild(createElement('input', 'type', 'checkbox'));
  appendToLi('button', 'textContent', 'edit');
  appendToLi('button', 'textContent', 'remove');
  return li;
};

//submit button action
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value !== '') {
  var text = input.value;
  }else{
  alert( 'You should input a name');
  return;
  };
  input.value = '';
  const li = createLi(text);
  ul.appendChild(li);
});

//checkbox in list action
ul.addEventListener ('change', (event) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode; 
  if (checked){
    listItem.className = 'responded';
  }else{
    listItem.className = ''; 
  }
});

//button in list actions
ul.addEventListener ('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
     const button = event.target;
     const li = button.parentNode; 
     const ul = li.parentNode;
     const action = button.textContent;
     const nameActions = {
      remove: () => {
    ul.removeChild(li);
    }, 
    edit: () => {
  const span = li.firstElementChild;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  li.insertBefore(input, span);
  li.removeChild(span);
  button.textContent = 'save';
    }, 
      save: () => {
  const input = li.firstElementChild;
  const span = document.createElement('span');
  span.textContent = input.value;
  li.insertBefore(span, input);
  li.removeChild(input);
  button.textContent = 'edit'; 
     }
  };
  //select and run action in button's name
  nameActions[action]();   
  }
});
});