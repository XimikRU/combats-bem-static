modules.define('login-form__input', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declElem('login-form', 'input', {
    onSetMod: {
        js: {
            inited: function() {
                console.log('input inited')
            }
        }
    }
}));

});
