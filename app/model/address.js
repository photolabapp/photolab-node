module.exports = (sequelize, Sequelize) => {
    return sequelize.define('order', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER, field: "user_id" },
        title: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        number: { type: Sequelize.STRING },
        complement: { type: Sequelize.STRING },
        cep: { type: Sequelize.STRING },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
