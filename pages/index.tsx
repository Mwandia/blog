import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import HomePagePost from '../components/HomePagePost'
import { sanityClient } from '../sanity';
import { PostsProps } from '../types/sanity'

/**
 * Blog home page
 * @param Posts PostProps 
 * @returns home page JSX.Element
 */
export default function Home({ posts }: PostsProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header component */}
      <Header />

      {/* Banner component */}
      <Banner />

      {/* Posts component */}
      <HomePagePost posts={posts} />
    </div>
  )
}

/**
 * Function to fetch the posts hosted on the CMS
 * @returns props PostProps
 */
export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id, 
    title,
    author -> {
      name, 
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  }
};