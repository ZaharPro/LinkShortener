# LinkShortener
LinkShortener is a service for compressing URL links and monitoring their count. 

## Installation

Use the package manager npm to install and run sever.

```bash
npm install
```
Then install and run client application.

```bash
cd client
npm install
```

## Configuration

Set up the application in the production.json file, specify the server port, secret key, connection link to mongodb and server url

```js
{
  "port": 7000,
  "jwtSecret": "10101010100101",
  "mongoUri": "mongodb+srv://<login>:<password>@cluster.mqj11.mongodb.net/dbname?retryWrites=true&w=majority",
  "baseUrl": "http://localhost:7000"
}
```
## Run

Server startup script

```bash
npm start
```
Client startup script

```bash
cd client
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.