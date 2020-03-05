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
                        Rank: attr.rank,
                        Description: attr.details.rust_description
                    }
                    servers.push(info);
                });
                return servers;
            })
    },

}