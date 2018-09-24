modules.define('login-form', ['i-bem-dom', 'utils', 'events', 'button', 'input'], function (provide, bemDom, utils, events, button, input) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    // TODO: проверить на string
                    var register = new events.Event('register');
                    var login = new events.Event('login');

                    // TODO: подключить button и явно передавать
                    this._events(this.findChildBlocks(button))
                        .on(register, this._onRegister)
                        .on(login, this._onLogin)
                }
            }
        },

        // TODO: Можно если передать через data event-a?
        _onRegister: function (originalEvent) {
            console.log('BEM event: register', originalEvent)

            // TODO: отключать на все события?
            originalEvent.preventDefault()

            // TODO: получать данные по-другому?
            const inputs = this.findChildBlocks(input);
            console.log(inputs)
            const username = inputs.get(0).domElem[0].value;
            const password = inputs.get(1).domElem[0].value;

            utils.registerUser(username, password)
                .then(user => {
                    // TODO: redirect
                    window.location = '../ready/ready.html';
                    console.log('register: ', user);
                })
        },

        _onLogin: function (originalEvent) {
            console.log('BEM event: login')
            originalEvent.preventDefault()

            const inputs = this.findChildBlocks(input);
            const username = inputs.get(0).domElem[0].value;
            const password = inputs.get(1).domElem[0].value;

            utils.loginUser(username, password)
                .then(user => {
                    window.location = '../ready/ready.html';
                    console.log('login: ', user);
                })
        }

    }, {
        lazyInit: false,
    }));

});
