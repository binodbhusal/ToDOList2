
import { JSDOM } from 'jsdom';
//import { LocalStorage } from 'node-localstorage';
// import {
//   removeTask, getStorage, addList, tasks, taskEntry,
// } from './functions.js';
// 
// }));

// jest.mock('./functions.js', () => ({
//   getStorage: jest.fn().mockImplementation(() => {
//     const taskData = mockLocalStorage.getItem('taskData');
//     if (taskData) {
//       return JSON.parse(taskData);
//     } else {
//       return { tasks: [] };
//     }
//   }),
// }));

import {
  removeTask,
  getStorage,
  addList,
  tasks,
  taskEntry,
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
    const taskData = { description: 'Task 1', completed: false };
    mockLocalStorage.setItem('taskData', JSON.stringify(taskData));
    const result = JSON.parse(mockLocalStorage.getItem('taskData'));
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

    addList(taskEntry.value = 'task1');

    // Check that the tasks array now contains the new task
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual({
      description: 'task1',
      completed: false,
      index: 1,
    });
  });
});