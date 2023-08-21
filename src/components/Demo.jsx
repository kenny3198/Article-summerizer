import React, { useEffect, useState} from 'react'
import  link from "../assets/link.svg"
import loader from "../assets/loader.svg"
import tick from "../assets/tick.svg"
import copy from "../assets/copy.svg"
import { useLazyGetSummaryQuery } from '../services/article'
function Demo() {
  const [ getSummary, { error, isFetching } ] = useLazyGetSummaryQuery();
  const [article, setArticle] = useState({
    url: "",
    summary: ""
  })
  const  [allArticles, setAllArticles ] = useState([])
  const [copied, setCopied] = useState({})
  useEffect(() => {
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem("article"))
  if(articlesFromLocalStorage) {
    setAllArticles(articlesFromLocalStorage)
  }

  },[])
  const handleCopied = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 2000)
  }
  const handleSubmit =  async (e) => {
  e.preventDefault();
  const { data } = await getSummary({articleUrl: article.url})
   if(data?.summary) {
    const newArticle = {...article, summary: data.summary}
    setArticle(newArticle)
    console.log(newArticle)
    const updateAllArticles = [newArticle, ...setAllArticles]
    setAllArticles(updateAllArticles)
    localStorage.setItem("article", JSON.stringify(updateAllArticles))
   }
  }
  
  return (
    <section className='mt-6 w-full mx-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2 justify-center'>
        <form className='relative flex justify-center items-center m-3'  
        onSubmit={handleSubmit}>
        <img src={link} alt="link_icon"
         className='absolute left-0 my-2 ml-3 w-5'/>
         <input type="url" placeholder='Enter a URL'
          value={article.url} onChange={(e) => setArticle({...article, url:e.target.value})}
           className='url_input peer'  required/>
         <button type='submit' className='submit_btn
         peer-focus:border-gray-700 peer=focus:text-gray-700
         '>
          <p>↵</p>
         </button>
        </form>
        {/* BROWSER HOSTORY */}
    
        <div className='flex flex-col max-h-60 gap-1 overflow-y-auto'> 
          {allArticles.map((item, index) => (
            <div className='link_card'key={index}  onClick={() => setArticle(item)}>
               <div className='copy_btn' onClick={() => handleCopied(item.url)}>
                <img className='w-[40%] h-[40%] object-contain' src={copied === item.url ? tick : copy} alt="copy_icon" />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
            </div>
           ))} 
        </div>
      </div>
      {/* DISPLAY RESULT */}
      <div className='my-10 max-w-full flex justify-center items-center'>
       { isFetching ? (
        <img src={loader} alt="loader" className='w-20 h-20 object-contain' />
       ) : error ? (
        <p className='font-inter font-bold text-black text-center'>that was not suppose to happen <br />
        <span className='font-satoshi font-normal text-gray-700'> error?.data?.error</span>
        </p>
       ) : (
        article.summary && (
          <div className='flex flex-col gap-3'>
           <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
            Article <span className='blue_gradient'>Summary</span>
           </h2>
           <div className='article_summary'>
            <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
           </div>
          </div>
        )
       )
      }
      </div>
    </section>
  )
}

export default Demo
