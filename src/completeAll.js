import { tasks, taskPopulate, setStorage } from '../modules/functions.js';

const removeCompletedTask = () => {
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
export default removeCompletedTask;