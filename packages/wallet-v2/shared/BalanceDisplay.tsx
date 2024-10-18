import Line from '@/assets/images/line.svg'
import Image from 'next/image'
import { SeperatorDot } from './SeperatorDot'
export const BalanceDisplay = () => {
  return (
    <div className='m-8'>
        <SeperatorDot />
        <div className='flex items-center justify-center'>
            <h2 className="text-8xl">35875 AVL</h2>
        </div>
        <SeperatorDot />
    </div>
  )
}
