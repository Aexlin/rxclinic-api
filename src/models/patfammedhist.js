'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PatFamMedHist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // % M:1 (belongsTo) [fammedhis].[created_by] -> [users].[user_id]
            // % Many fammedhius data can be added by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'fammedhis_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [medhis].[updated_by] -> [users].[user_id]
            // % Many medhis data can be updated by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'fammedhis_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            // % 1:1 (belongsTo) [medhis].[medhis_id] -> [patient].[medhis_id]
            // % One medhis is assigned to one patient.
            this.belongsTo(models.Patients, {
                foreignKey: 'user_id',
                as: 'patient',
                onDelete: 'RESTRICT',
            });
        }
    }
    PatFamMedHist.init({
        medhis_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'UUID for the medhis table.'
        },

        _name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[fammedhis].[medhis_name] cannot be null!' },
                notEmpty: { msg: '[fammehis].[medhis_name] cannot be blank or empty!' }
            },
            comment: 'medhis name. Example values are: A1, A2, A3, etc...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[users].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin, that determines who created the fam med his.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin, that determines who updated the fam med his.'

        },
    }, {
        sequelize,
        modelName: 'PatFamMedHist',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return PatFamMedHist;
};