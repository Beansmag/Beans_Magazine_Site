export default {
    name: "signupData",
    title: "Signup Data (Excel sheet link)",
    type: "document",
    fields: [
        {
            name: "sheetLink",
            title: "Click on this link to preview the excel sheet.",
            type: "string",
        },
        {
            name: "SheetID",
            title: "Please enter google sheets ID.",
            type: "string",
        },
        {
            name: "SheetName",
            title: "Please enter google sheet name.",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "title",
            author: "author.name",
            media: "mainImage",
        },
        prepare(selection) {
            const {author} = selection;
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`,
            });
        },
    },
};
