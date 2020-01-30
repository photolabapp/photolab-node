module.exports = (sequelize, Sequelize) => {
    return sequelize.define('creditTransaction', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER, field: "user_id" },
        orderId: { type: Sequelize.INTEGER, field: "order_id" },
        // CREDIT, DEBIT
        type: { type: Sequelize.STRING },
        quantity: { type: Sequelize.INTEGER },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        });
};
