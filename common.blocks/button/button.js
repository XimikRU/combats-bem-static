modules.define('button', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declBlock(this.name, 
    {
        onSetMod: {
            js: {
                inited: function() {
                    console.log('block button inited' , this._uniqId);
                }
            }
        },
    },
    {
        lazyInit : false,
    }
));

});
