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

            // % M:1 (belongsTo) [patfammedhist].[created_by] -> [users].[user_id]
            // % M:1 (belongsTo) [patfammedhist].[medhist_id] -> [users].[user_id]
            // % Many fammedhist data can be added by a single patient
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'patient_fammedhist',
                onDelete: 'RESTRICT',
            });

            // % Many fammedhius data can be added by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'fammedhis_created_by_patient',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [medhis].[updated_by] -> [users].[user_id]
            // % Many medhis data can be updated by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'fammedhis_updated_by_patient',
                onDelete: 'RESTRICT',
            });

        }
    }
    PatFamMedHist.init({
        //medhist_id, medhist_name, user_id, medhist_status, created_by, updated_by

        medhist_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            comment: 'Patient Medical History ID',
        },

        medhist_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[patfammedhist].[medhist_name] cannot be null!' },
                notEmpty: { msg: '[patfammedhist].[medhist_name] cannot be blank or empty!' }
            },
            comment: 'medhis name. Example values are: A1, A2, A3, etc...'
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true,
            validate: {
                isUUID: { args: 4, msg: '[patfammedhist].[user_id] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Patients that determines user id.'
        },

        medhist_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[patfammedhist].[medhist_status] cannot be null!' },
                notEmpty: { msg: '[patfammedhist].[medhist_status] cannot be blank or empty!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[patfammedhist].[medhist_status] must be either `Active` or `Inactive`!'
                }
            },
            defaultValue: 'Active',
            comment: 'medhis status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[patfammedhist].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin, that determines who created the fam med his.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[patfammedhist].[updated_by] value must be a UUIDV4 type' },
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