let playersData = [
  {
    "id": 0,
    "playerName": "Hardik Pandya",
    "from": "MI",
    "price": "6.50 Cr",
    "isPlaying": true,
    "description": "All-rounder"
  },

  {
    "id": 1,
    "playerName": "Virat Kohli",
    "from": "RCB",
    "price": "8.00 Cr",
    "isPlaying": true,
    "description": "Batsman"
  },
  {
    "id": 2,
    "playerName": "Yuvraj Singh",
    "from": "MI",
    "price": "1.00 Cr",
    "isPlaying": false,
    "description": "Batsman"
  },
  {
    "id": 3,
    "playerName": "Chris Morris",
    "from": "RR",
    "price": "16.25 Cr",
    "isPlaying": true,
    "description": "All-rounder"
  },
  {
    "id": 4,
    "playerName": "Glenn Maxwell",
    "from": "RCB",
    "price": "14.25",
    "isPlaying": true,
    "description": "All-rounder"
  },
  {
    "id": 5,
    "playerName": "Rohit Sharma",
    "from": "MI",
    "price": "6.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
  },
  {
    "id": 6,
    "playerName": "Ishan Kishan",
    "from": "MI",
    "price": "2.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
  }
  // Add more player data here...
];

// Function to save the playersData to local storage
function savePlayersDataToLocalStorage() {
  localStorage.setItem("playersData", JSON.stringify(playersData));
}

// Function to retrieve playersData from local storage
function retrievePlayersDataFromLocalStorage() {
  const data = localStorage.getItem("playersData");
  if (data) {
    playersData = JSON.parse(data);
  }
}

// Function to get the image URL for a team (Replace 'path/to/team/icon.png' with the actual image URL)
function getTeamImageURL(teamName) {
  const teamImageURLs = {
    MI: "https://1000logos.net/wp-content/uploads/2022/08/Mumbai-Indians-Logo-768x432.png",
    RCB: "",
    // Add more team image URLs as needed
  };
  return teamImageURLs[teamName] || "https://1000logos.net/wp-content/uploads/2022/08/Mumbai-Indians-Logo-768x432.png"; // Replace with a default image URL

}

// Function to get the image URL for a player (Replace 'path/to/player/photo.png' with the actual image URL)
function getPlayerImageURL(playerName) {
  return `https://media.istockphoto.com/id/1164822188/vector/male-avatar-profile-picture.jpg?s=612x612&w=0&k=20&c=KPsLgVIwEGdDvf4_kiynCXw96p_PhBjIGdU68qkpbuI=`;
}

// Function to display teams on the homepage
function displayTeams() {
  // Get the main content element
  const mainContent = document.getElementById("content");

  // Clear the content
  mainContent.innerHTML = "";

  // Use a set to keep track of already displayed teams
  const displayedTeams = new Set();

  // Loop through the playersData and create team cards
  playersData.forEach((player) => {
    if (!displayedTeams.has(player.from)) {
      // Create a team card element
      const teamCard = document.createElement("div");
      teamCard.classList.add("card");
      teamCard.innerHTML = `
        <h2>${player.from}</h2>
        <img src="${getTeamImageURL(player.from)}" alt="${player.from}">
        <p>Player Count: <span>${getTeamPlayerCount(player.from)}</span></p>
      `;

      // Add a click event to navigate to team details page
      teamCard.addEventListener("click", () => {
        window.location.href = `team.html?team=${player.from}`;
      });

      // Append the team card to the main content
      mainContent.appendChild(teamCard);

      // Add the team to the displayedTeams set
      displayedTeams.add(player.from);
    }
  });
}

// Function to get the player count of a team
function getTeamPlayerCount(team) {
  return playersData.filter((player) => player.from === team).length;
}

// Function to display team details page
// Function to display team details page
// Function to display team details page
function displayTeamDetails() {

  const teamName = new URLSearchParams(window.location.search).get("team");

  // Get the main content element
  const mainContent = document.getElementById("content");

  // Clear the content
  mainContent.innerHTML = "";

  // Create team details element
  const teamDetails = document.createElement("div");
  teamDetails.id = "teamDetails";
  teamDetails.innerHTML = `
    <h2>${teamName}</h2>
    <img src="${getTeamImageURL(teamName)}" alt="${teamName}">
    <p>Player Count: <span>${getTeamPlayerCount(teamName)}</span></p>
    <p>Championships Won: <span>${getChampionshipsWonCount(teamName)}</span></p>
    <p>Best Batsman: <span>${getBestBatsman(teamName)}</span></p>
    <p>Best Bowler: <span>${getBestBowler(teamName)}</span></p>
  `;

  // Append team details to main content
  mainContent.appendChild(teamDetails);

  // Create player grid element
  const playerGrid = document.createElement("div");
  playerGrid.classList.add("card-grid");
  playerGrid.id = "playerGrid";

  // Loop through the playersData and create player cards
  playersData.forEach((player) => {
    if (player.from === teamName && player.playerName) { // Add a check for playerName existence
      // Create a player card element
      const playerCard = document.createElement("div");
      playerCard.classList.add("card");
      playerCard.innerHTML = `
        <h3>${player.playerName}</h3>
        <img src="${getPlayerImageURL(player.playerName)}" alt="${player.playerName}">
        <p>Team: ${player.from}</p>
        <p>Price: ${player.price}</p>
        <p>Playing Status: ${player.isPlaying ? "Playing" : "On-bench"}</p>
        <p>Role: ${player.description}</p>
      `;

      // Add a click event to navigate to player details page
      playerCard.addEventListener("click", () => {
        window.location.href = `player.html?player=${player.id}`;
      });

      // Append the player card to the player grid
      playerGrid.appendChild(playerCard);
    }

  });

  // Append player grid to main content
  mainContent.appendChild(playerGrid);
  addPlayerBtn.addEventListener("click", () => {
    const playerName = prompt("Enter the new player name:");
    if (playerName) {
      // Check if the player name is not empty or null
      const teamName = document.querySelector("#teamDetails h2").textContent;
      const price = prompt("Enter the player's price:");
      const isPlaying = confirm("Is the player currently playing?");
      const description = prompt("Enter the player's role (Batsman, Bowler, or All-rounder):");
      addNewPlayer(playerName, teamName, price, isPlaying, description);
      // After adding the new player, display the team details page again
      // displayTeamDetails();
    }
  });

}



// Function to display player details page
function displayPlayerDetails() {
  const playerId = new URLSearchParams(window.location.search).get("player");
  const player = playersData.find((player) => player.id == playerId);

  // Get the main content element
  const mainContent = document.getElementById("content");

  // Clear the content
  mainContent.innerHTML = "";

  // Create player details element
  const playerDetails = document.createElement("div");
  playerDetails.id = "playerDetails";
  playerDetails.innerHTML = `
    <h2>${player.playerName}</h2>
    <img src="${getPlayerImageURL(player.playerName)}" alt="${player.playerName}">
    <p>Team: ${player.from}</p>
    <p>Price: ${player.price}</p>
    <p>Playing Status: ${player.isPlaying ? "Playing" : "On-bench"}</p>
    <p>Role: ${player.description}</p>
  `;

  // Append player details to main content
  mainContent.appendChild(playerDetails);
}

// Function to add a new team
function addNewTeam(teamName, playerCount, championshipsWon) {
  const newTeam = {
    from: teamName,
    playerCount: playerCount,
    championshipsWon: championshipsWon
  };
  playersData.push(newTeam);
  savePlayersDataToLocalStorage(); // Save the updated data to local storage
  displayTeams(); // Re-render the homepage to show the newly added team
}

// Function to add a new player
function addNewPlayer(playerName, teamName, price, isPlaying, description) {
  const newPlayer = {
    id: playersData.length, // Assign a unique ID to the new player
    playerName: playerName,
    from: teamName,
    price: price,
    isPlaying: isPlaying,
    description: description,
  };

  // Add the new player to the playersData array
  playersData.push(newPlayer);

  // Save the updated playersData to local storage
  savePlayersDataToLocalStorage();

  // After adding the new player, display the team details page again
  displayTeamDetails();
}

// Function to search players by team code
// Function to search players by team code
function searchPlayersByTeam(teamCode) {
  const filteredPlayers = playersData.filter((player) =>
    player.from.toUpperCase() === teamCode.toUpperCase()
  );
  return filteredPlayers;
}

// Event listener for search form submission
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput) {
    const searchResults = searchPlayersByTeam(searchInput);
    displaySearchResults(searchResults);
  }
});

// Function to display search results on the homepage
function displaySearchResults(results) {
  // Get the main content element
  const mainContent = document.getElementById("content");

  // Clear the content
  mainContent.innerHTML = "";

  if (results.length === 0) {
    mainContent.innerHTML = "<p>No players found for the given team code.</p>";
  } else {
    const searchResultsGrid = document.createElement("div");
    searchResultsGrid.classList.add("card-grid");

    results.forEach((player) => {
      const playerCard = document.createElement("div");
      playerCard.classList.add("card");
      playerCard.innerHTML = `
        <h3>${player.playerName}</h3>
        <img src="path/to/player/photo.png" alt="${player.playerName}">
        <p>Team: ${player.from}</p>
        <p>Price: ${player.price}</p>
        <p>Playing Status: ${player.isPlaying ? "Playing" : "On-bench"}</p>
        <p>Role: ${player.description}</p>
      `;

      playerCard.addEventListener("click", () => {
        window.location.href = `player.html?player=${player.id}`;
      });

      searchResultsGrid.appendChild(playerCard);
    });

    mainContent.appendChild(searchResultsGrid);
  }
}


// Function to get the best batsman for a team
function getBestBatsman(teamName) {
  const teamPlayers = playersData.filter((player) => player.from === teamName);
  if (teamPlayers.length === 0) return "N/A";

  const bestBatsman = teamPlayers.reduce((prev, current) =>
    parseFloat(prev.price) > parseFloat(current.price) ? prev : current
  );

  return bestBatsman.playerName;
}

// Function to get the best bowler for a team
function getBestBowler(teamName) {
  const teamPlayers = playersData.filter((player) => player.from === teamName);
  if (teamPlayers.length === 0) return "N/A";

  const bestBowler = teamPlayers.reduce((prev, current) =>
    parseFloat(prev.price) < parseFloat(current.price) ? prev : current
  );

  return bestBowler.playerName;
}

// Function to get the total championships won by a team
function getChampionshipsWonCount(teamName) {
  const teamPlayers = playersData.filter((player) => player.from === teamName);
  if (teamPlayers.length === 0) return 0;

  const totalChampionshipsWon = teamPlayers.reduce((total, current) => {
    return total + (current.championshipsWon || 0);
  }, 0);

  return totalChampionshipsWon;
}

// Event listener to load appropriate page based on URL
window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "index.html") {
    retrievePlayersDataFromLocalStorage(); // Retrieve data from local storage
    displayTeams();
  } else if (currentPage === "team.html") {
    retrievePlayersDataFromLocalStorage(); // Retrieve data from local storage
    displayTeamDetails();
  } else if (currentPage === "player.html") {
    displayPlayerDetails();
  }
});

// Event listener for "Add Team" button click
if (document.getElementById("addTeamBtn")) {

  document.getElementById("addTeamBtn").addEventListener("click", () => {
    const teamName = prompt("Enter the new team name:");
    if (teamName) {
      const teamIcon = prompt("Enter the team icon path:");
      const playerCount = parseInt(prompt("Enter the player count:"), 10);
      const championshipWonCount = parseInt(prompt("Enter the championship won count:"), 10);
      const imageOnlineLink = prompt("Enter the image online link:");

      addNewTeam(teamName, teamIcon, playerCount, championshipWonCount, imageOnlineLink);
    }
  });
}

// Event listener for "Add Player" button click in the team details page
// Event listener for "Add Player" button click in the team details page
if (document.getElementById("content")) {
  console.log("YES");
  document.getElementById("content").addEventListener("click", (event) => {

    if (event.target.id === "addPlayerBtn") {

      const playerName = prompt("Enter the new player name:");
      if (playerName) {
        // Check if the player name is not empty or null
        const teamName = document.querySelector("#teamDetails h2").textContent;
        const price = prompt("Enter the player's price:");
        const isPlaying = confirm("Is the player currently playing?");
        const description = prompt("Enter the player's role (Batsman, Bowler, or All-rounder):");
        addNewPlayer(playerName, teamName, price, isPlaying, description);
      }
    }
  });

}  
