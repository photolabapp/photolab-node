module.exports = (sequelize, Sequelize) => {
    return sequelize.define('address', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER, field: "user_id" },
        type: { type: Sequelize.STRING },
        recipient: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        number: { type: Sequelize.STRING },
        city: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        cep: { type: Sequelize.STRING },
        price: { type: Sequelize.DECIMAL },
        selected: { type: Sequelize.BOOLEAN, defaultValue: false },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        });
};
