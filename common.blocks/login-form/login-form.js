modules.define('login-form', ['i-bem-dom','utils'], function(provide, bemDom, utils) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                console.log('form inited')
            }
        }
    }
},{
    lazyInit : true,

    onInit : function() {
        // TODO: на БЭМ событие подписаться
        // TODO: поменять логику на login/register
        this._domEvents('button').on('click', function(originalEvent){
            console.log('form initalized & click event catched')
            originalEvent.preventDefault()

            const inputs = this.findChildElems('input');
            const username = inputs.get(0).domElem[0].value;
            const password = inputs.get(1).domElem[0].value;

            utils.registerUser(username, password)
                .then(user => {
                    console.log(user);
                })
            
        });
    }
}));

});
