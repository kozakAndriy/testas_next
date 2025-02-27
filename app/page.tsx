'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.body.style.background = "rgb(89, 121, 212)";
  }, []);



  return <div className='flex space-x-5 justify-center items-center text-center flex-col lg:flex-row m-5'>

    <Link href="https://kozakandriy.github.io/TestAS/" className='bg-white rounded-xl p-2 cursor-pointer flex flex-col justify-center items-center'>
      Lateinische Quadrate

      <Image className='border-2'
        src='/latin_squares.png'
        alt='Bild von Lateinischen Quadraten'
        width={500}
        height={0}
      ></Image>
    </Link>
    <Link href="math_equations">
      Mathematische Gleichungen
    </Link>
    <Link href="figural_sequences" className='bg-white rounded-xl p-2 cursor-pointer flex flex-col justify-center items-center'>
      Figurale Sequenzen
      <Image className='border-2'
        src='/figural_sequences.png'
        alt='Bild von Figuralen Sequenzen'
        width={500}
        height={0}
      ></Image>
    </Link>

  </div >

}
