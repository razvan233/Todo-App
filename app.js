const todoList = document.querySelector('.todoList');
const todoValue = document.getElementById('todo');
const myList = document.querySelector('.myList');
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', Add);
let storageData = new Array();

function Add(e) {
    e.preventDefault();
    storageData = JSON.parse(localStorage.getItem('todo'));
    const item = document.createElement('li');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    doneBtn.classList.add('doneBtn');
    deleteBtn.classList.add('deleteBtn');
    doneBtn.innerHTML = '<i class="fas fa-check"></i>'
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    if (!todoValue.value) {
        todoValue.value = 'emptyValue';
    } else {
        item.innerText = todoValue.value;
    }
    myList.appendChild(item);
    item.appendChild(doneBtn);
    item.appendChild(deleteBtn);
    doneBtn.addEventListener('click', DoneDelete);
    deleteBtn.addEventListener('click', DoneDelete);
    storageData.push(todoValue.value);
    localStorage.setItem('todo', JSON.stringify(storageData));
    todoValue.value = '';

}
document.addEventListener("DOMContentLoaded", function() {
    storageData = JSON.parse(localStorage.getItem('todo'));
    let items = JSON.parse(localStorage.getItem('todo'));
    items.forEach(myItems => {
        const item = document.createElement('li');
        const doneBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        doneBtn.classList.add('doneBtn');
        deleteBtn.classList.add('deleteBtn');
        doneBtn.innerHTML = '<i class="fas fa-check"></i>'
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
        item.innerText = myItems;
        myList.appendChild(item);
        item.appendChild(doneBtn);
        item.appendChild(deleteBtn);
        doneBtn.addEventListener('click', DoneDelete);
        deleteBtn.addEventListener('click', DoneDelete);

    });



});

function DoneDelete(e) {
    const target = e.target.className;
    const myTodo = e.target.offsetParent;

    if (target === 'doneBtn') {
        myTodo.classList.toggle('toggle');
    } else {
        myTodo.classList.add('delete');
        var deleted = false;
        myTodo.addEventListener('transitionend', function() {
            for (var i = 0; i < myList.childNodes.length; i++) {

                if (myList.children[i].innerText === myTodo.innerText && !deleted) {
                    deleted = true;

                    myList.removeChild(myList.childNodes[i]);
                    let myIndex = storageData.indexOf(myTodo.innerText);
                    storageData.splice(myIndex, 1);
                    localStorage.setItem('todo', JSON.stringify(storageData));

                }
            }
        });

    }


}