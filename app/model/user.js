module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        cellPhone: { type: Sequelize.STRING },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
