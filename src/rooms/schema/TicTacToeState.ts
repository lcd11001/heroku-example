import { Schema, type, ArraySchema } from "@colyseus/schema";

export class TicTacToeState extends Schema {
  @type(["string"])
  board: ArraySchema<string> = new ArraySchema<string>("", "", "", "", "", "", "", "", "");

  @type("string")
  currentPlayer: string = "X";

  reset() {
    this.board.fill("");
    this.currentPlayer = "X";
  }
}