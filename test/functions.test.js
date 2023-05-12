import { JSDOM } from 'jsdom';

import {
  removeTask,
  addList,
  tasks,
  taskEntry,
} from '../modules/functions.js';

import MockStorage from './mockstorage.js';

const mockLocalStorage = new MockStorage();

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

describe('update the change', () => {
  test('checkbox change updates task and calls setStorage', () => {
    // set up the tasks array and add a mock setStorage function
    const taskData = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: true },
      { description: 'Task 3', completed: false },
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
