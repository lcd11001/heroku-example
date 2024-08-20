import { Schema, type, ArraySchema } from "@colyseus/schema";

export class TicTacToeState extends Schema
{
    @type(["string"])
    board: ArraySchema<string> = new ArraySchema<string>("", "", "", "", "", "", "", "", "");

    @type("string")
    currentPlayer: string = "";

    reset()
    {
        this.resetBoard();
        this.currentPlayer = Math.random() > 0.5 ? "X" : "O";
    }

    resetBoard()
    {
        // Colyseus Schema isn't implemented fill() method yet
        //this.board = this.board.fill("");
        this.board = new ArraySchema<string>("", "", "", "", "", "", "", "", "");
    }
}