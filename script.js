document.getElementById("generateBtn").addEventListener("click", generateRun);

function generateRun() {
    const map = document.getElementById("map");
    map.innerHTML = "";

    const roomTypes = ["Room1", "Room2", "Room3"];

    for (let i = 0; i < 20; i++) {
        const room = document.createElement("div");
        room.className = "room";

        const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];

        room.textContent = `${type} (Room ${i + 1})`;

        map.appendChild(room);
    }
}
