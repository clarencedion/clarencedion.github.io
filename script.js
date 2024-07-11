document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.kanban-items');

    columns.forEach(column => {
        new Sortable(column, {
            group: 'shared',
            animation: 150,
        });
    });
});

function editCard(cardElement) {
    const modal = document.getElementById("editModal");
    const form = document.getElementById("editForm");

    const cardId = cardElement.getAttribute("data-id");
    const cardTitle = cardElement.querySelector("h3").innerText;
    const cardImage = cardElement.querySelector("img").src;

    document.getElementById("cardId").value = cardId;
    document.getElementById("cardTitle").value = cardTitle;
    document.getElementById("cardImage").value = cardImage;

    modal.style.display = "block";

    form.onsubmit = function(event) {
        event.preventDefault();
        saveCard(cardElement);
    };
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveCard(cardElement) {
    const cardId = document.getElementById("cardId").value;
    const cardTitle = document.getElementById("cardTitle").value;
    const cardImage = document.getElementById("cardImage").value;

    cardElement.querySelector("h3").innerText = cardTitle;
    cardElement.querySelector("img").src = cardImage;

    closeModal();
}

function deleteCard(event, button) {
    event.stopPropagation();
    const cardElement = button.closest('.kanban-item');
    cardElement.remove();
}

function addCard(button) {
    const column = button.nextElementSibling;
    const newCard = document.createElement('div');
    const newCardId = Date.now(); // Use current timestamp as unique ID

    newCard.classList.add('kanban-item');
    newCard.setAttribute('data-id', newCardId);
    newCard.innerHTML = `
        <img src="https://via.placeholder.com/40" alt="New Card">
        <h3>New Card</h3>
        <button class="delete-btn" onclick="deleteCard(event, this)">🗑️</button>
    `;
    newCard.onclick = function() {
        editCard(newCard);
    };

    column.appendChild(newCard);
}

function addColumn() {
    const board = document.getElementById('kanbanBoard');
    const newColumn = document.createElement('div');
    const newColumnId = `column-${Date.now()}`;

    newColumn.classList.add('kanban-column');
    newColumn.setAttribute('data-status', newColumnId);
    newColumn.innerHTML = `
        <div class="column-header">
            <h2 contenteditable="true">New Column</h2>
            <button class="delete-column-btn" onclick="deleteColumn(this)">🗑️</button>
        </div>
        <button class="add-card-btn" onclick="addCard(this)">+ Add Card</button>
        <div class="kanban-items" id="${newColumnId}"></div>
    `;

    board.appendChild(newColumn);

    new Sortable(newColumn.querySelector('.kanban-items'), {
        group: 'shared',
        animation: 150,
    });
}

function deleteColumn(button) {
    const column = button.closest('.kanban-column');
    column.remove();
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("editModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
