const axios = require('axios');

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
    GetServerId: (serverName, gameType, serverStatus="online") => {
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
}