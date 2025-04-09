//**************loadTask***************
//Esperamos a que el DOM esté cargado antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('tasks');

    //cargar tareas del almacenamiento local al iniciar
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            addTaskToDOM(taskText);
        });
    };

    //Guardar tareas en el almacenamiento local
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(taskItem => taskItem.textContent.replace('Eliminar', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    //Funcion para añadir una tarea al DOM
    const addTaskToDOM = (taskText) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar'
        deleteBtn.classList.add('delete-btn');

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        //Event Listener para eliminar una tarea
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });
    };

    //Funcion para añadir una nueva tarea
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === ''){
            alert('Por favor, escribe una tarea...');
            return;
        }

        addTaskToDOM(taskText); //añadir tarea al DOM
        saveTasks(); //guardar la tarea en el almacenamiento local
        taskInput.value = ''; //limpiar campo de entrada
    };

    //Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    //cargar tareas al iniciar
    loadTasks();
});