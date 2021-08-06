# Welcome to Battle Wrapper!

**Battle Wrapper** is a free and open source **BattleMetrics API** Wrapper that easily allows any Node.JS developer to use their API with ease.
**Battle Wrapper** Is still curently in **Beta** and is continuously getting updated! If you have any issues or want to suggest a change head over to the [Github Repo](https://github.com/Wolfleader101/battle-wrapper)

# Getting Started!

**_please note i will use method and function interchangeably_**

Getting started using the BattleMetrics API is easier than ever. Below are some Demos for how the API works.

All of our methods are promise based and give back an array of **JSON** objects

For any **Server** methods that require a name, they will also require a game type, for example
`Server.GetServerInfoByName("DankBank", "rust")`

All **Server** methods that get _history_ have a limit of 90 days.
The following would work:

```js
Server.GetServerPlayerCountHistory(4172964).then((result) => {
  console.log(result);
});
```

```js
Server.GetServerPlayerCountHistory(4172964, 50) // valid
  .then((result) => {
    console.log(result);
  });
```

However this would not work

```js
Server.GetServerPlayerCountHistory(4172964, 100).then((result) => {
  console.log(result); // Request failed with status code 400
});
```

## Getting Server Id by name

An Id is needed to get information about your favourite game server. Fortunately for you, we provide an easy to use function that will return an array of servers.

Below is the preferred method:

```js
const { Server } = require("battle-wrapper");
Server.GetServerId("DankBank", "rust").then((result) => {
  console.log(result);
});
```

An alternative would be to set a parent variable:

```js
const battleWrapper = require("battle-wrapper");
battleWrapper.Server.GetServerId("DankBank", "rust").then((result) => {
  console.log(result);
});
```

This will return your array of servers matching that name

```js
[{
    Id: '4172964',
    Name: '[AU] DankBank Build | Creative | PVE | Sandbox'
}, {
    Id: '4398838',
    Name: '[EU] DankBank Build | Creative | PVE | Sandbox'
}, {
    Id: '4400232',
    Name: '[NA] DankBank Build | Creative | PVE | Sandbox'
}, ...
]
```
