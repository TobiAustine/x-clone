// src/components/GoogleSignInButton.js
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineMail} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
//import { UserProvider } from "../contexts/Usercontext";
import { useUser } from "../contexts/Usercontext";


const SignIn = () => {

  const {updateUser} = useUser()
 

   const navigate = useNavigate()

  const signInWithGoogle = async () => {
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





//   const handleSignIn = async() =>{
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user     
//        console.log(user);
//   } catch (error) {
//     console.log(error);
//   }
// };
  


 

  return (
   <div className="flex justify-center mt-30 space-x-4">
        <img src="/newtwitter.png" alt="twitter logo"  className="hidden object-contain md:w-[20rem] md:h-80 rotate-6 md:inline-flex rounded-md"/>
        <div>
            <div className="flex flex-col items-center">
                <img src="/twit.png" alt="" className="w-36 object-cover" />
                <p className="text-center text-sm italic my-10"> This app is created  for learning purpose</p>
                <div className="flex items-start justify-between gap-4">
                    <button onClick={ signInWithGoogle} className="flex justify-between items-center gap-2 bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">
                    <FcGoogle size="1.5rem"/> 
                     Sign in with Google
                </button>

                <button className="flex justify-between items-center gap-2 bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">
                    <AiOutlineMail size="1.5rem"/> 
                     Sign in with Email
                </button>
                </div>
                

            </div>
        </div>
   </div>

  );
};

export default SignIn;
