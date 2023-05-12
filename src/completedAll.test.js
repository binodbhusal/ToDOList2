import { tasks, taskPopulate, setStorage } from '../modules/functions.js';
import removeCompletedTask from './completeAll.js';

// Mock the required functions and objects
jest.mock('../modules/functions.js', () => ({
  tasks: [
    { description: 'Task 1', completed: true },
    { description: 'Task 2', completed: false },
    { description: 'Task 3', completed: true },
  ],
  taskPopulate: jest.fn(),
  setStorage: jest.fn(),
}));

describe('removeCompletedTask', () => {
  test('Removes completed tasks', () => {
    // Call the removeCompletedTask function
    removeCompletedTask();

    // Check that completed tasks were removed
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe('Task 2');

    // Check that taskPopulate and setStorage were called
    expect(taskPopulate).toHaveBeenCalledTimes(1);
    expect(setStorage).toHaveBeenCalledTimes(1);
  });
});
