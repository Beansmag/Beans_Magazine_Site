import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "m7j507qg",
    dataset: "headless",
    apiVersion: '2021-08-31',
    useCdn: true
})