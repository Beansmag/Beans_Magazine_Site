export default {
    name: 'siteBackgroundColor',
    title: 'Site Background Color',
    type: 'document',
    fields: [
        {
            name: 'backgroundColor',
            title: 'if you use the hex code put "#" at the front of it otherwise just spell out the color',
            type: 'string',
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