module.exports = (sequelize, Sequelize) => {
    return sequelize.define('collaborator', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        cellPhone: { type: Sequelize.STRING, field: "cell_phone" },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
