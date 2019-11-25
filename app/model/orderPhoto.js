module.exports = (sequelize, Sequelize) => {
    return sequelize.define('orderPhoto', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        orderId: { type: Sequelize.INTEGER, field: "order_id" },
        userId: { type: Sequelize.INTEGER, field: "user_id" },
        quantity: { type: Sequelize.INTEGER },
        format: { type: Sequelize.TEXT },
        photo: { type: Sequelize.TEXT },
        type: { type: Sequelize.TEXT },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
