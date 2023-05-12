import { JSDOM } from 'jsdom';
import { LocalStorage } from 'node-localstorage';
import {
  removeTask, getStorage, addList, tasks, taskEntry,
} from './functions.js';

const localStorage = new LocalStorage('./localstorage');

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
    localStorage.clear();
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