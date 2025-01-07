import { WebSocket } from "ws";
import {Chess }from "chess.js";
import { MOVE, GAME_OVER, INIT_GAME } from "./messages";


export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  public startTime: Date;
  private moveCount = 0;


constructor(player1: WebSocket, player2: WebSocket){
  this.player1 = player1;
  this.player2 = player2;
  this.startTime = new Date();
  this.board = new Chess();

  this.player1.send(JSON.stringify({
    type: INIT_GAME,
    payload:{
      color:'white',
    }
  }));
  this.player2.send(JSON.stringify({
    type: INIT_GAME,
    payload:{
      color:'black'
    }
  }))
}


makeMove(socket: WebSocket, move: {
  from: string,
  to: string
}){

  if (this.moveCount % 2 === 0 && socket !== this.player1) {
    return ;
  }
  if (this.moveCount % 2 !== 0 && socket !== this.player2) {

    return ;
  }
  try {
    this.board.move(move);
  } catch (e) {
    console.log(e);
    return;
  }


  //  GAME_OVER
  if (this.board.isGameOver()) {
    // send the message to player 1
    this.player1.send(JSON.stringify({
      type: GAME_OVER,
      payload: {
        winner: this.board.turn() === 'w' ? 'black' : 'white'
      }
    }))
    // sending message to player 2 
    this.player2.send(JSON.stringify({
      type: GAME_OVER,
      payload: {
        winner: this.board.turn() === 'w' ? 'black' : 'white'
        }
    }))
    return;
  }

  // moving Steps -->Message on Both Side of their Moves
  if (this.moveCount % 2 === 0) {
    this.player2.send(JSON.stringify({
      type: MOVE,
      payload: move
    }))
  } else {
    this.player1.send(JSON.stringify({
      type: MOVE,
      payload: move
    }))
  }
  this.moveCount++;

}
 
}
