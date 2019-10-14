module.exports = (sequelize, Sequelize) => {
    return sequelize.define('orderPhoto', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        order_id: { type: Sequelize.INTEGER },
        user_id: { type: Sequelize.INTEGER },
        photo: { type: Sequelize.TEXT },
        type: { type: Sequelize.TEXT },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
