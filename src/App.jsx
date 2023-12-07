import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import SignUp from "./pages/Signup"
import { UserProvider } from "./contexts/Usercontext"
import { RecoilRoot } from "recoil"
import Posts from "./pages/Posts"



function App() {
  

  return (
   <UserProvider>
    <RecoilRoot>
   <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/posts/:id" element={<Posts/>} />
      
    </Routes>
    </BrowserRouter> 
    </RecoilRoot>
    </UserProvider>
  )
}

export default App
