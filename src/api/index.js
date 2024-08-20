import { Client } from "colyseus.js";

const host = process.env.NODE_ENV === "production" ? "wss://my-game-server.herokuapp.com" : "ws://localhost:2567";
const client = new Client(host);

const setAuthenToken = (token) =>
{
    // https://docs.colyseus.io/authentication/#client-side
    client.auth.token = token;
}

const joinOrCreateRoom = async (roomName, options) =>
{
    return await client.joinOrCreate(roomName, options);
}

export
{
    joinOrCreateRoom,
    setAuthenToken
}