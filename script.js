const lockedRooms = [
    "ChexKey",
    "Key_LeftCurve3",
    "Key_LeftCurve3Mirrored",
    "Puzzle_Key1",
    "Corner_Keyroom"
];

document.getElementById("generateBtn").addEventListener("click", generateRun);

function generateRun() {
    const map = document.getElementById("map");
    map.innerHTML = "";

    const roomTypes = [
        "AltDoors1", "AltDoors2", "AltDoors3", "AltHallway1",
        "AltHallway1Mirrored", "Backroom1", "Backroom2",
        "Backroom3", "Backroom4", "Backroom5", "Backroom6",
        "Backroom7", "Backroom8", "CellarGate1", "Chex1",
        "Circle1", "CrouchHallway1",
        "Curve1", "Curve1_Mirrored", "Curve2", "Curve2_Mirrored",
        "Downstairs1", "Downstairs2", "Elevators1", "Elevators2",
        "Elevators3", "Hallway1", "Hallway2", "Hallway3",
        "Hallway4", "Hallway5", "Hallway6", "HallwayCorner1",
        "HallwayCorner2", "HallwayCorner3", "HallwayCorner4",
        "HallwayCornerOffice", "HallwayCornerOfficeMirrored",
        "HallwayLong1", "HallwaySideroom1",
        "Room1",
        "Room1Mirrored", "Room2", "Room2Mirrored", "SkinnyHallway1",
        "SkinnyHallway2", "SmallLibrary1", "Squeeze1", "Squeeze2",
        "TJunc1", "Upstairs1", "WardrobeRoom", "Window1"
    ];

    const room0 = document.createElement("div");
    room0.className = "room";

    room0.innerHTML = `
        <div class="roomTop lockedTop">0000
            <img src="Lock_icon.svg" class="lockIcon">
        </div>
        <span class="roomName">Hotel_Reception</span>
    `;

    map.appendChild(room0);

    const rooms = [];
    for (let i = 1; i <= 100; i++) {
        const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
        rooms.push({ number: i, type });
    }

    const lockedCount = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
    const lockedPositions = new Set();

    while (lockedPositions.size < lockedCount) {
        const pos = Math.floor(Math.random() * 100) + 1; // positions 1–100
        lockedPositions.add(pos);
    }

    lockedPositions.forEach(pos => {
        const lockedType = lockedRooms[Math.floor(Math.random() * lockedRooms.length)];
        rooms[pos - 1].type = lockedType;
    });

    rooms.forEach(roomData => {
        const room = document.createElement("div");
        room.className = "room";

        const number = String(roomData.number).padStart(4, "0");
        const type = roomData.type;
        const isLocked = lockedRooms.includes(type);

        room.innerHTML = isLocked
            ? `<div class="roomTop lockedTop">${number}<img src="Lock_icon.svg" class="lockIcon"></div>
            <span class="roomName">Hotel_${type}</span>`
            : `<div class="roomTop">${number}</div>
            <span class="roomName">Hotel_${type}</span>`;

        map.appendChild(room);
    });
}
