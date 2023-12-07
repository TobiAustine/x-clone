import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar" 
import Widgets from "../components/Widgets"
import Post from "../components/Post"
import { useNavigate, useParams} from "react-router-dom"
import { collection,doc,onSnapshot,orderBy,query} from "firebase/firestore";
import { db } from "../../firebase"
import { AnimatePresence, motion } from "framer-motion";
import Comment from "../components/Comments"
import CommentsModal from "../components/CommentsModal"
import {FaArrowLeft} from 'react-icons/fa'

const Posts = () => { 
 const navigate = useNavigate();
const { id } = useParams();
const [post, setPost] = useState();
const [comments, setComments] = useState([]);
const [news, setNews] = useState([])
const [randomUsers, setRandomUsers] = useState([])

async function newsData (){
    try {
       const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
       const data = await response.json()
       setNews(data.articles)

     // news = data.articles;
    } catch (error) {
          console.log(error);
    }
  }
  newsData()
 

 async function userData(){
   try {
     const response = await fetch('https://randomuser.me/api/?results=30&inc=name, login,picture')
     const data = await response.json()
     setRandomUsers(data.results)
   } catch (error) {
     console.log(error);
   }
 }
 userData()


// get the post data
useEffect(
  () => onSnapshot(doc(db, "Posts", id), (snapshot) => setPost(snapshot)),
  [db, id]
);
// get comments of the post
useEffect(() => {
  onSnapshot(
    query(
      collection(db, "Posts", id, "comments"),
      orderBy("timestamp", "desc")
    ),
    (snapshot) => setComments(snapshot.docs)
  );
}, [db, id]);
return (
  <div>
   
    <main className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="hoverEffect" onClick={() => navigate("/")}>
            <FaArrowLeft size='1.5rem' />
          </div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
            Tweet
          </h2>
        </div>
        <Post id={id} post={post} />
        {comments.length > 0 && (
          <div className="">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Comment
                    key={comment.id}
                    commentId={comment.id}
                    originalPostId={id}
                    comment={comment.data()}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      {/* Widgets */}
      <Widgets news={news} randomUsers={randomUsers}/> 
      {/* Modal */}
      <CommentsModal />
    </main>
  </div>
);
}

export default Posts