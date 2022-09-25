import createImageUrlBuiler from "@sanity/image-url";
import {
    createCurrentUserHook,
    createClient,
} from "next-sanity";

export const config = {
    /**
     * Use project ID and dataset from the sanity.json in your studio project.
     */
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-11-12',
    useCdn: process.env.NODE_ENV === "production", // Set to false to always use most recent data
};

// Setup the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

/**
 * Setup a helper function for generating image URLs
 * See more: https://www.sanity.io/docs/image-url
 */
export const fetchImageURL = (source) => createImageUrlBuiler(config).image(source);

// Use the currently logged in user
export const useCurrentUser = createCurrentUserHook(config);
