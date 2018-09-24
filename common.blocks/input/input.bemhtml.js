block('input')({
    tag: 'input',
    addJs: true,
    addAttrs: (node, ctx) => {
        return {
            name: ctx.name,
            placeholder: ctx.placeholder || ''
        };
    },
});
