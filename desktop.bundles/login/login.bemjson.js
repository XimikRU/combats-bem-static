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
            block: 'container',
            content: {
                block: 'login-form',
                content: [
                    {
                        block: 'input',
                        name: 'username',
                        placeholder: 'user'
                    },
                    {
                        tag: 'br'
                    },
                    {
                        block: 'input',
                        name: 'password',
                        placeholder: 'pass'
                    },
                    {
                        tag: 'br'
                    },
                    {
                        block: 'button',
                        name: 'login',
                        value: 'login',
                        action: 'login',
                        type: 'submit',
                    },
                    {
                        block: 'button',
                        name: 'register',
                        value: 'register',
                        action: 'register',
                        type: 'submit'
                    }
                ]
            }  
        }
    ]
}