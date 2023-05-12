import {
  addList, taskEntry, taskPopulate, getStorage, tasks, removeCompletedTask,
} from '../modules/functions.js';

taskEntry.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addList(tasks);
  }
});
const pageLoad = (tasks) => {
  tasks = getStorage();
  taskPopulate(tasks);
};
pageLoad();
const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    removeCompletedTask();
    taskPopulate(tasks);
  });
}