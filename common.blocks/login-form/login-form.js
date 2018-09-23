modules.define('login-form', ['i-bem-dom', 'utils', 'events'], function (provide, bemDom, utils, events) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    // TODO: проверить на string
                    var register = new events.Event('register');
                    var login = new events.Event('login');

                    // TODO: подключить button и явно передавать
                    this._events(this.findChildBlocks({ elem: 'button' }))
                        .on(register, this._onRegister)
                        .on(login, this._onLogin)
                }
            }
        },

        // TODO: объединить register+login?
        _onRegister: function (originalEvent) {
            console.log('BEM event: register')

            // TODO: отключать на все события?
            originalEvent.preventDefault()

            // TODO: получать данные по-другому?
            const inputs = this.findChildElems('input');
            const username = inputs.get(0).domElem[0].value;
            const password = inputs.get(1).domElem[0].value;

            utils.registerUser(username, password)
                .then(user => {
                    // TODO: redirect
                    console.log('register: ', user);
                })

        },

        _onLogin: function (originalEvent) {
            console.log('BEM event: login')
            originalEvent.preventDefault()

            const inputs = this.findChildElems('input');
            const username = inputs.get(0).domElem[0].value;
            const password = inputs.get(1).domElem[0].value;

            utils.loginUser(username, password)
                .then(user => {
                    console.log('login: ', user);
                })

        },

    }, {
        lazyInit: false,
    }));

});
