import React from 'react'
import {useSelector} from 'react-redux';

export default function ThemeProvider({children}) {
    const {theme}=useSelector(state=>state.theme);

  return (
    <div className={theme}>
        <div className='bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-gray-700 min-h-screen'>
        {children}
        </div>
    </div>
  )
};
