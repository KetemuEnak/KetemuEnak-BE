module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define(
		'Users',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			role: {
				type: Sequelize.ENUM('seller', 'eo'),
				allowNull: false
			},
			address: {
				type: Sequelize.STRING
			},
			contact: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			city: {
				type: Sequelize.STRING
			},
			img_url: {
				type: Sequelize.STRING
			},
			socmed_or_web_url: {
				type: Sequelize.STRING
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		},
		{
			timestamps: false, // Disable the default timestamps created_at and updated_at
			tableName: 'Users' // Specify the name of your table if it's different from the model name
		}
	);

	return Users;
};
