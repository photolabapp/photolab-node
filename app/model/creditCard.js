module.exports = (sequelize, Sequelize) => {
    return sequelize.define('creditCard', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER, field: "user_id" },
        brand: { type: Sequelize.STRING },
        number: { type: Sequelize.STRING },
        dueDate: { type: Sequelize.STRING },
        cpf: { type: Sequelize.STRING },
        cardHolder: { type: Sequelize.STRING },
        token: { type: Sequelize.STRING },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        });
};
