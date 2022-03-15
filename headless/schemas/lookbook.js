export default {
  name: 'lookbook',
  title: 'Lookbook',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  {
    name: 'mainImage',
    title: 'Main image',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage2',
    title: 'Main image2',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage3',
    title: 'Main image3',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage4',
    title: 'Main image4',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage5',
    title: 'Main image5',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage6',
    title: 'Main image6',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage7',
    title: 'Main image7',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage8',
    title: 'Main image8',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage9',
    title: 'Main image9',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage10',
    title: 'Main image10',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage11',
    title: 'Main image11',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage12',
    title: 'Main image12',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage13',
    title: 'Main image13',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage14',
    title: 'Main image14',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage15',
    title: 'Main image15',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage16',
    title: 'Main image16',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage17',
    title: 'Main image17',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage18',
    title: 'Main image18',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage19',
    title: 'Main image19',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage20',
    title: 'Main image20',
    type: 'image',
    options: {
      hotspot: true,
    },
  },
  {
    name: 'mainImage21',
    title: 'Main image21',
    type: 'image',
    options: {
      hotspot: true,
    },
  }
    // {
    //   name: 'title',
    //   title: 'Title',
    //   type: 'string',
    // },
    // {
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'category'}}],
    // },
    // {
    //   name: 'publishedAt',
    //   title: 'Published at',
    //   type: 'datetime',
    // },
    // {
    //   name: 'body',
    //   title: 'Body',
    //   type: 'blockContent',
    // },
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
