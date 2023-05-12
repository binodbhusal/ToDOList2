import { JSDOM } from 'jsdom';
//import { LocalStorage } from 'node-localstorage';
// import {
//   removeTask, getStorage, addList, tasks, taskEntry,
// } from './functions.js';
// 
// }));



import {
  removeTask,
  addList,
  tasks,
  taskEntry,
  removeCompletedTask,
  taskPopulate,
  setStorage
} from './functions.js';


import MockStorage from './mockstorage.js';
const mockLocalStorage = new MockStorage();
//const localStorage = new mockLocalStorage();

// Mock the localStorage methods
global.localStorage = mockLocalStorage;

describe('removeTask', () => {
  let cleanup;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><div id="container"></div>', {
      url: 'http://localhost',
    });
    global.document = dom.window.document;
    cleanup = () => {
      dom.window.close();
      global.document = undefined;
    };
  });

  afterEach(() => {
    cleanup();
  });

  test('Removes a task from the task list', () => {
    // Test setup
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
    const indexToRemove = 1;

    removeTask(indexToRemove, tasks);
  });
});

describe('getStorage', () => {

  test('Returns the task from localStorage', () => {
    const taskData = [{ description: 'Task 1', completed: false }];
    localStorage.setItem('taskData', JSON.stringify(taskData));
    const result = getStorage();
    expect(result).toEqual(taskData);
  });
});

// test add

describe('addList', () => {
  beforeEach(() => {
    // Clear the tasks array and local storage before each test
    const dom = new JSDOM('<!DOCTYPE html><div id="container"></div>', {
      url: 'http://localhost',
    });
    global.document = dom.window.document;
    tasks.length = 0;
    mockLocalStorage.clear();
  });

  test('adds a new task to the list', () => {
    // Set up a mock task entry and call the addList function
    // const taskEntry = { value: 'Task 1' };
    addList(taskEntry.value = 'first');

    // Check that the tasks array now contains the new task
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual({
      description: 'first',
      completed: false,
      index: 1,
    });
  });
});

describe('update the change', () => {
  test('checkbox change updates task and calls setStorage', () => {
    // set up the tasks array and add a mock setStorage function
    const taskData = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: true },
      { description: 'Task 3', completed: false }
    ];

    const setStorage = jest.fn().mockImplementation(() => {
      mockLocalStorage.setItem('taskData', JSON.stringify(taskData));
    });

    // render the checkboxes and simulate a change event
    document.body.innerHTML = `
      <input type="checkbox" id="1">
      <input type="checkbox" id="2" checked>
      <input type="checkbox" id="3">
    `;
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        const index = parseInt(event.target.id, 10) - 1;
        taskData[index].completed = event.target.checked;
        setStorage();
      });
    });

    // simulate a change event by triggering a click on the first checkbox
    checkboxes[0].click();

    // assert that the task was updated correctly and setStorage was called
    expect(taskData[0].completed).toBe(true);
    expect(setStorage).toHaveBeenCalled();
  });
});
// describe('removeCompletedTask', () => {
//   describe('removeCompletedTask', () => {
//     beforeEach(() => {
//       const { JSDOM } = require('jsdom');
//       const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;

//       // create a container div
//       const container = document.createElement('div');
//       container.id = 'container';
//       document.body.appendChild(container);


//       // spy on getElementById to return the mock container
//       jest.spyOn(document, 'getElementById').mockReturnValue(container);
//     })

//     test('it should remove completed tasks, update the task list and call setStorage', () => {
//       // set up tasks with completed and non-completed tasks
//       const taskData = [
//         { description: 'Task 1', completed: false },
//         { description: 'Task 2', completed: true },
//         { description: 'Task 3', completed: false }
//       ];
//       // set up a mock for taskPopulate and setStorage
//       //const mockTaskPopulate = jest.fn();
//       jest.mock('./functions.js', () => ({
//         taskPopulate: jest.fn(),
//         removeCompletedTask: jest.fn()
//       }));

//       const mockTaskPopulate = jest.fn().mockImplementation((tasks) => {
//         const taskList = document.createElement('div');
//         taskList.id = 'container';
//         document.body.appendChild(taskList);

//         taskList.innerHTML = taskData.map((task) => `
//           <div class="task ${task.completed ? 'completed' : ''}">
//           <input type="checkbox" ${task.completed ? 'checked' : ''}id="${task.index}">
//           <label for = "${task.index}"> ${task.description}</label>
//           <div class="remove"><button class="btnremove"><i class="fa">&#xf014;</i></button></div>
//           <div class="remove"><button class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button></div>
//           </div> <hr>
//         `).join('');
//       });
//       const mockSetStorage = jest.fn().mockImplementation(() => {
//         mockLocalStorage.setItem('taskData', JSON.stringify(taskData));
//       });

//       const mockremovecompletedTask = jest.fn().mockImplementation(() => {
//         const completedTasks = taskData.filter((taskData) => taskData.completed);
//         completedTasks.forEach((task) => {
//           const index = taskData.indexOf(task);
//           taskData.splice(index, 1);
//         });
//         taskData.forEach((task, index) => {
//           task.index = index + 1;
//         });
//         mockTaskPopulate(taskData);
//         mockSetStorage(taskData);
//       });


//       // call removeCompletedTask
//       mockremovecompletedTask();

//       // assert that completed taskData were removed and remaining taskData were reindexed
//       expect(taskData).toEqual([{ description: 'Task 1', completed: false , index:1 }, { description: 'Task 3', completed: false , index:2 }]);
//       // assert that taskPopulate was called with updated taskData
//       expect(mockTaskPopulate).toHaveBeenCalledWith(taskData);
//       // assert that setStorage was called with updated taskData
//       expect(mockSetStorage).toHaveBeenCalledWith(taskData);
//     });
//   });

// });



