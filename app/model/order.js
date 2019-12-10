module.exports = (sequelize, Sequelize) => {
    return sequelize.define('order', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        userId: { type: Sequelize.INTEGER, field: "user_id" },
        status: { type: Sequelize.STRING },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
        user: Sequelize.VIRTUAL,
        album: Sequelize.VIRTUAL,
        qtdPhotos: Sequelize.VIRTUAL
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
