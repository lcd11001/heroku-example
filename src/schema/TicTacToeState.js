// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.34
// 

const schema = require("@colyseus/schema");
const Schema = schema.Schema;
const type = schema.type;


class TicTacToeState extends Schema {
    constructor () {
        super();
        this.board = new schema.ArraySchema()
    }
}
type([ "string" ])(TicTacToeState.prototype, "board");
type("string")(TicTacToeState.prototype, "currentPlayer");

export default TicTacToeState;
