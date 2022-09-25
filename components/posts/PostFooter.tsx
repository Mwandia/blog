import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';

import { AuthorProp } from '../../types/sanity'

function PostFooter({ author }: AuthorProp) {
  return (
    <footer>
        {/* Article actions */}
        <div className='h-20 w-full items-center'>
            <div>

            </div>
        </div>

        {/* More articles by Author */}
        <div className='h-40 bg-gray-100'>
            <div className='flex justify-between max-w-3xl p-5 my-3 space-x-2 mx-auto items-center'>
                <div>
                    <h1 className='text-xl font-semibold'>More from {author.name}</h1>
                </div>

                <div className='flex justify-between space-x-2 items-center'>
                    <h3 className='text-white text-center text-sm bg-blue-600 px-3 py-2 rounded-full'>Follow</h3>
                    <div className='flex border w-10 h-10 items-center justify-center rounded-full bg-blue-600'>
                        <HiOutlineMail className='w-6 h-6 fill-transparent'/>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default PostFooter
