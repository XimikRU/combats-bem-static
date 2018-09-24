modules.define('button', ['utils'], function(provide, utils,Button) {

provide(Button.declMod({ modName: 'fight', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments) // Родительский
                this._events(this).on('fight', this.goFight); // можно через ДОМ click

                console.log('block button mod fight', this._uniqId);
            }
        }
    },

    // Вынести в utils?
    goFight: function(){
        return utils.apiRequest('/fight', { method: 'POST', body: `token=${utils.getUser().token}` })
            .then(apiAnswer => {
                if(apiAnswer.status === 'ok' && apiAnswer.combat){
                    console.log(apiAnswer)
                    utils.setCombatObject(apiAnswer.combat);
                    //return waitForCombat(localUser.token, apiAnswer.combat.id)
                }
                else{
                    console.error('apianswer != ok')
                    return;
                }
            })
            .catch(reason => {
                console.error('FightAPI req error: ' + reason);
            });
    }
}));

});
