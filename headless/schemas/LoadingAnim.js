export default {
    name: 'loadingAnimation',
    title: 'Loading Animation',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    {
      name: 'LoadingAnimation',
      title: 'Loading Animation',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Loading Animation Time',
      name: 'loadingTime',
      type: 'number'
    }
    
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
  