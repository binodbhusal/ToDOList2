import { removeTask, getStorage } from './functions';
import { JSDOM } from 'jsdom';
import { LocalStorage } from 'node-localstorage';


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

    
  });
});
