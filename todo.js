const host = "http://127.0.0.1:8080";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        const todoContent = document.createElement('span');
        todoContent.classList.add('todo-name-input');
        todoContent.textContent = `작성자 이름: ${todo.id}, 방명록 내용: ${todo.item}`;
        todoDiv.appendChild(todoContent);
        const todoTimestamp = document.createElement('span');
        todoTimestamp.classList.add('todo-timestamp');
        const formattedTimestamp = new Date(todo.timestamp).toLocaleString();
        todoTimestamp.textContent = `Time: ${formattedTimestamp}`;
        todoDiv.appendChild(todoTimestamp);

        todosContainer.appendChild(todoDiv);


        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });

        todoDiv.appendChild(deleteBtn);


    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

const todoInput = document.querySelector('.todo-input');
const todoNameInput = document.querySelector('.todo-name-input');

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
todoNameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const title = todoInput.value.trim();
    const name = todoNameInput.value.trim();

    let todoData = {
        id: name,
        item: title,
        time: new Date().toLocaleString()
    };

    if (title === '' || name === '') return;


    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            todoNameInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(id) {
    axios.delete(`${host}/todo/${id}`).then(response => {
        getTodos();
    }).catch(error => {
        console.error('Error deleting todo:', error); const host = "http://127.0.0.1:8080";
        const todosContainer = document.querySelector('.todos-container');
    });
}