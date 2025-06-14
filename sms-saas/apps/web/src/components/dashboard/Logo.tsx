import Link from 'next/link';
import React from 'react'
import { ScissorsLineDashed } from "lucide-react";
import { buttonVariants } from '../ui/button';

const Logo = () => {
  return (
    <Link href={"/dashboard"}
    className={buttonVariants({
      className: 
      "hidden md:flex navLink !mb-10 lg:hover:bg-transparent",
      variant:"ghost",
      size:"lg",
    })}
    >
      <ScissorsLineDashed className='h-6 w-6 shrink-0 lg:hidden'/>
      <p className={`font-semibold text-xl hidden lg:block`}>InstaGram</p>
    </Link>
  )
}

export default Logo