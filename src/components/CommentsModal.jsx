import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import Modal from 'react-modal'
import { useEffect, useState } from "react";
import { db } from "../../firebase";

import { useUser } from "../contexts/Usercontext";
import {BiHappyAlt} from "react-icons/bi"
import { MdClose } from "react-icons/md";
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { addDoc,collection, doc, onSnapshot,serverTimestamp,
} from "firebase/firestore";


const CommentsModal = () => {
    const [open, setOpen] = useRecoilState(modalState)
    const [postId] = useRecoilState(postIdState);
    const [post, setPost] = useState({});
    const [input, setInput] = useState("");
    const {user} = useUser();
  const navigate = useNavigate()
    useEffect(() => {
      onSnapshot(doc(db, "Posts", postId), (snapshot) => {
        setPost(snapshot);
      });
    }, [postId, db]);
  
    async function sendComment() {
      await addDoc(collection(db, "Posts", postId, "comments"), {
        comment: input,
        name: user.displayName,
        userImage: user.photoURL,
        timestamp: serverTimestamp(),
        userId: user.uid,
      });
  
      setOpen(false);
      setInput("");
     navigate(`posts/${postId}`);
    }
  
  return (
    <div>
        {open && user && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >

          
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <MdClose className="h-[23px] text-gray-700 p-0" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.data()?.userImage}
                alt="user-img"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.name.replace(/\s+/g, '')}
              </span>
              {/* <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span> */}
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex  p-3 space-x-3">
              <img
                src={user?.photoURL}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      // onClick={() => filePickerRef.current.click()}
                    >
                      <MdOutlinePhotoSizeSelectActual className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> */}
                    </div>
                    <BiHappyAlt className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {!user && navigate('/signin')}
    </div>
  )
}

export default CommentsModal 