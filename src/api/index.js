import { Client } from "colyseus.js";

const host = process.env.NODE_ENV === "production" ? "wss://lcdsoft-example-daef16c8c2d3.herokuapp.com/" : "ws://localhost:2567";
const client = new Client(host);

const setAuthenToken = (token) =>
{
    // https://docs.colyseus.io/authentication/#client-side
    client.auth.token = token;
}

const joinOrCreateRoom = async (roomName, options, rootSchema) =>
{
    return await client.joinOrCreate(roomName, options, rootSchema);
}

export
{
    joinOrCreateRoom,
    setAuthenToken
}