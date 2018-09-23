block('login-form').elem('button')({
    tag: 'input',
    addJs: (node, ctx) => ({ action: ctx.action }),
    addAttrs: (node, ctx) => {
        return {
            type: 'submit',
            name: ctx.name,
            value: ctx.value
        };
    },
    // TODO: странно
    addMix: { block: 'input' }
});
