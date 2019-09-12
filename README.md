# Scoutbase UI and Server

![scoutbase-ui screenshot](https://raw.githubusercontent.com/mbehtemam/scoutbase-ui/master/images/countries-2.png)
there are two repositories that contains what I do for Scoutbase . one of them is
[Scoutbase-UI](https://github.com/mbehtemam/scoutbase-ui) and the other one is [Scoutbase-Server](https://github.com/mbehtemam/scoutbase-server)

## Scoutbase Server

Scoutbase was written with Node JS, Typescript , Apollo Server, GraphQL , KnexJS and Sqlite as a database. also I include database that I using and fill it with some data.

### Installing and Running Scoutbase Server

- clone the repository
- install the packages with yarn or npm
- run the server after compiling it with Typescript
- sever will run on port 4000

so :
first

```sh
    $ git clone https://github.com/MBehtemam/scoutbase-server.git
```

then :

```sh
    $ cd scoutbase-server && yarn install
```

for running Typescript compiler and also running server you can run this command:

```sh
    $ yarn dev
```

after this command Typescript compile all the codes and server runs on port 4000

## Scoutbase UI

Scoutbase UI is a UI that written with React, styled-components, Typescript , Apollo Client, React-Router, Highchart and Flexbox for css layouts.

### Installing and Running Scoutbase UI

- clone the repository
- install the packages with yarn or npm
- run the UI after compiling it with Typescript
- ui will run on port 3000 and automatically connect to server on port 54000

so :
first

```sh
    $ git clone https://github.com/mbehtemam/scoutbase-server
```

then :

```sh
    $ cd scoutbase-ui && yarn install
```

for running Typescript compiler and also running ui you can run this command:

```sh
    $ yarn start
```
