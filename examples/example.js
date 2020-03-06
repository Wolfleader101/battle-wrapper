const {GetServerInfoByName, GetServerInfoById, GetServerId} = require('../app');


GetServerId('DankBank','rust')
.then(result => {
    GetServerInfoById(result[2].Id)
    .then(res => {
        console.log(res)
    })
})
