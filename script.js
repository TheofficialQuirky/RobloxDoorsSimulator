const lockedRooms = [
    "Hotel_Reception",
    "Hotel_ChexKey",
    "Hotel_Corner_Keyroom",
    "Hotel_HallwaySideroom1",
    "Hotel_Key_LeftCurve3",
    "Hotel_Key_LeftCurve3Mirrored",
    "Hotel_Puzzle_Key1"
];

const protectedRooms = new Set([
    "Hotel_LibraryEntrance",
    "Hotel_Library",
    "Hotel_LibraryExit",
    "Hotel_PreCourtyard",
    "Hotel_Courtyard",
    "Greenhouse_Intermission",
    "Hotel_EndNew"
]);

const dupeEligibleTypes = new Set([
    "Hotel_AltDoors1",
    "Hotel_AltDoors2",
    "Hotel_AltDoors3",
    "Hotel_Chex1",
    "Hotel_ChexKey",
    "Hotel_Circle1",
    "Hotel_Corner_Keyroom",
    "Hotel_Downstairs1",
    "Hotel_Downstairs2",
    "Hotel_Elevators2",
    "Hotel_Elevators3",
    "Hotel_TJunc1",
    "Hotel_Upstairs1"
]);

const protectedDoors = new Set([
    48, 49, 50, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
]);

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
        rooms.push({ number: i, type, entities: [] });
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
        if (!protectedDoors.has(pos)) lockedPositions.add(pos);
    }

    while (lockedPositions.size < chosenPattern.early + chosenPattern.late) {
        const pos = Math.floor(Math.random() * 50) + 51;
        if (!protectedDoors.has(pos)) lockedPositions.add(pos);
    }

    lockedPositions.forEach(pos => {
        const lockedType = lockedRooms[Math.floor(Math.random() * lockedRooms.length)];
        rooms[pos - 1].type = lockedType;
    });

    for (let i = 90; i <= 97; i++) {
        const greenhouseTypes = ["Greenhouse_Straight", "Greenhouse_Intersection"];
        rooms[i].type = greenhouseTypes[Math.floor(Math.random() * greenhouseTypes.length)];
    }

    rooms[48].type = "Hotel_LibraryEntrance";
    rooms[49].type = "Hotel_Library";
    rooms[50].type = "Hotel_LibraryExit";
    rooms[87].type = "Hotel_PreCourtyard";
    rooms[88].type = "Hotel_Courtyard";
    rooms[89].type = "Greenhouse_Intermission";
    rooms[98].type = "Greenhouse_Intermission";
    rooms[99].type = "Hotel_EndNew";

    const chaseStartMin = 29;
    const chaseStartMax = 46 - 5;
    let seekChaseStart = Math.floor(Math.random() * (chaseStartMax - chaseStartMin + 1)) + chaseStartMin;
    
    const seekCrescendoLength = Math.floor(Math.random() * 3) + 3;
    
    let crescendoStart = seekChaseStart - seekCrescendoLength;
    if (crescendoStart < 1) crescendoStart = 1;
    
    for (let i = 0; i < seekCrescendoLength; i++) {
        const roomIndex = crescendoStart + i - 1;

        rooms[roomIndex].seekCrescendo = true;
    }

    const chaseRooms = [
        "Hotel_SeekIntro",
        "Hotel_SeekChase",
        Math.random() < 0.5 ? "Hotel_SeekChaseIntersection" : "Hotel_SeekChaseIntersectionAlt",
        "Hotel_SeekChaseShort1",
        Math.random() < 0.5 ? "Hotel_SeekChaseIntersection" : "Hotel_SeekChaseIntersectionAlt",
        "Hotel_SeekChaseFinal"
    ];

    for (let i = 0; i < chaseRooms.length; i++) {
        const roomIndex = seekChaseStart + i - 1;

        rooms[roomIndex].type = chaseRooms[i];
        rooms[roomIndex].seekChase = true;
    }
    
    let nextRushDoor = Math.floor(Math.random() * 4) + 12;  
    
    while (nextRushDoor <= 100) {
        let spawnDoor = nextRushDoor;
        while (spawnDoor <= 100 && protectedRooms.has(rooms[spawnDoor - 1].type)) {
            spawnDoor++;
        }

        if (spawnDoor <= 100 && rooms[spawnDoor - 1].seekChase) {
            const gap = Math.floor(Math.random() * 4) + 5;
            nextRushDoor = spawnDoor + gap;
             continue;
        }
        
        const lastCrescendoIndex = crescendoStart + seekCrescendoLength - 2;
        const lastChaseIndex = seekChaseStart + chaseRooms.length - 1;
        const afterChase1 = lastChaseIndex + 1;
        const afterChase2 = lastChaseIndex + 2;
        
        if (
            spawnDoor - 1 === lastCrescendoIndex ||
            spawnDoor - 1 === afterChase1 ||
            spawnDoor - 1 === afterChase2
        ) {
            const gap = Math.floor(Math.random() * 4) + 5;
            nextRushDoor = spawnDoor + gap;
            continue;
        }
        
        if (spawnDoor <= 100) {
            const ambushChance = spawnDoor <= 50 ? 0.03 : 0.05;
            
            if (Math.random() < ambushChance) {
                rooms[spawnDoor - 1].entities.push("Ambush");
            } else {
                rooms[spawnDoor - 1].entities.push("Rush");
            }
        } else {
            break;
        }
        
        const gap = Math.floor(Math.random() * 4) + 5;
        nextRushDoor = spawnDoor + gap;
    }
    
    rooms.forEach(room => {
        if (!protectedRooms.has(room.type) && !room.seekChase) {
            if (Math.random() < 0.03) {
                room.entities.push("Eyes");
            }
        }
    });

    rooms.forEach(room => {
        if (room.type === "Greenhouse_Intersection") {
            room.entities.push("Dupe");
            return;
        }
        if (room.number < 3) return;

        if (protectedRooms.has(room.type)) return;
        if (room.seekChase) return;

        if (!dupeEligibleTypes.has(room.type)) return;

        if (Math.random() < 0.5) {
            room.entities.push("Dupe");
        }
    });

    rooms.forEach(roomData => {
    const room = document.createElement("div");
    room.className = "room";

    const number = String(roomData.number).padStart(4, "0");
    const type = roomData.type;
    const isLocked = lockedRooms.includes(type);

    let entityHTML = `<div class="roomEntities">`;

    roomData.entities.forEach(entity => {
        let boxClass = "rushBox";
        let iconClass = "rushIcon";

        if (entity === "Ambush") {
            boxClass = "ambushBox";
            iconClass = "ambushIcon";
        }

        if (entity === "Eyes") {
            boxClass = "eyesBox";
            iconClass = "eyesIcon";
        }

        if (entity === "Dupe") {
            boxClass = "dupeBox";
            iconClass = "dupeIcon";
        }
        
        entityHTML += `
            <div class="entityBox ${boxClass}">
                <img src="${entity}image.png" class="${iconClass}">
            </div>
        `;
    });
    
    entityHTML += `</div>`;
    
    room.innerHTML = isLocked
        ? `<div class="roomTop lockedTop">${number}<img src="Lock_icon.svg" class="lockIcon"></div>
        <span class="roomName">${type}</span>
        ${entityHTML}`
        : `<div class="roomTop">${number}</div>
        <span class="roomName">${type}</span>
         ${entityHTML}`;
    
    if (roomData.seekChase) {
        room.innerHTML = `
            <div class="roomTop">
                ${number}
                <img src="Seek_Icon.png" class="seekIcon">
            </div>
            <span class="roomName">${type}</span>
            ${entityHTML}
        `;
    }

    if (roomData.seekCrescendo) {
        room.innerHTML = `
            <div class="roomTop">
                ${number}
                <img src="SeekCrescendo_Icon.png" class="seekCrescendoIcon">
            </div>
            <span class="roomName">${type}</span>
            ${entityHTML}
        `;
    }
    
    map.appendChild(room);
    });
}
