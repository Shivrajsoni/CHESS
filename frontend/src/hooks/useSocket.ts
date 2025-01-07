import { useState,useEffect } from "react";

const WS = 'ws://localhost:8080';

export default  function useSocket(){
    const [socket, setSocket] = useState<WebSocket| null>(null);

    useEffect(()=>{
        const newSocket = new WebSocket(WS);

        newSocket.onopen = () =>{
            setSocket(newSocket);
        }

        newSocket.onclose = () =>{
            newSocket.close();
        }
        
    },[])
    return socket;
}