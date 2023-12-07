/* eslint-disable react/prop-types */
import { useState } from 'react'
import {BiSearch} from 'react-icons/bi'
import News from './News'
import { AnimatePresence, motion } from 'framer-motion'


const Widgets = ({news, randomUsers}) => {
  const [article, setArticle] = useState(3)
  const [randomUsersNumber, setRandomUsersNumber] = useState(7)
  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5 sticky top-0'>
      <div className='w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50'>
        <div className='flex items-center p-3 rounded-full bg-red-300 relative'>
            <BiSearch  className='h-5 z-50 text-gray-500'/>
            <input type="text" className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100' placeholder='Search Twitter' /> 
        </div>

      </div>

      <div className="text-gray-700  space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className='font-bold text-xl px-4'>Whats happening?</h4>
        
        <AnimatePresence>
           
        {news.slice(0, article).map((article, id) => (
          <motion.div key={id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacoty:0}} transition={{duration:1.5}}>
             <News key={id} article={article} />
          </motion.div>
         
        ))}
        </AnimatePresence>
       




        <button onClick={() => setArticle(article + 3)} className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show more...</button>
      </div>

      {/* <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl p-4">Interesting people  to follow</h4>
        {randomUsers.slice(0,randomUsersNumber).map((user) => (
          <div key={user.login.username} className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200'>
            <img src={user.picture.thumbnail} className='rounded-full' alt="user" width="40"/>
            <div className='truncate ml-4 leading-5'>
              <h4 className='font-bold hover:underline text-[14px] truncate'>{user.login.username}</h4>
              <h5 className='font-bold hover:underline text-[14px] truncate'> {user.name.first + " " + user.name.last} </h5>
            </div>
             </div>
        ))}
         <button onClick={() =>setRandomUsersNumber(randomUsersNumber+ 3)} className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show more users...</button>
         <button onClick={() =>setRandomUsersNumber(randomUsersNumber- 3)} className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show less users...</button>
      </div>  */}

    </div>
  )
}

export default Widgets