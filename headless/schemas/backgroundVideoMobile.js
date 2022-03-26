export default {
    name: 'backgroundVideoMobile',
    title: 'Background Video Mobile Upload',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    {
      name: 'backgroundGifMobile',
      title: 'Background Gif Mobile',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    ],
  
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'mainImage',
      },
      prepare(selection) {
        const {author} = selection
        return Object.assign({}, selection, {
          subtitle: author && `by ${author}`,
        })
      },
    },
  }
  