// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('#addbutton');
    const playerContainer = createPlayerContainer();
    document.body.appendChild(playerContainer);

    addButton.addEventListener('click', handleAddPlayer);
    getPlayersFromDB();
});

// Create the player container div
function createPlayerContainer() {
    const div = document.createElement('div');
    div.id = 'player-container';
    return div;
}

// Fetch all players from DB and render them
async function getPlayersFromDB() {
    try {
        const response = await fetch('http://localhost:8000/api/players');
        const players = await response.json();
        renderPlayers(players);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

// Handle adding a new player
async function handleAddPlayer() {
    const inputs = document.querySelectorAll('.myinputs');
    const newPlayer = {
        FirstName: inputs[0].value,
        LastName: inputs[1].value,
        Country: inputs[2].value,
        PlayerScore: parseInt(inputs[3].value)
    };

    try {
        const response = await fetch('http://localhost:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer),
        });

        const players = await response.json();
        renderPlayers(players);
    } catch (err) {
        console.error('Error adding player:', err);
    }
}

// Render the full player list
function renderPlayers(players) {
    const container = document.querySelector('#player-container');
    container.innerHTML = ''; // Clear previous content
    players.forEach(player => {
        const playerElement = createPlayerElement(player);
        container.appendChild(playerElement);
    });
}

// Create a DOM element for one player
function createPlayerElement(player) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';

    const nameDiv = createInfoDiv('name', `${player.FirstName} ${player.LastName}`);
    const countryDiv = createInfoDiv('country', player.Country);
    const scoreDiv = createInfoDiv('score', player.PlayerScore);

    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';

    const deleteBtn = createCircleButton('D', async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/players`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: player.FirstName
            });
            const updatedPlayers = await response.json();
            renderPlayers(updatedPlayers);
        } catch (error) {
            console.error('Failed to delete player:', error);
        }
    });

    const addBtn = createCircleButton('+5', async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/players/${player._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const updatedPlayers = await response.json();
            renderPlayers(updatedPlayers);
        } catch (error) {
            console.error('Failed to add score:', error);
        }
    });

    const subtractBtn = createCircleButton('-5', async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/players/subtract/${player._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const updatedPlayers = await response.json();
            renderPlayers(updatedPlayers);
        } catch (error) {
            console.error('Failed to subtract score:', error);
        }
    });

    actionDiv.append(deleteBtn, addBtn, subtractBtn);
    playerDiv.append(nameDiv, countryDiv, scoreDiv, actionDiv);

    return playerDiv;
}

// Utility: Create a div with content
function createInfoDiv(className, textContent) {
    const div = document.createElement('div');
    div.className = className;
    div.textContent = textContent;
    return div;
}

// Utility: Create a button with a callback
function createCircleButton(label, onClick) {
    const btn = document.createElement('div');
    btn.className = 'circle';
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
}
