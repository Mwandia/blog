import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className="flex justify-between p-5">
        <div className="flex items-center space-x-5">
            {/* Prefetch page references by the link for increased speed if the user clicks this link */}
            <Link href="/">
                {/* TODO - include blog logo image */}
                <img 
                    className="w-44 object-contain cursor-pointer" 
                    src="" 
                    alt="" 
                />
            </Link>
            
            {/* Actions and medium redirects */}
            <div className="hidden md:inline-flex items-center space-x-5">
                <h3>About</h3>
                <h3>Contact</h3>
                <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3>
            </div>
        </div>

        <div className="flex items-center space-x-5 text-green-600">
            <h3>Sign In</h3>
            <h3 className="border px-4 py-1 rounded-full border-green-600">Get Started</h3>
        </div>
    </header>
  )
}

export default Header