import { GetStaticProps } from 'next'
import React from 'react'
import PortableText from "react-portable-text";

import Header from '../../components/Header'
import PostFooter from '../../components/posts/PostFooter';
import { fetchImageURL, sanityClient } from '../../sanity'
import { Post, PostProps } from '../../types/sanity'

function Post({ post }: PostProps) {
    return (
        <main>
            {/* Header component */}
            <Header />

            {/* Post banner image */}
            <img 
                className='w-full h-40 object-cover'
                src={fetchImageURL(post.mainImage).url()} 
                alt="" 
            />

            <article className='max-w-3xl mx-auto p-5'>
                {/* Author details */}
                <div className='flex justify-left space-x-2 items-center'>
                    <img 
                        className='w-12 h-12 rounded-full'
                        src={fetchImageURL(post.author.image).url()} 
                        alt="" 
                    />

                    <div className='flex flex-col'>
                        <div className='flex justify-between space-x-2 items-center'>
                            <p className='flex justify-between text-lg font-light'>
                                {post.author.name}
                            </p>
                            <h3 className='text-white text-center text-xs bg-blue-600 px-2 py-1 rounded-full'>Follow</h3>
                        </div>
                    
                        <p className='text-xs font-extralight'>{new Date(post._createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Post headings */}
                <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
                <h2 className='text-xl font-extralight text-gray-500 pb-2'>{post.description}</h2>

                {/* Post body */}
                <div className='mt-10'>
                    <PortableText 
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}    
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
                        content={post.body}
                        serializers={
                            {
                                normal: ({ children }: any) => (
                                    <p className='text-base font-sans font-light'>{children}</p>
                                ),
                                h1: (props: any) => (
                                    <h1 className='text-2xl font-bold my-5' {...props} />
                                ),
                                h2: (props: any) => (
                                    <h2 className='text-xl font-bold my-5' {...props} />
                                ),
                                li: ({ children }: any) => (
                                    <li className='ml-4 list-disc'>{children}</li>
                                ),
                                link: ({ href, children }: any) => (
                                    <a href={href} className='text-blue-500 hover:underline'>
                                        {children}
                                    </a>
                                ),
                            }
                        }
                    />
                </div>
            </article>

            <PostFooter author={post.author} />
        </main>
    )
}

export default Post

/**
 * Fetch the paths for pages to be cached by next.js
 * @returns paths to cache
 */
export const getStaticPaths = async () => {
    const query = `*[_type == 'post']{
        _id,
        slug {
            current
        }
    }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post)=> ({
        params: {
            slug: post.slug.current,
        }
    }));

    return {
        paths,
        fallback: 'blocking',
    }
}

/**
 * Fetch post props for caching on next
 * @param params 
 * @returns post props
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name, 
            image
        },
        'comments': *[_type == 'comment' && post._ref == ^._id && approved == true],
        description,
        mainImage, 
        slug,
        body
    }`;

    // Set query parameters
    const queryParams = {
        slug: params?.slug,
    };

    const post = await sanityClient.fetch(query, queryParams);

    // Return 404 if no post was found
    if(!post){
        return {
            notFound: true
        }
    }

    // Return props
    return {
        props: {
            post,
        },
        revalidate: 60, // update cached webpage every 60 seconds
    }
}