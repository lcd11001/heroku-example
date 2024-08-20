import { Room, Client } from "@colyseus/core";
import { TicTacToeState } from "./schema/TicTacToeState";

export class TicTacToeRoom extends Room<TicTacToeState> {
  maxClients = 2;
  playerSymbols: Map<string, string> = new Map();

  onCreate(options: any) {
    this.setState(new TicTacToeState());

    this.onMessage("make_move", (client, message) => {
      const { index } = message;
      const playerSymbol = this.playerSymbols.get(client.sessionId);

      if (this.state.board[index] === "" && this.state.currentPlayer === playerSymbol) {
        this.state.board[index] = playerSymbol;
        this.state.currentPlayer = playerSymbol === "X" ? "O" : "X";
        this.checkWinner(client.sessionId);
      }
    });
  }

  onJoin(client: Client, options: any) {
    if (this.clients.length === 1) {
        this.playerSymbols.set(client.sessionId, "X");
      this.state.currentPlayer = "X";
    } else if (this.clients.length === 2) {
      this.playerSymbols.set(client.sessionId, "O");
    }
    console.log(client.sessionId, "joined! with symbol", this.playerSymbols.get(client.sessionId));
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.playerSymbols.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  checkWinner(id: string) {
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
        this.broadcast("winner", { winner: id, line: combination });
        this.state.reset();
        break;
      }
    }
  }
}