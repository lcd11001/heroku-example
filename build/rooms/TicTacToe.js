"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeRoom = void 0;
const core_1 = require("@colyseus/core");
const TicTacToeState_1 = require("./schema/TicTacToeState");
class TicTacToeRoom extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 2;
        this.playerSymbols = new Map();
    }
    static async onAuth(token, req) {
        return await TicTacToeRoom.verify(token);
    }
    static async verify(token) {
        //const response = await fetch(`https://my-auth-provider.com/verify?token=${token}`);
        //const data = await response.json();
        if (token === null || token === undefined || token.trim() === "") {
            return false;
        }
        console.log("verified token", token);
        return true;
    }
    onCreate(options) {
        this.setState(new TicTacToeState_1.TicTacToeState());
        this.onMessage("move", (client, message) => {
            if (this.clients.length !== 2) {
                return;
            }
            const { index } = message;
            const playerSymbol = this.playerSymbols.get(client.sessionId);
            if (this.state.board[index] === "" && this.state.currentPlayer === playerSymbol) {
                this.state.board[index] = playerSymbol;
                this.state.currentPlayer = playerSymbol === "X" ? "O" : "X";
                this.checkWinner(client.sessionId);
            }
        });
        this.onMessage("restart", (client, _) => {
            this.state.reset();
            this.broadcast("start", this.state.currentPlayer);
        });
    }
    onJoin(client, options) {
        if (this.clients.length === 1) {
            this.playerSymbols.set(client.sessionId, "X");
        }
        else if (this.clients.length === 2) {
            this.playerSymbols.set(client.sessionId, "O");
        }
        console.log(client.sessionId, "joined! with simple", this.playerSymbols.get(client.sessionId));
        // send the player symbol
        client.send("symbol", this.playerSymbols.get(client.sessionId));
        if (this.clients.length === 2) {
            this.state.reset();
            this.broadcast("start", this.state.currentPlayer);
        }
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.playerSymbols.delete(client.sessionId);
        this.broadcast("opponent-left");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
    checkWinner(id) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[a] === this.state.board[c]) {
                this.broadcast("gameover", {
                    winner: this.state.board[a],
                    line: combination,
                    player: id
                });
                return;
            }
        }
        if (this.state.board.filter(cell => cell === "").length === 0) {
            this.broadcast("gameover", { winner: 'draw' });
        }
    }
}
exports.TicTacToeRoom = TicTacToeRoom;
