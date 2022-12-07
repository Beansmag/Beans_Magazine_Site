export default {
    name: 'signupData',
    title: 'Signup Data (Excel sheet link)',
    type: 'document',
    fields: [
        {
            name: 'sheetLink',
            title: 'Click on this link to download the excel sheet. (Do not edit this link)',
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