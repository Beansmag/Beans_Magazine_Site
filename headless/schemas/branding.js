export default {
    name: 'branding',
    title: 'Upload Nav bar logo here',
    type: 'document',
    fields: [
        {
            name: 'logo',
            title: 'Replace this when you want a new logo',
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