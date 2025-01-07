
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button';

const Landing = () => {
    const Navigate = useNavigate();
  return (
    <div className="flex justify-center">
       <div className='pt-8 max-w-screen-lg'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex justify-center'>
                <img className='max-w-96 ' src = {"/chessboard.jpeg"}/>
            </div>
            <div className='pt-16'>
                <h1 className='text-4xl font-bold'>Play Chess Online on #1</h1>
                <p className='text-lg mt-2'>Play Chess With Your friends </p>
                <div className='mt-4'>
                    <Button value='PLAY ONLINE' onClick={()=>{Navigate('/game')}}/>
                </div>
            </div>
        </div>
       </div>
      
    </div>
  )
}

export default Landing
