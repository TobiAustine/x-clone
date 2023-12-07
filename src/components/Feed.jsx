import {PiSparkle} from "react-icons/pi"
import Post from "./Post"
import Input from "./Input"
import { useState, useEffect } from "react"
import { collection, onSnapshot,orderBy, query } from "firebase/firestore"
import { db } from "../../firebase"
import { AnimatePresence, motion } from "framer-motion"

const Feed = () => {
        const [posts, setPosts] = useState([])
        useEffect(() => {
         
          onSnapshot(
            query(collection(db, "Posts"), orderBy('timestamp', 'desc')),
            (snapshot) =>{
                setPosts(snapshot.docs)
            }
          )
        }, [])
        

    // const posts = [
    //     {
    //         id: "1",
    //         name: "Tobi",
    //         username :"DivDoctor",
    //         userImg: "/me.jpg",
    //        image:"/mee.jpg" ,
    //         text:"First Tweet",
    //         timeStamp:"4 hours ago"
    //     },
    //     {
    //         id: "2",
    //         name: "Austine",
    //         username :"DivDoctor",
    //         userImg: "/me.jpg",
    //        image:"/work1.jpg" ,
    //         text:"First Tweet",
    //         timeStamp:"5 hours ago"
    //     },
    //     {
    //         id: "3",
    //         name: "Osiene",
    //         username :"DivDoctor",
    //         userImg: "/me.jpg",
    //        image:"/work2.jpg" ,
    //         text:"First Tweet",
    //         timeStamp:"3 days ago"
    //     }
    // ] 
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl ">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>

            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
                <PiSparkle size="1.5rem"/>
            </div>
        </div>

        <Input/>
            <AnimatePresence>
                {posts.map((post, id) =>(
                    <motion.div key={id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
                         <Post post = {post} key={id} id = {post.id}/>
                    </motion.div>
           
        ))} 
            </AnimatePresence>
       
    </div>
  )
}

export default Feed