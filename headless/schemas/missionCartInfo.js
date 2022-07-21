export default {
    name: 'missionCartInfo',
    title: 'Mission and Cart Info Goes Here',
    type: 'document',
    fields: [
      {
        name: 'missionHeader',
        title: 'Mission Header',
        type: 'string',
      },
      {
        name: 'missionStatementText',
        title: 'Mission Statement Copy Goes Here',
        type: 'blockContent',
      },
      {
        name: 'cartInfo',
        title: 'Cart Info Goes Here',
        type: 'blockContent',
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