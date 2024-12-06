import React from 'react'
import logo from '../assets/logo.jpg'
import Search from './Search'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()

    console.log("location",location)
    console.log("ismobile",isMobile)

    //console.log('isSearchPage',isSearchPage)

  return (
    <header className='h-40 lg:h-20 lg:shadow-md sticky top-0 bg-red-500 flex  flex-col justify-center gap-1'>
        <div className='container mx-auto flex items-center  px-2 justify-between'>

       

          {/**logo */}

                <div className='h-full'>
                    <div className='h-full flex justify-center items-center'>
                        <img 
                            src={logo}
                            width={110}
                            height={80}
                            alt='logo'
                            className='hidden lg:block'
                        />

                     <img 
                        src={logo}
                        width={120}
                        height={80}
                        alt='logo'
                        className='lg:hidden'
                     />
                    </div>
                </div>
                {/**Search */}
                <div className='hidden lg:block'>
                    <Search/>
                </div>

                {/**login and my cart */}
                <div className=''>
                    <button className='text-neutral-600 lg:hidden'>
                        <FaRegUserCircle size={26}/>
                    </button>
                    <div className='hidden lg:block'>
                        Login and my cart
                    </div>
                    
                </div>
        </div>

        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>
        
    </header>
  )
}

export default Header
