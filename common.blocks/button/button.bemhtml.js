block('button')({
    tag: 'input',
    addJs: (node, ctx) => ({ action: ctx.action }),
    addAttrs: (node, ctx) => {
        return {
            type: ctx.type,
            name: ctx.name,
            value: ctx.value
        };
    },
    addMix: [
        { block: 'input' }
    ]
});
