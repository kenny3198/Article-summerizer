import React from "react"
import  logo  from "../assets/logo.svg";
function Hero() {
  return (
    <header className='w-full flex justify-center items-center flex-col p-4'>
    <nav className='flex justify-between items-center w-full mb-10 pt-3 flex-row p-5'>
      <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
      <button type="button" onClick={() => window.open("https://github.com/kenny3198")} className="black_btn">
        Github
      </button>
    </nav>
    <h1 className="head_text">Summerize Article <br className="max-d:hidden"/>
    <span className="orange_gradient">Open AI GPT-4</span>
    </h1>
    <h2 className="desc">
      Simplify your reading with summize, an open source article summerizer
      that transform lengthty articles in to clear and concise summeries
    </h2>
    </header>
  )
}

export default Hero
