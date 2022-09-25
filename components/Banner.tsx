import React from 'react'

function Banner() {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-xl font-serif"><span className="underline decoration-black decoration-4">Blog</span> is a place where I can write read and connect</h1>
            <h2>The topics at hand will be under computer science, bioinformatics, sports and nature.</h2>
        </div>
        
        {/* Include blog logo */}
        <img 
            className="hidden md:inline-flex h-32 lg:h-full"
            src="" 
            alt="" />
    </div>
  )
}

export default Banner