import { tasks, setStorage } from './functions.js';

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
export default editTask;