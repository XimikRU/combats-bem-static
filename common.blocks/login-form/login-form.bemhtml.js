block('login-form')({
    tag: 'form',

    addJs: true,

    addAttrs: (node, ctx) => ({
            method: ctx.method,
            action: ctx.action || '/'
    })
});