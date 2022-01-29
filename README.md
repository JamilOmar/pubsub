### PUB SUB

This demo shows the file processing from logs to a tally format per user's email. All the users' information is being stored in a
mongo database.

### Start in dev env

Create: - folder input/logs - folder output/logs

```sh
npm i
npm run docker:test:up
npm start
```

Add any log in the input's folder.

Important: Using the npm run docker:test:up command will expose Mongo and Redis locally.

For stoping

```sh
npm run docker:test:down
```

### Start in prod env

```sh
npm run docker:up
```

Add any log in the input's folder.

```sh
npm run docker:down
```
