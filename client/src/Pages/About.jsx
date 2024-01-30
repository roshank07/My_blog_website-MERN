import React from 'react'

function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div className=''>
          <h1 className='text-3xl font-semibold text-center my-7'>About Roshan's blog </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            Welcome to Roshan's blog. The Purpose of this website is to share the knowledge of Singlestore that i gained
            from my last professional Experience. The main idea is to pass singlestore knowledge to as many people as possible.
            I know that we don't have enough external documents/blogs about Singlestore as this is new database 
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
