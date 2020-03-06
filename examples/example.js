const {GetServerInfoByName, GetServerInfoById, GetServerId, GetServerPlayerCount} = require('../app');


GetServerId('DankBank','rust')
.then(result => {
    GetServerPlayerCount(result[2].Id)
    .then(res => {
        console.log(res)
    })
})
