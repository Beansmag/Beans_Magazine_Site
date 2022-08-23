export default {
    name: 'cartIconUpload',
    title: 'Cart Icon Here',
    type: 'document',
    fields: [
        {
            name: 'cartIcon',
            title: 'Replace this when you want a new cart Icon',
            type: 'image',
            options: {
              hotspot: true
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