export default {
    name: 'checkoutAnimation',
    title: 'Checkout Animation',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    {
      name: 'checkoutAnimation',
      title: 'Checkout Animation',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Checkout Animation duration',
      name: 'checkoutAnimationDuration',
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
  