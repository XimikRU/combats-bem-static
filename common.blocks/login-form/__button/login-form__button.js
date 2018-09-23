modules.define('login-form__button', ['i-bem-dom', 'events'], function(provide, bemDom, events) {

provide(bemDom.declElem('login-form', 'button', {
    onSetMod: {
        js: {
            inited: function() {
                this._action = this.getAction(); // Получение action кнопки из JS параметра
                this._domEvents().on('click', this._onClick); // обработчик ДОМ события "click"
            }
        }
    },

    _onClick: function(originalEvent) {
            originalEvent.preventDefault(); // отключаем отправку формы

            var event = new events.Event(this._action); 
            this._emit(event); // создание БЭМ-события "click"
    },

    getAction: function() {
        return this.params.action;
    },
},{
    lazyInit: false
}));

});
