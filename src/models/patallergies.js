// JavaScript source code
// JavaScript source code
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PatAllergies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Patient

            // % M:1 (belongsTo) [allergies].[created_by] -> [allergies].[allergy_id]
            // % Many allergy data can be added by a single patient
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'allergy_created_by_patient',
                onDelete: 'RESTRICT',
            });

            // % 1:M (belongsTo) [allergies].[updated_by] -> [allergies].[allergy_id]
            // % Many allergy data can be updated by a single patient
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'allergy_updated_by_patient',
                onDelete: 'RESTRICT',
            });
        }
    }
    PatAllergies.init({
        //user_id, allergy_id, allergy_name, allergy_status, created_by, updated_by

        user_id: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[patallergies].[user_id] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors, Patients, & Admin, that determines user id.'
        },

        allergy_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        allergy_name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: '[patallergies].[allergy_name] value cannot be empty' },
                len: { args: [1, 50], msg: '[patallergies].[allergy_name] value length must be between 1 and 50' },
            },
            comment: 'This column is for Patients, that determines allergy name.'
        },

        allergy_status: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                allowNull: { msg: '[patallergies].[allergy_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[patallergies].[allergy_status] must be either `Active` or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Patient allergy status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[patallergies].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Patients, that determines who created the allergy.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[patallergies].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Patients, that determines who updated the allergy.'
        },



    }, {
        sequelize,
        modelName: 'PatAllergies',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return PatAllergies;
};