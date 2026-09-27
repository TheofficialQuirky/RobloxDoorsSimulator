document.getElementById("generateBtn").addEventListener("click", generateRun);

function generateRun() {
    const map = document.getElementById("map");
    map.innerHTML = "";

    let x = 20;
    let y = 20;

    for (let i = 0; i < 10; i++) {
        const room = document.createElement("div");
        room.style.position = "absolute";
        room.style.left = x + "px";
        room.style.top = y + "px";
        room.style.width = "120px";
        room.style.height = "60px";
        room.style.background = "#cfc";
        room.style.border = "1px solid #333";

        map.appendChild(room);

        x += 140;
    }
}
