'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "tutorials", deps: []
 * createTable "Users", deps: []
 * createTable "Events", deps: [Users]
 * createTable "Sellers", deps: [Users, Events]
 * createTable "Foods", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "model-init",
    "created": "2023-10-18T07:34:59.281Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "tutorials",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "published": {
                    "type": Sequelize.BOOLEAN,
                    "field": "published"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.ENUM('seller', 'eo'),
                    "field": "role",
                    "allowNull": false
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "img_url": {
                    "type": Sequelize.STRING,
                    "field": "img_url"
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "defaultValue": Sequelize.Literal
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "defaultValue": Sequelize.Literal
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Events",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title"
                },
                "id_eo": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "id_eo",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    }
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "img_url": {
                    "type": Sequelize.STRING,
                    "field": "img_url"
                },
                "time": {
                    "type": Sequelize.DATE,
                    "field": "time"
                },
                "alamat": {
                    "type": Sequelize.STRING,
                    "field": "alamat"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "ticket_price": {
                    "type": Sequelize.INTEGER,
                    "field": "ticket_price",
                    "defaultValue": 0
                },
                "max_seller": {
                    "type": Sequelize.INTEGER,
                    "field": "max_seller"
                },
                "url_website": {
                    "type": Sequelize.STRING,
                    "field": "url_website",
                    "allowNull": true
                },
                "is_publish": {
                    "type": Sequelize.BOOLEAN,
                    "field": "is_publish"
                },
                "published_at": {
                    "type": Sequelize.DATE,
                    "field": "published_at",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Sellers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "id_seller": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "id_seller",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    }
                },
                "id_event": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "id_event",
                    "references": {
                        "model": "Events",
                        "key": "id"
                    }
                },
                "status": {
                    "type": Sequelize.ENUM('pending', 'accepted', 'rejected'),
                    "field": "status"
                },
                "accepted_at": {
                    "type": Sequelize.DATE,
                    "field": "accepted_at",
                    "allowNull": true
                },
                "rejected_at": {
                    "type": Sequelize.DATE,
                    "field": "rejected_at",
                    "allowNull": true
                },
                "rejected_reason": {
                    "type": Sequelize.STRING,
                    "field": "rejected_reason",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Foods",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "id_users": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "allowNull": true,
                    "field": "id_users",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    }
                },
                "category": {
                    "type": Sequelize.ENUM('food', 'snack', 'drink'),
                    "field": "category"
                },
                "food_name": {
                    "type": Sequelize.STRING,
                    "field": "food_name"
                },
                "img_url": {
                    "type": Sequelize.STRING,
                    "field": "img_url"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
