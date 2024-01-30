import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to know more about my Projects?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout my Github.
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/roshank07?tab=repositories" target='_blank' rel='noopener noreferrer'>
                   Github
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
        </div>
    </div>
  )
}