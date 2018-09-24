block('login-form').elem('input')(
    tag()('input'),
    addJs()(true),
    addAttrs()((node, ctx) => {
        return {
            name: ctx.name,
            placeholder: ctx.placeholder || ''
        };
    }),
    // addMods()(),
    // content()(),
    // TODO: так и должно быть?
    //addMix()({ block: 'input'})
);
