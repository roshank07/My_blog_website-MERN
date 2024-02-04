import React from 'react';
import Hero from '../Component/portfolio/Hero';
import Projects from '../Component/portfolio/Projects';
import Skills from '../Component/portfolio/Skills';
import Education from '../Component/portfolio/Education';
import Contact from '../Component/portfolio/Contact';
import Work from '../Component/portfolio/Work';
import PortSidebar from '../Component/PortSidebar';

export default function Portfolio() {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <PortSidebar/>
      </div>
    </div>
  )
}
