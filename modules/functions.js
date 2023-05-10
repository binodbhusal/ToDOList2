import { LocalStorage } from 'node-localstorage';

// Create an instance of LocalStorage
const localStorage = new LocalStorage('./localstorage');

export const getStorage = () => {
  const taskData = JSON.parse(localStorage.getItem('taskData')) || [];
  return taskData;
};

export const taskEntry = () => {
  const { document } = window;
  return document.getElementById('txtTask');
};

export const tasks = getStorage();
export const setStorage = () => {
  localStorage.setItem('taskData', JSON.stringify(tasks));
};

export const taskPopulate = (tasks) => {
  const taskList = document.getElementById('container');
  taskList.innerHTML = tasks.map((task) => `
    <div class="task ${task.completed ? 'completed' : ''}">
    <input type="checkbox" ${task.completed ? 'checked' : ''}id="${task.index}">
    <label for = "${task.index}"> ${task.description}</label>
    <div class="remove"><button class="btnremove"><i class="fa">&#xf014;</i></button></div>
    <div class="remove"><button class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button></div>

    </div> <hr>
    `).join('');

  const editTask = (index) => {
    const label = document.querySelector(`label[for='${index + 1}']`);
    const currentText = label.innerText.trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'txtInput';
    input.value = currentText;
    label.replaceWith(input);
    input.focus();
    const saveChanges = () => {
      const newText = input.value.trim();
      if (newText !== '' && newText !== currentText) {
        const newLabel = document.createElement('label');
        newLabel.htmlFor = index;
        newLabel.innerText = newText;
        input.replaceWith(newLabel);
        tasks[index].description = newText;
        setStorage();
      } else {
        label.replaceWith(label);
      }
    };

    input.addEventListener('blur', saveChanges);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveChanges();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        label.replaceWith(label);
      }
    });
  };

  const btnEdit = document.querySelectorAll('.btnEdit');
  if (btnEdit) {
    btnEdit.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        editTask(index);
      });
    });
  }
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const index = parseInt(event.target.id, 10) - 1;
      tasks[index].completed = event.target.checked;
      setStorage();
    });
  });
  const btnRemove = document.querySelectorAll('.btnremove');
  if (btnRemove) {
    btnRemove.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // eslint-disable-next-line no-use-before-define
        removeTask(index);
      });
    });
  }
};
export const removeTask = (index, tasks) => {
  for (let i = index + 1; i < tasks.length; i += 1) {
    tasks[i].index -= 1;
  }
  tasks.splice(index, 1);
  taskPopulate(tasks);
  setStorage(tasks);
};

export const addList = () => {
  const taskDescription = taskEntry.value;

  const newTask = {

    description: taskDescription,
    completed: false,
    index: tasks.length + 1,
  };
  getStorage(tasks);
  tasks.push(newTask);
  setStorage(tasks);
  taskPopulate(tasks);
  taskEntry.value = '';

  taskEntry.value = '';
};
export const removeCompletedTask = () => {
  const completedTasks = tasks.filter((task) => task.completed);
  completedTasks.forEach((task) => {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  });
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  taskPopulate(tasks);
  setStorage(tasks);
};