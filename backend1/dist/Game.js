"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = new Date();
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'white',
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'black'
            }
        }));
    }
    makeMove(socket, move) {
        // validation Move --is user move and valid move then update the move , and send it two both 
        console.log(this.board.moves().length);
        console.log(this.board.moves());
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.log(`Early Return by 1`);
            return;
        }
        if (this.moveCount % 2 !== 0 && socket !== this.player2) {
            console.log(`Early return by 2`);
            return;
        }
        try {
            this.board.move(move);
            this.moveCount++;
        }
        catch (e) {
            console.log(e);
            return;
        }
        //  GAME_OVER
        if (this.board.isGameOver()) {
            // send the message to player 1
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            // sending message to player 2 
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            return;
        }
        // moving Steps -->Message on Both Side of their Moves
        if (this.board.moves.length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
