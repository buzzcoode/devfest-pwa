let tasks = []

function addTask() {
    const taskInput = document.getElementById('taskInput')
    const taskValue = taskInput.value.trim()
    if (taskValue !== '') {
        tasks.push({ title: taskValue, completed: false })
        taskInput.value = ''
        renderTasks()
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed
    renderTasks()
}

function deleteTask(index) {
    tasks.splice(index, 1)
    renderTasks()
}

function renderTasks() {
    const taskList = document.getElementById('taskList')
    taskList.innerHTML = ''
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.textContent = task.title;
        li.classList.add('mb-1');
        if (task.completed) {
            li.classList.add('line-through', 'text-gray-500')
        }

        li.addEventListener('click', () => toggleTask(index))
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Excluir'
        deleteButton.classList.add('ml-2', 'px-2', 'py-1', 'bg-red-500', 'text-white', 'rounded', 'hover:bg-red-600', 'focus:outline-none', 'focus:bg-red-600')
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation()
            deleteTask(index)
        })

        li.appendChild(deleteButton)
        taskList.appendChild(li)
    })
}

renderTasks()
