const axios = require('axios');
const moment = require('moment')
const dateFormat = "DD-MM-YYYY";

axios.defaults.baseURL = 'https://api.battlemetrics.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
module.exports = {
    /**
     * @param {string} serverName - Server name
     * @param {string} gameType - Name of game
     * @param {string} serverStatus - (optional)Status of server
     */
    GetServerInfoByName: (serverName, gameType, serverStatus = "online") => {
        return axios.get(`/servers?filter[search]='${serverName}&filter[game]=${gameType}&filter[status]=${serverStatus}`)
            .then(res => {
                let servers = [];
                res.data.data.forEach(el => {
                    attr = el.attributes;
                    let info = {
                        Id: attr.id,
                        Name: attr.name,
                        Population: attr.players + "/" + attr.maxPlayers,
                        Country: attr.country,
                        Rank: attr.rank,
                        Description: attr.details.rust_description
                    }
                    servers.push(info);
                });
                return servers;
            })
    },
    /**
     * @param {number} serverId - ID of the server
     */
    GetServerInfoById: (serverId) => {
        return axios.get(`/servers/${serverId}`)
            .then(res => {
                attr = res.data.data.attributes;
                let info = {
                    Id: attr.id,
                    Name: attr.name,
                    Population: attr.players + "/" + attr.maxPlayers,
                    Country: attr.country,
                    Rank: attr.rank,
                    Description: attr.details.rust_description
                }
                return info;
            })
    },
    /**
     * @param {string} serverName - Server name
     * @param {string} gameType - Name of game
     * @param {string} serverStatus - (optional)Status of server
     */
    GetServerId: (serverName, gameType, serverStatus = "online") => {
        return axios.get(`/servers?filter[search]='${serverName}&filter[game]=${gameType}&filter[status]=${serverStatus}`)
            .then(res => {
                let servers = [];
                res.data.data.forEach(el => {
                    attr = el.attributes;
                    let info = {
                        Id: attr.id,
                        Name: attr.name,
                    }
                    servers.push(info);
                });
                return servers;
            })
    },
    /**
     * @param {number} serverId - ID of the server
     */
    GetServerPlayerCount: (serverId) => {
        return axios.get(`/servers/${serverId}`)
            .then(res => {
                attr = res.data.data.attributes;
                let info = {
                    Population: attr.players + "/" + attr.maxPlayers,
                }
                return info;
            })
    },
    /**
     * @param {number} serverId - ID of the server
     * @param {number} PastDays - number of days for player count max of 90
     */
    GetServerPlayerCountHistory: (serverId, PastDays = 90) => {

        let end = moment().toJSON();
        let start = moment().subtract(`${PastDays}`, 'days').toJSON();
        return axios.get(`servers/${serverId}/player-count-history?start=${start}&stop=${end}`)
            .then(res => {
                let times = [];
                res.data.data.forEach(el => {
                    let attr = el.attributes;
                    let FormatTime = moment(attr.timestamp).format(dateFormat);
                    let info = {
                        Time: FormatTime,
                        MaxPlayers: attr.max,
                        MinPlayers: attr.min
                    }
                    times.push(info)
                })

                return times;
            })
    },
    /**
     * @param {number} serverId - ID of the server
     * @param {number} PastDays - number of days for player count max of 90
     */
    GetServerRankHistory: (serverId, PastDays = 90) => {

        let end = moment().toJSON();
        let start = moment().subtract(`${PastDays}`, 'days').toJSON();
        return axios.get(`servers/${serverId}/rank-history?start=${start}&stop=${end}`)
            .then(res => {
                let times = [];
                res.data.data.forEach(el => {
                    let attr = el.attributes;
                    let FormatTime = moment(attr.timestamp).format(dateFormat);
                    let info = {
                        Time: FormatTime,
                        Rank: attr.value,
                    }
                    times.push(info)
                })

                return times;
            })
    },
    /**
     * @param {number} serverId - ID of the server
     * @param {number} PastDays - number of days for player count max of 90
     */
    GetServerGroupRankHistory: (serverId, PastDays = 90) => {

        let end = moment().toJSON();
        let start = moment().subtract(`${PastDays}`, 'days').toJSON();
        return axios.get(`servers/${serverId}/group-rank-history?start=${start}&stop=${end}`)
            .then(res => {
                let times = [];
                res.data.data.forEach(el => {
                    let attr = el.attributes;
                    let FormatTime = moment(attr.timestamp).format(dateFormat);
                    let info = {
                        Time: FormatTime,
                        Rank: attr.value,
                    }
                    times.push(info)
                })

                return times;
            })
    },
}