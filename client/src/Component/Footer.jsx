import React from 'react';
import {Link} from 'react-router-dom'
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const Footers=()=>{
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r 
            from-blue-500 via-purple-500 to-pink-500
             rounded-lg text-white'>Roshan's</span>
            Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" target='_blank'>Roshan's Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Me" />
              <Footer.LinkGroup col>
              <Footer.Link href="https://www.linkedin.com/in/roshan-purbey-824783168" target='_blank' >LinkedIn</Footer.Link>
                <Footer.Link href="https://github.com/roshank07" target='_blank'>Github</Footer.Link>
                <Footer.Link href="https://discord.gg/u8nh5sZq" target='_blank' >Discord</Footer.Link>

              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Roshan's blog" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            {/* <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} /> */}
            <Footer.Icon href="https://www.linkedin.com/in/roshan-purbey-824783168" target='_blank' icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footers;


