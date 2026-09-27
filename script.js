document.getElementById("generateBtn").addEventListener("click", generateRun);

function generateRun() {
    const map = document.getElementById("map");
    map.innerHTML = ""; // clear previous run

    const roomTypes = ["Room1", "Room2", "Room3"];

    for (let i = 0; i < 20; i++) {
        const room = document.createElement("div");
        room.className = "room";

        const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];

        // pad numbers to 4 digits (0001, 0002, etc.)
        const number = String(i + 1).padStart(4, "0");

        room.textContent = `${number} - ${type}`;

        map.appendChild(room);
    }
}
