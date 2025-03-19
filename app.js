function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const roomLayout = document.getElementById('room-layout');
const furnitureItems = document.querySelectorAll('.furniture-item');

let draggedItem = null;

furnitureItems.forEach((item) => {
  item.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.target.style.opacity = '0.5';
  });

  item.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
    draggedItem = null;
  });
});

roomLayout.addEventListener('dragover', (e) => {
  e.preventDefault();
});

roomLayout.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedItem) {
    const clone = draggedItem.cloneNode(true);
    clone.classList.add('furniture');
    clone.style.position = 'absolute';
    clone.style.left = `${e.clientX - roomLayout.getBoundingClientRect().left}px`;
    clone.style.top = `${e.clientY - roomLayout.getBoundingClientRect().top}px`;
    clone.draggable = true;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '×'; // Trash icon or "X" symbol
    deleteButton.addEventListener('click', () => {
      roomLayout.removeChild(clone);
    });

    clone.appendChild(deleteButton);

    clone.addEventListener('dragstart', (event) => {
      event.target.style.opacity = '0.5';
      draggedItem = event.target;
    });

    clone.addEventListener('dragend', (event) => {
      event.target.style.opacity = '1';
      draggedItem = null;
    });

    roomLayout.appendChild(clone);
  }
});

roomLayout.addEventListener('dragover', (e) => {
  e.preventDefault();
});

roomLayout.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedItem && draggedItem.classList.contains('furniture')) {
    draggedItem.style.left = `${e.clientX - roomLayout.getBoundingClientRect().left}px`;
    draggedItem.style.top = `${e.clientY - roomLayout.getBoundingClientRect().top}px`;
  }
});

deleteButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete this item?')) {
    roomLayout.removeChild(clone);
  }
});

deleteButton.addEventListener('click', () => {
  clone.style.opacity = '0';
  setTimeout(() => roomLayout.removeChild(clone), 300);
});


const deleteButton = document.createElement('button');
deleteButton.className = 'delete-button';
deleteButton.innerHTML = '×'; // "X" symbol for delete
deleteButton.addEventListener('click', () => {
  roomLayout.removeChild(clone); // Remove the furniture item
});

const container = document.createElement('div');
container.classList.add('furniture-container');
container.appendChild(clone);
container.appendChild(deleteButton);

container.addEventListener('dragstart', (event) => {
  event.target.style.opacity = '0.5';
  draggedItem = event.target;
});

container.addEventListener('dragend', (event) => {
  event.target.style.opacity = '1';
  draggedItem = null;
});



trashArea.addEventListener('dragover', (e) => {
e.preventDefault();
});

trashArea.addEventListener('drop', (e) => {
e.preventDefault();
if (draggedItem && draggedItem.classList.contains('furniture-container')) {
roomLayout.removeChild(draggedItem); // Remove the furniture item
}
});

roomLayout.addEventListener('dragover', (e) => {
e.preventDefault();
});

roomLayout.addEventListener('drop', (e) => {
e.preventDefault();
if (draggedItem && draggedItem.classList.contains('furniture-container')) {
draggedItem.style.left = `${e.clientX - roomLayout.getBoundingClientRect().left}px`;
draggedItem.style.top = `${e.clientY - roomLayout.getBoundingClientRect().top}px`;
}
});