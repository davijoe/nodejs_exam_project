const draggables = document.querySelectorAll('.task');
const containers = document.querySelectorAll('.swim-lane');

draggables.forEach(task => {
  task.addEventListener('dragstart', () => {
    task.classList.add('dragging');
  });
})