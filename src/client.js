import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: process.env.REACT_APP_SANITY_CLIENTID,
    dataset: "headless",
    apiVersion: '2021-08-31',
    useCdn: true
})