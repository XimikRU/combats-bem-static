modules.define('utils', function (provide) {
    var utils = {
        handleErrors: function(response) {
            if (response.status === 403) {
                showMessage('forbidden');
            }
            if (response.status >= 400)
                return Promise.reject(response);
            else return response;
        },
    
        apiRequest: function(request, {method, body} = {}) {
            return fetch(`http://localhost:5555${request}`, {
                method,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                body
            })
            .then(this.handleErrors)
            .then(response => response.json())
        },
    
         setUser: function(userObj) {
            localStorage.setItem('user', JSON.stringify(userObj))
            return true;
        },
    
         getUser: function() {
            var userObj = localStorage.getItem('user');
            if (userObj)
                return JSON.parse(userObj);
            else
                return null;
        },
    
         setCombatObject: function(combatObj) {
            localStorage.setItem('combat', JSON.stringify(combatObj));
            return true;
        },
    
         getCombatObject: function() {
            var combatObj = localStorage.getItem('combat');
            if (combatObj)
                return JSON.parse(combatObj);
            else
                return null;
        },
    
         clearLocalStorage: function() {
            localStorage.removeItem('user');
            localStorage.removeItem('combat');
            return true;
        },
    
         whoAmI: function() {
            return new Promise((resolve, reject) => {
                var localUser;
                if (localUser = getUser()) {
                    apiRequest(`/whoami?token=${localUser.token}`)
                        .then(apiAnswer => {
                            if (apiAnswer.status === 'ok') {
                                resolve(apiAnswer);
                            } else {
                                reject('WhoAmi.status != OK; ');
                            }
                        })
                        .catch(reason => {
                            reject('whoAmiAPI error; ' + reason);
                        });
                }
                else{
                    reject('Cant getUser(); ');
                }
            });
        },
    
         showProfile: function(event){
            var user_id = event.target.dataset.user;
            var token = getUser().token;
            return getUserInfo(user_id, token)
                .then(apiAnswer => {
                    fillProfile(apiAnswer.user, apiAnswer.combats);
                })
                .catch(reason => {console.error('getUserInfo err: ' + reason);})
        },
    
         getUserInfo: function(user_id, token){
            return new Promise((resolve, reject) => {
                apiRequest(`/info?token=${localUser.token}&user_id=${user_id}`)
                    .then(apiAnswer => {
                        if (apiAnswer.status === 'ok' && apiAnswer.user) {
                            resolve(apiAnswer);
                        } else {
                            reject('getUserInfo.status != OK; ');
                        }
                    })  
                    .catch(reason => {
                        reject('/Info req error; ' + reason);
                    });
            });
        },
    
         fillProfile: function(user, combats) {
            var vdd = vddPersonal(combats);
            document.getElementsByClassName("user_name")[0].innerHTML = "";
            document.querySelector(".victories").innerHTML = "";
            document.getElementsByClassName("battleCount")[0].innerHTML = "";
            document.getElementsByClassName("lastStatus")[0].innerHTML = "";
    
            document.getElementsByClassName("user_name")[0].innerHTML = user.username;
            document.querySelector(".victories").innerHTML = vdd.victories;
            document.getElementsByClassName("parange")[0].style.display = 'block';
            document.getElementsByClassName("battleCount")[0].innerHTML = combats.length;
            if(combats.length > 0){
                document.getElementsByClassName("lastStatus")[0].innerHTML = combats[combats.length-1].status;
            }
        },
    
         hideUserProfile: function() {
            document.getElementsByClassName("parange")[0].style.display = 'none';
        },
    
         getOnline: function() {
            return apiRequest('/online')
                .then(apiAnswer => { return apiAnswer.users; })
                .catch(reason => { return []; });
        },
    
         addList: function(userList) {
            var liUserList = userList.map(item => {
                return `<li><a data-user='${item.id}'>${item.username}</a></li>`;
            });
            var listElement = document.querySelector('.nav-ul');
            listElement.innerHTML += liUserList.join('');
        },
    
         checkCombatStatus: function(userToken, combatId){
            return apiRequest(`/status?token=${userToken}&combat_id=${combatId}`)
                .then(apiAnswer => { return apiAnswer; })
                .catch(reason => { console.error('WaitForBattle.timeout.ApiRequest() error:: ' + reason); }) 
        },
    
         logOut: function(){
            if(clearLocalStorage())
                window.location = '/login/';
        },
    
         showMessage: function(message) {
            var newDiv = document.createElement("P");
            var newContent;
            if (message.status && message.statusText) 
                newContent = document.createTextNode("status: " + message.status + " " + message.statusText);
            else 
                newContent = document.createTextNode(message);
            newDiv.setAttribute("class", "messageDialog showMessage");
            newDiv.appendChild(newContent);
            document.body.appendChild(newDiv);
        },
    
         vddCalculate: function(combats){
            var victories = 0, defeats = 0, draws = 0;
            combats.forEach(combat => {
                if ((combat.you) && (combat.enemy)){
                    var you = combat.you.health;
                    var enemy = combat.enemy.health;
    
                    you > enemy ? victories++ : 
                        you < enemy ? defeats++ : draws++;
                }
            });
            var vdd = {victories: victories, defeats: defeats, draws: draws};
            return vdd;
        },
    
         vddPersonal: function(combats){
            var victories = 0, defeats = 0, draws = 0;
            combats.forEach(combat => {
                var you, enemy;
                if ((combat.you) && (combat.enemy)){
                you = combat.you.health;
                enemy = combat.enemy.health;
                you > enemy ? victories++ : 
                    you < enemy ? defeats++ : draws++;
                }
            });
            var vdd = {victories: victories, defeats: defeats, draws: draws};
            return vdd;
        },

        registerUser: function(username, password) {
            return new Promise((resolve, reject) => {
                this.apiRequest('/register', {
                        method: 'POST',
                        body: `username=${username}&password=${password}`
                    })
                    .then(apiAnswer => {
                        if (apiAnswer.status === 'ok' && apiAnswer.user) {
                            if(this.setUser(apiAnswer.user)){
                                resolve(apiAnswer.user);
                            }
                            else{
                                reject('Cant setUser();')
                            }
                        }
                        else{
                            reject('parsedAnswerRegister.status != OK;');
                        }
                    })
                    .catch(reason => reject(reason));
            });
        },
        
        loginUser: function(username, password) {
            return new Promise((resolve, reject) => {
                apiRequest('/login', {
                        method: 'POST',
                        body: `username=${username}&password=${password}`
                    })
                    .then(apiAnswer => {
                        if (apiAnswer.status === 'ok' && apiAnswer.user) {
                            if(setUser(apiAnswer.user)){
                                resolve(apiAnswer.user);
                            }
                            else{
                                reject('Cant setUser(); ');
                            }
                        }
                        else{
                            reject('LoginAnswer.status != ok; ');
                        }       
                    })
                    .catch(reason => reject(reason));
            });
        }
        
    }
    provide(utils);

});
