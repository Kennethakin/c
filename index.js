document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = input.value;
        
        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            list.removeChild(li);
        });

        // Append the delete button to the list item
        li.appendChild(deleteBtn);

        // Append the list item to the list
        list.appendChild(li);

        // Clear the input
        input.value = '';
    });
});
