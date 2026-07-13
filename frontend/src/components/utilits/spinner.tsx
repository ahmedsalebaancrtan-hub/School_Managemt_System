import { Loader } from 'lucide-react'

const Spinner = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Loader className='animate-spin' size={30}/>
    </div>

  )
}

export default Spinner