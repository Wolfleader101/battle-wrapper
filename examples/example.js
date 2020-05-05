const BR = require('../app')

// GetServerId('DankBank','rust')
// .then(result => {
//     console.log(result)
// })
// GetServerPlayerCount(4172964)
// .then(res => {
//     console.log(res)
// })
// GetServerRankHistory(4172964)
// .then(res => {
//     console.log(res)
// })

// GetServerPlayerCountHistory(4172964)
//     .then(result => {
//         console.log(result)
//     })
//     .catch(err => {
//         console.error(err);
//     })

BR.Server.GetServerInfoById(4172964)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err);
    })