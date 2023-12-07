/* eslint-disable react/prop-types */
import {BiBarChart} from "react-icons/bi"
import {BsChat, BsShare, BsThreeDots, BsTrash3} from "react-icons/bs"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {collection, deleteDoc, doc,onSnapshot, setDoc,  arrayUnion, updateDoc, getDoc} from 'firebase/firestore'
import { db, storage } from "../../firebase"
import { useState, useEffect } from "react"
import { useUser } from "../contexts/Usercontext";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; 
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState} from "../atom/modalAtom";





const Post = ({post, id}) => {
   const [open, setOpen] = useRecoilState(modalState)
   const [postId, setPostId] = useRecoilState(postIdState)
   const [comments, setComments] = useState([])
   const {user} = useUser()
   console.log(user); 
   const {updateUser} = useUser()
   const navigate = useNavigate()

   const signIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        updateUser(user)
        navigate('/')
      } catch (error) {
        console.error(error.message);
      }
    };

   const [likes, setLikes] = useState([])
   const [hasLiked, setHasLiked] = useState(false)

   useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Posts",id, "likes"),
      (snapshot)=>setLikes(snapshot.docs)
    )
   }, [db])
   
   useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "Posts",id, "likes"),
        (snapshot)=>setComments(snapshot.docs)
      )
     }, [db])
     



   useEffect(() => {
     setHasLiked(
         likes.findIndex((like) => like.id === user.id) !== -1
      )

   }, [likes])

  
   


   async function likePost(){
      if(user){
         if(hasLiked){
            await deleteDoc(doc(db, "Posts", post.id, 'likes', user.uid))
         }else{
            await setDoc(doc(db, "Posts", post.id, "likes", user.uid),{
               username: user.name
            })
         }
      }else{
         signIn()
      }
   }


   const deletePost = async() =>{
      if(window.confirm('Do you really want to delete this post?')){
         deleteDoc(doc(db, "Posts", id))
         if(post.data().image){
            deleteObject(ref(storage, `posts/${post.id}/image`))
         }
         navigate('/')
      }
   }


   // async function likePost() {
   //    try {
   //       if (user && post && typeof hasLiked !== 'undefined') {
   //          if (hasLiked) {
   //             await deleteDoc(doc(db, "Posts", post.id, 'likes', user.id));
   //          } else {
   //             await setDoc(doc(db, "Posts", post.id, "likes", user.id), {
   //                username: user.name,
   //             });
   //          }
   //       } else {
   //          signIn();
   //       }
   //    } catch (error) {
   //       console.error("Error in likePost:", error);
   //       // Handle the error appropriately (e.g., show a user-friendly message)
   //    }
   // }



   // const handleLike = async (postId) => {
   //    try {
   //      // Check if the user is authenticated
   //      if (user) {
   //        const postRef = doc(db, 'Posts', postId);
   //        const postSnapshot = await getDoc(postRef);
  
   //        if (postSnapshot.exists()) {
   //          const postData = postSnapshot.data();
   //          //const likedBy = postData.likedBy || [];
   //          const likedBy = Array.isArray(postData.likedBy) ? postData.likedBy : [];
  
   //          // Check if the user has already liked the tweet
   //          const hasLiked = likedBy.includes(user.uid);
  
   //          if (hasLiked) {
   //            // If already liked, unlike the tweet
   //            const updatedLikedBy = likedBy.filter((userId) => userId !== user.uid);
   //            await updateDoc(postRef, { likedBy: updatedLikedBy });
   //          } else {
   //            // If not liked, like the tweet
   //            const updatedLikedBy = [...likedBy, user.uid];
   //            await updateDoc(postRef, { likedBy: updatedLikedBy });
   //          }
   //        }
   //      } else {
   //        // User is not authenticated, handle accordingly (e.g., show login prompt)
   //        console.log('User is not authenticated. Show login prompt.');
   //        signIn()
   //      }
   //    } catch (error) {
   //      console.log('Error handling like:', error);
   //      // Handle the error accordingly (e.g., show an error message)
   //    }
   //  };
   
   



  return (
    <div className="flex p-3  cursor-pointer border-b border-gray-200 ">

        {/* USER'S IMAGE */}
        <img src={post?.data()?.userImage} alt="user image" className="h-11 w-11 rounded-full mr-4"/>

        <div className="flex-1" >
           {/* HEADER */}
           <div className="flex items-center justify-between">
             
             <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
                <span className="text-sm sm:text-[15px]">@{post?.data()?.name}-{" "}</span>
                

             </div>

                <BsThreeDots className="h-10 hoverEffect w-10 hover:bg-sky-100  hover:text-sky-500 p-2"/>

           </div>


                  {/* MAIN BODY */}
                  
            <small className="text-[10px] sm:text-[15px] hover:underline mt-[0]">{post?.data()?.timestamp.toDate().toLocaleString()}</small>

             <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2" onClick={() => navigate(`/posts/${id}`)}>{post?.data()?.text}</p> 

               {
                post?.data()?.image &&  <img src={post?.data()?.image} alt="user" className="h-[10rem] w-[15rem] sm:h-[20rem] sm:w-[40rem] rounded-full mr-2 object-contain"  onClick={() => navigate(`/posts/${id}`)} />   
               }
            

             <div className="flex justify-between text-gray-500 p-2 mt-5">
               <div className="flex items-center select-none">
               <BsChat size="1.3rem" className="hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" onClick={() =>{
                  if(!user){
                     signIn()
                  }else{
                     setPostId(id)
                     setOpen(!open)
                  }
                }}/>
                {comments.length > 0 && (
                  <span className="text-sm">{comments.length}</span>
                )}

               </div>
             

                { user && user.uid === post?.data()?.id && ( 
                  <BsTrash3  size="1.3rem"className="hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" onClick={deletePost}/>
                  )}

                



                {
                  hasLiked ? (<FaHeart size="1.3rem" className="hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" onClick={likePost}/> ) : ( <FaRegHeart size="1.3rem" className="hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" onClick={likePost}/>)
                }
               
                <BsShare size="1.3rem" className="hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
                <BiBarChart size="1.3rem" className="hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
             </div>
             
              


        </div>
        
    </div>
  )
}

export default Post