import React from 'react'
import logo from '../assets/logo.jpg'
import Search from './Search'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";

const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()

    const isSearchPage = location.pathname === '/search'
    const navigate = useNavigate()

    const redirectToLoginPage = () =>{
        navigate('/login')
    }



   

  return (
    <header className='h-40 lg:h-20 lg:shadow-md sticky top-0  flex  flex-col justify-center gap-1'>
        {
            !(isSearchPage && isMobile) && (
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

                          {/**Desktop**/}
                          <div className='hidden lg:flex items-center gap-10'>
                               <button onClick={redirectToLoginPage} className='text-lg px-2' >Login</button>
                               <button className='flex items-center gap-2 bg-green-700 hover:bg-green-800 px-3 py-3 rounded text-white'>
                                  <div className='animate-bounce'>
                                    <BsCart4 size={27}/>
                                  </div>
                                  <div className='font-semibold'>
                                     <p>My Cart</p>
                                  </div>
                               </button>
                          </div>
                          
                      </div>
              </div>
            )
        }
       

        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>
        
    </header>
  )
}

export default Header
