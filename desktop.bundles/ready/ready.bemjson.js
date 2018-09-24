module.exports = {
    block: 'page',
    title: 'Login',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'ready.min.css' }
    ],
    scripts: [{ elem: 'js', url: 'ready.min.js' }],
    content: [
        {
            block: 'container',
            content: {
                block: 'button',
                mods: { fight: true },
                value: 'fight',
                name: 'fight',
                action: 'fight',
                type: 'button',
            }
        }
    ]
}