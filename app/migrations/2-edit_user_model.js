'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "socmed_or_web_url" to table "Users"
 * addColumn "contact" to table "Users"
 *
 **/

var info = {
	revision: 2,
	name: 'edit_user_model',
	created: '2023-11-04T08:49:14.664Z',
	comment: ''
};

var migrationCommands = [
	{
		fn: 'addColumn',
		params: [
			'Users',
			'socmed_or_web_url',
			{
				type: Sequelize.STRING,
				field: 'socmed_or_web_url'
			}
		]
	},
	{
		fn: 'addColumn',
		params: [
			'Users',
			'contact',
			{
				type: Sequelize.STRING,
				field: 'contact'
			}
		]
	}
];

module.exports = {
	pos: 0,
	up: function (queryInterface, Sequelize) {
		var index = this.pos;
		return new Promise(function (resolve, reject) {
			function next() {
				if (index < migrationCommands.length) {
					let command = migrationCommands[index];
					console.log('[#' + index + '] execute: ' + command.fn);
					index++;
					queryInterface[command.fn]
						.apply(queryInterface, command.params)
						.then(next, reject);
				} else resolve();
			}
			next();
		});
	},
	info: info
};
