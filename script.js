document.getElementById("generateBtn").addEventListener("click", generateRun);

function generateRun() {
    const map = document.getElementById("map");
    map.innerHTML = "";

    const roomTypes = [
        "AltDoors1", "AltDoors2", "AltDoors3", "AltHallway1",
        "AltHallway1Mirrored", "Backroom1", "Backroom2",
        "Backroom3", "Backroom4", "Backroom5", "Backroom6",
        "Backroom7", "Backroom8", "CellarGate1", "Chex1",
        "ChexKey", "Circle1", "Corner_Keyroom", "CrouchHallway1",
        "Curve1", "Curve1_Mirrored", "Curve2", "Curve2_Mirrored",
        "Downstairs1", "Downstairs2", "Elevators1", "Elevators2",
        "Elevators3", "Hallway1", "Hallway2", "Hallway3",
        "Hallway4", "Hallway5", "Hallway6", "HallwayCorner1",
        "HallwayCorner2", "HallwayCorner3", "HallwayCorner4",
        "HallwayCornerOffice", "HallwayCornerOfficeMirrored",
        "HallwayLong1", "HallwaySideroom1", "Key_LeftCurve3",
        "Key_LeftCurve3Mirrored", "Puzzle_Key1", "Room1",
        "Room1Mirrored", "Room2", "Room2Mirrored", "SkinnyHallway1",
        "SkinnyHallway2", "SmallLibrary1", "Squeeze1", "Squeeze2",
        "TJunc1", "Upstairs1", "WardrobeRoom", "Window1"
    ];

    for (let i = 0; i < 20; i++) {
        const room = document.createElement("div");
        room.className = "room";

        const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
        const number = String(i + 1).padStart(4, "0");

        room.innerHTML = `${number}<span class="roomName">Hotel_${type}</span>`;

        map.appendChild(room);
    }
}
