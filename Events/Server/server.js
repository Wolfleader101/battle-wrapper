const axios = require('axios');
const moment = require('moment')
const dateFormat = "DD-MM-YYYY";

axios.defaults.baseURL = 'https://api.battlemetrics.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
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