module.exports = (sequelize, Sequelize) => {
    return sequelize.define('order', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        user_id: { type: Sequelize.INTEGER },
        status: { type: Sequelize.STRING },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
