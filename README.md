# KetemuEnak-BE

## Project Setup

### Install dependencies

Use NPM to install dependencies:

```
npm install
```

### Setup environment variables

Copy the content of `app/config/config.json.example` to `app/config/config.json` and `env.example` to `env`

```
cp app/config/config.json.example app/config/config.json
cp env.example .env
```

and fill your environment variables.

### Run migrations

To execute migrations, you can use:

> [Sequelize Lazy Migration](https://github.com/matmar10/sequelize-lazy-migrations)

by running the following command:

```
cd app
runmigration
```

or

```
cd app
npx runmigration
```

To generate a migration, you can run the following command:

```
cd app
makemigration --name <migration name>
```

or

```
cd app
npx makemigration --name <migration name>
```

### Run development server

Run the development server with the following command:

```
npm run dev
```
