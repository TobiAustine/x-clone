import SidebarMenuItem from './SidebarMenuItem.jsx'
import {AiOutlineHome, AiOutlineMessage,AiOutlinePaperClip, AiOutlineUser} from 'react-icons/ai'
import {BsHash, BsThreeDots} from "react-icons/bs"
import {BsBookmarks} from 'react-icons/bs'
import {HiOutlineDotsCircleHorizontal} from "react-icons/hi"
import {GoBell} from 'react-icons/go'
import { useUser } from '../contexts/Usercontext.jsx'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.js'


const Sidebar = () => {
  const {user} = useUser() 
  const handleSignOut = () =>{
    try {
        signOut(auth)
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

  return (

        <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>


                {/* TWITTER LOGO */}
          <div className="hoverEffect p-0 cursor-pointer xl:px-4 flex justify-center items-center ">   
         <img width="30" height="30" src='/twitter-logo.png' alt='Twitter Icon' />
        </div> 



                {/* MENU */}
            <div className="mt-4 mb-2.5 xl:items-start">
               <SidebarMenuItem text="Home" icon={<AiOutlineHome size='1.5rem'/>}/>
                <SidebarMenuItem  text="Explore"   icon={<BsHash size='1.5rem'/>}/>


                  {
                  user && <>
                    <SidebarMenuItem  text="Notifications"  icon={<GoBell size='1.5rem'/>}/> 
                <SidebarMenuItem  text="Bookmarks"  icon={<BsBookmarks size='1.5rem'/>}/>
                <SidebarMenuItem  text="Messages"  icon={<AiOutlineMessage size='1.5rem'/>}/>
                <SidebarMenuItem  text="Lists"  icon={<AiOutlinePaperClip size='1.5rem'/>}/>
                <SidebarMenuItem  text="Profile"  icon={<AiOutlineUser size='1.5rem'/>}/>
                <SidebarMenuItem  text="More"  icon={<HiOutlineDotsCircleHorizontal size='1.5rem'/>}/>
                </>
                }
                 
               

               
            </div>



            {/* BUTTON */}
            {user ? 
              <>
            <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-sans shadow-md hover:brightness-95 text-lg hidden xl:inline'> 
            Tweet
            </button>
            <button onClick={handleSignOut} className='bg-blue-400 mt-2 text-white rounded-full w-56 h-12 font-sans shadow-md hover:brightness-95 text-lg hidden xl:inline'> 
           
           Sign Out
           
           </button>


                {/* PROFILE */}

            <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto"> 
            <img onClick={handleSignOut} src={user.photoURL} alt="user-img" width="40" height="40"  className='rounded-full xl:mr-2'/>
            <div className='hidden xl:inline  '>
                 <h4 className='font-bold'>{user?.displayName}</h4>
                 <p className='text-gray-500'> {`@${user?.displayName.replace(/\s+/g, '')}`}</p>
            </div>
            <BsThreeDots size="1.3rem" className='hidden xl:inline xl:ml-8'/>
           
            </div>
            </> : 
            <>
            <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-sans shadow-md hover:brightness-95 text-lg hidden xl:inline'> 
           
            <Link to='/signin'>Sign In</Link>
            
            </button>
           
            </>
            
            }
            






        </div>


  )
}

export default Sidebar