import Link from 'next/link' 
import React from 'react'
import { fetchImageURL } from '../sanity'
import { PostsProps } from '../types/sanity'

function HomePagePost({ posts }: PostsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        { posts.map(post => (
            <Link key={post._id} href={`/posts/${post.slug.current}`}>
                <div className='border rounded-lg group cursor-pointer overflow-hidden items-center'> 
                    <img 
                        className='h-60 w-full object-cover group-hover:scale-105 transition-tranfrom duration-200 ease-in-out'
                        src={fetchImageURL(post.mainImage).url()} 
                        alt="" />
                    <div className='flex justify-between p-5 bg-white'>
                        <div>
                            <p className='text-lg font-bold'>{post.title}</p>
                            <p className='text-xs'>{post.description} by {post.author.name}</p>
                        </div>

                        <img 
                            className="h-12 w-12 rounded-full" 
                            src={fetchImageURL(post.author.image).url()} 
                            alt="" 
                        />
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default HomePagePost