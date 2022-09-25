// Sanity image type
export interface Image {
    asset: {
        url: string;
    };
}

// Author type
export interface Author {
    name: string;
    slug: string;
    image: string;
}

// Props that represents sanity post
export interface AuthorProp {
    author: Author;
}

// Post type
export interface Post
{
    _id: string;
    _createdAt: string;
    slug: {
        current: string;
    };
    title: string;
    description: string;
    author: Author;
    mainImage: Image;
    body: Object[]; // define body type
}

// Props that represents sanity post
export interface PostProps {
    post: Post;
}

// Props that represents sanity posts
export interface PostsProps {
    posts: Post[];
}