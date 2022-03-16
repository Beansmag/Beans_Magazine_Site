export default {
    name: 'backgroundVideo',
    title: 'Background Video Upload',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    {
      name: 'backgroundGif',
      title: 'Background Gif',
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
  