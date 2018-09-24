modules.define('button', ['i-bem-dom', 'events'], function(provide, bemDom, events) {

provide(bemDom.declBlock(this.name, 
    {
        onSetMod: {
            js: {
                inited: function() {
                    console.log('block button inited' , this._uniqId);
                    this._action = this.getAction(); // Получение action кнопки из JS параметра
                    this._domEvents().on('click', this._onClick); // обработчик ДОМ события "click"
                }
            }
        },

        _onClick: function(originalEvent) {
            originalEvent.preventDefault(); // отключаем отправку формы

            var event = new events.Event(this._action); 
            this._emit(event); // создание БЭМ-события "action"
        },
        
        getAction: function() {
            return this.params.action;
        },
    },
    {
        lazyInit : false,
    }
));

});
