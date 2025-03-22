"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(8080, {
    cors: {
        origin: "http://localhost:5173",
    },
});
const users = [];
const items = {
    Chair: {
        name: "Chair",
        size: [1, 1],
    },
    Sink: {
        name: "Sink",
        size: [2, 2],
    },
    Cuttingtable: {
        name: "Cuttingtable",
        size: [2, 2],
    },
    Roundtable: {
        name: "Roundtable",
        size: [2, 2],
    },
    Oven: {
        name: "Oven",
        size: [2, 2],
    },
    Fridge: {
        name: "Fridge",
        size: [2, 2],
    },
    BigVegTable: {
        name: "BigVegTable",
        size: [3, 2],
    },
};
const map = {
    size: [10, 10],
    subdivisions: 2,
    items: [
        Object.assign(Object.assign({}, items.Chair), { gridPosition: [4, 11], rotation: 1 }),
        Object.assign(Object.assign({}, items.Chair), { gridPosition: [4, 16], rotation: 3 }),
        Object.assign(Object.assign({}, items.Sink), { gridPosition: [8, 4] }),
        Object.assign(Object.assign({}, items.Cuttingtable), { gridPosition: [11, 4] }),
        Object.assign(Object.assign({}, items.Roundtable), { gridPosition: [4, 13] }),
        Object.assign(Object.assign({}, items.Oven), { gridPosition: [14, 4] }),
        Object.assign(Object.assign({}, items.Fridge), { gridPosition: [17, 4], rotation: 1 }),
        Object.assign(Object.assign({}, items.BigVegTable), { gridPosition: [11, 10] }),
    ],
};
io.on("connection", (socket) => {
    console.log("a user connected");
    users.push({ id: socket.id, position: getRandomPosition() });
    io.emit("users", users);
    socket.emit("hello", { map, users, id: socket.id, items });
    socket.on("move", (position) => {
        const user = users.find((user) => user.id === socket.id);
        if (user) {
            user.position = position;
            io.emit("users", users);
        }
    });
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        users.splice(users.findIndex((user) => user.id === socket.id), 1);
        io.emit("users", users);
    });
});
function getRandomPosition() {
    return [Math.random() * map.size[0], 0, Math.random() * map.size[1]];
}
