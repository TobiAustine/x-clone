import {BiBarChart} from "react-icons/bi"
import {BsChat, BsShare, BsThreeDots, BsTrash3} from "react-icons/bs"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {collection,deleteDoc,doc,onSnapshot,setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/Usercontext"

  export default function Comment({ comment, commentId, originalPostId }) {
    const {user} = useUser()
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const navigate= useNavigate();


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
  
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "posts", originalPostId, "comments", commentId, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      );
    }, [db, originalPostId, commentId]);
  
    useEffect(() => {
      setHasLiked(
        likes.findIndex((like) => like.id === user?.uid) !== -1
      );
    }, [likes]);
  
    async function likeComment() {
      if (user) {
        if (hasLiked) {
          await deleteDoc(
            doc(
              db,
              "Posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
             user?.uid
            )
          );
        } else {
          await setDoc(
            doc(
              db,
              "Posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
             user?.uid
            ),
            {
              username: user?.displayName,
            }
          );
        }
      } else {
        signIn();
      }
    }
  
    async function deleteComment() {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        deleteDoc(doc(db, "Posts", originalPostId, "comments", commentId));
      }
    }
  
    return (
      <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
        {/* user image */}
        <img
          className="h-11 w-11 rounded-full mr-4"
          src={comment?.userImage}
          alt="user-img"
        />
        {/* right side */}
        <div className="flex-1">
          {/* Header */}
  
          <div className="flex items-center justify-between">
            {/* post user info */}
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {comment?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{comment?.name} -{" "}
              </span>
              {/* <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span> */}
            </div>
  
            {/* dot icon */}
            <BsThreeDots className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
          </div>
  
          {/* post text */}
  
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
            {comment?.comment}
          </p>
  
          {/* icons */}
  
          <div className="flex justify-between text-gray-500 p-2">
            <div className="flex items-center select-none">
              <BsChat
                onClick={() => {
                  if (user) {
                    signIn();
                  } else {
                    setPostId(originalPostId);
                    setOpen(!open);
                  }
                }}
                className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              />
            </div>
            {user?.uid === comment?.userId && (
              <BsTrash3
                onClick={deleteComment}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            <div className="flex items-center">
              {hasLiked ? (
                <FaHeart
                  onClick={likeComment}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <FaRegHeart
                  onClick={likeComment}
                  className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                />
              )}
              {likes.length > 0 && (
                <span
                  className={`${hasLiked && "text-red-600"} text-sm select-none`}
                >
                  {" "}
                  {likes.length}
                </span>
              )}
            </div>
  
            <BsShare className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            <BiBarChart className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    );
  }