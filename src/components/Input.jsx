import {BiHappyAlt} from "react-icons/bi"
import { MdClose } from "react-icons/md";
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"
import {auth} from '../../firebase'
import {  signOut } from "firebase/auth";
import { useUser } from "../contexts/Usercontext"
import { addDoc,setDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState, useRef } from "react";
const Input = () => {

    const {user} = useUser()
    console.log(user); 

   const handleSignOut = () =>{
            try {
                signOut(auth)
                window.location.reload()
            } catch (error) {
                console.log(error);
            }
   }

const [input, setInput] = useState('')
const [selectedFile, setSelectedFile] = useState(null)
const [loading, setLoading] = useState(false)
const filePicker = useRef(null)

const tweetPost = async() =>{
        if(loading) return;
        setLoading(true)

        const docRef = await addDoc(collection(db, "Posts"), {
            id: user.uid,
            text: input,
            userImage: user.photoURL,
            timestamp: serverTimestamp(), 
            name: user.displayName,
        })

const imageRef = ref(storage, `posts/${docRef.id}/image`)

if(selectedFile){
    await uploadString(imageRef,selectedFile, "data_url" )
            .then(async () =>{
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "Posts", docRef.id),{
                    image:downloadURL
                })
            })
}

setInput("")
setSelectedFile(null)
setLoading(false)
};





const uploadImage = (e) =>{
    const reader = new FileReader()
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (e) =>{
        setSelectedFile(e.target.result)
    }

}






   
  

   // const user = auth.currentUser
  // const user = JSON.parse(localStorage.getItem("user"))
//    const getUser = () =>{

//         try {
            
//             if(!user){
//                 console.log('no user');
//             }else{
//                 console.log(user.uid, user.email, user.photoURL);
//             }
//         } catch (error) {
//          console.log(error);   
//         }
//     }




    
  return (
    <>
    {user &&(
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <img onClick={handleSignOut}  src={user.photoURL} alt="user-image" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"/>
        <div className="w-full divide-y divide-gray-200">
            <div>
                <textarea name="" id="" cols="30" rows="2" className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 p-2 focus:outline-gray-600" placeholder={`Hi ${user.displayName}, Whats happening?`} value={input} 
                onChange={(e) => setInput(e.target.value)}></textarea>
            </div>

            {
                selectedFile && (
                   
                    <div className="relative">
                    <MdClose onClick={() => setSelectedFile(null)} size='1.3rem' className="m-2 text-white absolute cursor-pointer shadow-md shadow-white rounded-full"/>
                    <img src={selectedFile} alt="image" className={`${loading && "animate-pulse"} h-[20rem] w-[20rem]`} />
                    </div>
                 
                )
            }







            <div className="flex items-end justify-between pt-2.5">
               
               {
                !loading && (
                    <>
                    <div className="flex">
                        <div className="" onClick={() => filePicker.current.click()}>
                            <MdOutlinePhotoSizeSelectActual className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                            <input type="file"  hidden ref={filePicker} onChange={uploadImage} 
                            />
                        </div>

                        <BiHappyAlt className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                    </div>
                    <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" 
                    onClick={tweetPost} 
                    disabled={!input.trim()} >
                       Tweet 
                    </button>
                    </>
                )
               }
               
               











               
               
                {/*   */}

               
               
               
               
               
               
               
               
                {/* <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full fomt-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button> */}
                {/* <button onClick={getUser} className="bg-blue-400 text-white px-4 py-1.5 rounded-full fomt-bold shadow-md hover:brightness-95 disabled:opacity-50">Get User details</button> */}

            </div>
        </div>
    </div>
    )}
    </>
  )
}

export default Input