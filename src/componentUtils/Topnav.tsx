import React from 'react';
import Image from 'next/image';
import SnapscoutSmall from '@/public-assets/snapscout-small.svg';
import { roboto } from '@/app/ui/fonts';
import { Button } from '@/components/ui/button';
export default function Topnav() {
  const navList = [
    {
      name: 'About',
      href: '#',
    },
    {
      name: 'Features',
      href: '#',
    },
    {
      name: 'Clients',
      href: '#',
    },
    {
      name: 'Help',
      href: '#',
    },
  ];
  return (
    <header
      className={` ${roboto.className} flex w-screen min-w-screen py-5  px-[5rem] justify-between items-center bg-slate-800 border-b-2 border-gray-400 sticky`}
    >
      <div className='flex items-center w-[70%] gap-[2rem]'>
        <div className='flex items-center '>
          <Image src={SnapscoutSmall} alt='snapscout' />
          <p className={`text-white text-2xl`}>SnapScout</p>
        </div>
        <ul className='flex w-[40%] justify-between'>
          {navList.map((list, index) => (
            <li key={index} className='text-md text-primaryText'>
              {list.name}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full pr-8 flex justify-end'>
        <Button className='text-white'>Sign In</Button>
      </div>
    </header>
  );
}
