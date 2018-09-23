modules.define('login-form__button', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declElem('login-form', 'button', {
    onSetMod: {
        js: {
            inited: function() {
                console.log('button inited')
                this._action = this.getAction();
                // TODO: создать БЭМ событие чтобы форма подписалась
                this._domEvents().on('click', function() {
                    console.log('clicked button-action: ' + this._action)
                });
            }
        }
    },

    getAction: function() {
        return this.params.action;
    },
},{
    lazyInit: false
}));

});
