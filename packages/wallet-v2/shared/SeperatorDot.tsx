import React from 'react'
import Image from 'next/image'
import Line from '@/assets/images/line.svg'

export const SeperatorDot: React.FC = () => {
  return (
    <div className="w-full py-8 relative">
      <Image
        src={Line}
        alt="Decorative line"
        width={100}
        height={10}
        className="w-full"
        priority
      />
    </div>
  )
}