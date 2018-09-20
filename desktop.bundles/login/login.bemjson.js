module.exports = {
    block: 'page',
    title: 'Login',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'login.min.css' }
    ],
    scripts: [{ elem: 'js', url: 'login.min.js' }],
    mods: { theme: 'islands' },
    content: [
        {
            block: 'form',
            attrs: { style: `
                left: 50%;
                position: fixed;
                top: 50%;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
            `},
            content: [
                {
                    block: 'input',
                    mods: { theme: 'islands', size: 'l', 'has-clear': true },
                    val: '',
                    placeholder: 'логин'
                },
                {
                    block: 'input',
                    mods: { theme: 'islands', size: 'l', 'has-clear': true },
                    val: '',
                    placeholder: 'пароль'
                },
                {
                    block: 'br',
                    html: '<br>'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'l' },
                    text: 'button'
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'l' },
                    text: 'button'
                },
            ]
        }
    ]
}