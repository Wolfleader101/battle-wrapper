const {GetServerId, GetServerPlayerCount, GetServerRankHistory} = require('../app');


GetServerId('DankBank','rust')
.then(result => {
    GetServerPlayerCount(result[2].Id)
    .then(res => {
        console.log(res)
    })
})

// GetServerRankHistory(4172964)
// .then(res => {
//     console.log(res)
// })

// GetServerPlayerCountHistory(4172964)
// .then(result => {
//     console.log(result)
// })
// .catch(err => {
//     console.error(err);
// })
