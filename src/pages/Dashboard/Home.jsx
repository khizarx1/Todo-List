import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='pb-2 text-3xl font-bold'>Home of Dashboard</h1>
            <Link to='/' className="bg-[#449DD1] text-white px-8 py-2.5 rounded-full cursor-pointer">Home</Link>
        </div>
    )
}

export default Home