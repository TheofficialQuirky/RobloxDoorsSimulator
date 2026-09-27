const lockedRooms = [
    "Hotel_ChexKey",
    "Hotel_Corner_Keyroom",
    "Hotel_HallwaySideroom1",
    "Hotel_Key_LeftCurve3",
    "Hotel_Key_LeftCurve3Mirrored",
    "Hotel_Puzzle_Key1"
];

document.getElementById("generateBtn").addEventListener("click", generateRun);

function generateRun() {
    const map = document.getElementById("map");
    map.innerHTML = "";

    const roomTypes = [
        "Hotel_AltDoors1", "Hotel_AltDoors2", "Hotel_AltDoors3", "Hotel_AltHallway1",
        "Hotel_AltHallway1Mirrored", "Hotel_Backroom1", "Hotel_Backroom2",
        "Hotel_Backroom3", "Hotel_Backroom4", "Hotel_Backroom5", "Hotel_Backroom6",
        "Hotel_Backroom7", "Hotel_Backroom8", "Hotel_CellarGate1", "Hotel_Chex1",
        "Hotel_Circle1", "Hotel_CrouchHallway1", "Hotel_HallwayLong1", "Hotel_Room1",
        "Hotel_Curve1", "Hotel_Curve1_Mirrored", "Hotel_Curve2", "Hotel_Curve2_Mirrored",
        "Hotel_Downstairs1", "Hotel_Downstairs2", "Hotel_Elevators1", "Hotel_Elevators2",
        "Hotel_Elevators3", "Hotel_Hallway1", "Hotel_Hallway2", "Hotel_Hallway3",
        "Hotel_Hallway4", "Hotel_Hallway5", "Hotel_Hallway6", "Hotel_HallwayCorner1",
        "Hotel_HallwayCorner2", "Hotel_HallwayCorner3", "Hotel_HallwayCorner4",
        "Hotel_HallwayCornerOffice", "Hotel_HallwayCornerOfficeMirrored",
        "Hotel_Room1Mirrored", "Hotel_Room2", "Hotel_Room2Mirrored", "Hotel_SkinnyHallway1",
        "Hotel_SkinnyHallway2", "Hotel_SmallLibrary1", "Hotel_Squeeze1", "Hotel_Squeeze2",
        "Hotel_TJunc1", "Hotel_Upstairs1", "Hotel_WardrobeRoom", "Hotel_Window1"
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

    for (let i = 90; i <= 97; i++) {
        const greenhouseTypes = ["Greenhouse_Straight", "Greenhouse_Intersection"];
        rooms[i].type = greenhouseTypes[Math.floor(Math.random() * greenhouseTypes.length)];
    }
    
    const lockPatterns = [
        { early: 2, late: 1 },
        { early: 2, late: 2 },
        { early: 3, late: 1 },
        { early: 3, late: 2 },
        { early: 4, late: 1 }
    ];
    
    const lockedCount = Math.floor(Math.random() * 3) + 3;
    
    const validPatterns = lockPatterns.filter(p => p.early + p.late === lockedCount);
    const chosenPattern = validPatterns[Math.floor(Math.random() * validPatterns.length)];
    
    const lockedPositions = new Set();
    
    while (lockedPositions.size < chosenPattern.early) {
    const pos = Math.floor(Math.random() * 50) + 1;
    lockedPositions.add(pos);
    }
    
    while (lockedPositions.size < chosenPattern.early + chosenPattern.late) {
        const pos = Math.floor(Math.random() * 50) + 51;
        lockedPositions.add(pos);
    }
    
    lockedPositions.forEach(pos => {
        const lockedType = lockedRooms[Math.floor(Math.random() * lockedRooms.length)];
        rooms[pos - 1].type = lockedType;
    });
    
    rooms[48].type = "Hotel_LibraryEntrance";
    rooms[49].type = "Hotel_Library";
    rooms[50].type = "Hotel_LibraryExit";
    rooms[87].type = "Hotel_PreCourtyard";
    rooms[88].type = "Hotel_Courtyard";
    rooms[89].type = "Greenhouse_Intermission";
    rooms[98].type = "Greenhouse_Intermission";
    rooms[99].type = "Hotel_EndNew";

    rooms.forEach(roomData => {
        const room = document.createElement("div");
        room.className = "room";

        const number = String(roomData.number).padStart(4, "0");
        const type = roomData.type;
        const isLocked = lockedRooms.includes(type);

        room.innerHTML = isLocked
            ? `<div class="roomTop lockedTop">${number}<img src="Lock_icon.svg" class="lockIcon"></div>
            <span class="roomName">${type}</span>`
            : `<div class="roomTop">${number}</div>
            <span class="roomName">${type}</span>`;

        map.appendChild(room);
    });
}
