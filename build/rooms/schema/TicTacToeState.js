"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeState = void 0;
const schema_1 = require("@colyseus/schema");
class TicTacToeState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.board = new schema_1.ArraySchema("", "", "", "", "", "", "", "", "");
        this.currentPlayer = "";
    }
    reset() {
        this.resetBoard();
        this.currentPlayer = Math.random() > 0.5 ? "X" : "O";
    }
    resetBoard() {
        // Colyseus Schema isn't implemented fill() method yet
        //this.board = this.board.fill("");
        this.board = new schema_1.ArraySchema("", "", "", "", "", "", "", "", "");
    }
}
exports.TicTacToeState = TicTacToeState;
__decorate([
    (0, schema_1.type)(["string"])
], TicTacToeState.prototype, "board", void 0);
__decorate([
    (0, schema_1.type)("string")
], TicTacToeState.prototype, "currentPlayer", void 0);
