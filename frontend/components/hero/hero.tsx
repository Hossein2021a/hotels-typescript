import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <Image src="/hero.webp" priority alt='hero' width={0} height={0} sizes='100%' className='w-full md:px-[60px] px-[20px] lg:px-[100px] h-[80px] sm:h-auto' quality={100} />
  )
}

export default Hero