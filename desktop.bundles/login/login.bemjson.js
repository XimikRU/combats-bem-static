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
    content: [
        {
            block: 'login-form',
            content: [
                {
                    elem: 'input',
                    // TODO: исправить
                    mix: { block: 'input' },
                    name: 'username',
                    placeholder: 'user'
                },
                {
                    tag: 'br'
                },
                {
                    elem: 'input',
                    name: 'password',
                    placeholder: 'pass'
                },
                {
                    tag: 'br'
                },
                {
                    elem: 'button',
                    name: 'login',
                    value: 'login',
                    action: 'login'
                },
                {
                    elem: 'button',
                    name: 'register',
                    value: 'register',
                    action: 'register'
                }
            ]
            
        }
    ]
}