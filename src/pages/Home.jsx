import {  useState, useEffect } from "react"
import Feed from "../components/Feed"
import Sidebar from "../components/Sidebar"
import Widgets from "../components/Widgets"
import CommentsModal from "../components/CommentsModal"




const Home = () => {
  const [news, setNews] = useState([])
  const [randomUsers, setRandomUsers] = useState([])

 
  


  // useEffect( () => {
  //  fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
  //   .then((news) => news.json())
  //   .then((data) => console.log(data.articles[0]))
  //   .then((data) => setNews(data)) 
  //   .catch((error) => console.error('API error', error))

  //   console.log(news.articles[0].author);
    

  // },)
  
// let news = []

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




  
  return (
    < div className='flex min-h-screen mx-auto '>
      {/* SIDEBAR */}
      <Sidebar/>

    

        {/* FEED */}
        <Feed/>
        

        {/*WIDGETS*/ }
        <Widgets news={news} randomUsers={randomUsers}/> 


        <CommentsModal/>

      

    </div>
  )
}

export default Home


//import random user results and pass as props