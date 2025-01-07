import { Button } from "../components/Button"
import ChessBoard from '../components/ChessBoard'
import useSocket from "../hooks/useSocket"
import { useEffect, useState } from "react";
const INIT_GAME = 'INIT_GAME';
const MOVE = 'move_game';
const GAME_OVER = 'game_over';
import  {Chess} from "chess.js";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board , setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);


    useEffect(()=>{
        if(!socket)
            return ;

        socket.onmessage = (event) =>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    console.log('Game is Initalized')
                    setBoard(chess.board());
                    setStarted(true)
                    break;

                case MOVE:
                    console.log('Move is made');
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    break; 

                case GAME_OVER:
                    console.log('Game is Over');
                    break;    

            }
        }


    },[socket]);

    if(!socket) return <div>Connecting ...</div>

  return (
     <div className="justify-center flex">
        <div className="pt-8 max-w-screen-lg w-full ">
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 w-full flex justify-center">
                    {socket && <ChessBoard chess = {chess} socket={socket} board={board} setBoard={setBoard} />}
                </div>
                <div className="col-span-2 bg-blue-200 w-full">
                    <Button onClick={()=>{
                        socket?.send(JSON.stringify({
                            type:INIT_GAME
                        }))
                    }} value = 'join'/>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Game
