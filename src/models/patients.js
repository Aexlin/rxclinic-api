// JavaScript source code
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patients extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Patient

            // % M:1 (belongsTo) [patients].[updated_by] -> [user].[user_id]
            // % Many patients data can be updated by a single admin/patient
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'patient_updated_by_admin_patient',
                onDelete: 'RESTRICT',
            });

            // % 1:1 (belongsTo) [patient].[created_by] -> [users].[user_id]
            // % Patient creates self
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_user',
                onDelete: 'RESTRICT',
            });

            // % 1:M (belongsTo) [patient].[updated_by] -> [users].[user_id]
            // % Many patient data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'patient_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:M (belongsTo) [patallergies].[user_id] -> [users].[user_id]
            // % Many patients can have many allergies
            this.belongsToMany(models.PatAllergies, {
                through: 'patallergies',
                as: 'allergies',
                foreignKey: 'user_id',
                onDelete: 'RESTRICT',
            });

            // % M:M (belongsTo) [patfammedhist].[user_id] -> [users].[user_id]
            // % Many patients can have many allergies
            this.belongsTo(models.PatFamMedHist, {
                through: 'patfammedhist',
                as: 'patient_medhist',
                foreignKey: 'user_id',
                onDelete: 'RESTRICT',
            });

            // // % M:M (belongsTo) [patients].[user_id] -> [consultations].[pat_user_id]
            // // % Many patients can have many consultations
            // this.belongsToMany(models.Consultations, {
            //     through: 'consultations',
            //     as: 'consultations',
            //     foreignKey: 'pat_user_id',
            //     onDelete: 'RESTRICT',
            // });

        }
    }
    Patients.init({
        // user_id, sex, civil_status, weight_lbs, height_ft, heigh_in, bmi_num, bmi_status, temp_celsius
        // bp_systolic, bp_diastolic, bloodtype, mens_period, pat_status, created_by, updated_by

        user_id: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[patients].[user_id] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors, Patients, & Admin, that determines user id.'
        },

        sex: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Patient biological sex'
        },

        civil_status: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Patient civil status'
        },

        weight_lbs: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Patient weight in pounds'
        },

        height_ft: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Patient height in feet'
        },

        height_in: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Patient height in inches'
        },

        bmi_num: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Patient BMI number'
        },

        bmi_status: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Patient BMI status'
        },

        temp_cel: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Patient temperature in celsius'
        },

        bp_systolic: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Patient blood pressure systolic'
        },

        bp_diastolic: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Patient blood pressure diastolic'
        },

        bloodtype: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Patient blood type'
        },

        mens_period: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Patient menstrual period'
        },

        user_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[patients].[user_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[patients].[user_status] must be either `Active` or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Patient status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[patients].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Patients, that determines who created the user.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[patients].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Patients, that determines who updated the user.'
        }

    }, {
        sequelize,
        modelName: 'Patients',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // tableName: 'users', -> to change table name.
    });
    return Patients;
};