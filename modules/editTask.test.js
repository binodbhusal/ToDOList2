import { JSDOM } from 'jsdom';
import { tasks, setStorage } from './functions.js';
import editTask from './editTask.js';

// Mock the required functions and objects
jest.mock('../modules/functions.js', () => ({
  tasks: [{ description: 'Task 1' }, { description: 'Task 2' }],
  setStorage: jest.fn(),
}));

describe('editTask', () => {
  let cleanup;

  beforeEach(() => {
    // Create a new JSDOM instance before each test
    const dom = new JSDOM('<!DOCTYPE html><body></body>');
    global.document = dom.window.document;
    cleanup = () => {
      global.document = undefined;
    };
  });

  afterEach(() => {
    cleanup();
  });

  test('Updates the description of a task', () => {
    // Test setup
    const index = 1;
    const label = global.document.createElement('label');
    label.setAttribute('for', `${index + 1}`);
    label.innerText = 'Task 2';
    global.document.body.appendChild(label);

    // Call the editTask function
    editTask(index);

    // Check that the label was replaced with an input element
    const input = global.document.querySelector('.txtInput');
    expect(input).toBeDefined();
    expect(input.value).toBe('Task 2');

    // Simulate saving the changes
    const newText = 'Updated Task Description';
    input.value = newText;
    const event = document.createEvent('Event');
    event.initEvent('blur', true, true);
    input.dispatchEvent(event);

    // Check that the task was updated
    expect(tasks[index].description).toBe(newText);
    expect(setStorage).toHaveBeenCalledTimes(1);

    // Clean up
    if (input.parentNode) {
      input.parentNode.removeChild(input);
    }
  });
});
