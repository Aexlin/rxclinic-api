'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Consultations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Patient

            // % M:1 (belongsTo) [consultations].[created_by] -> [user].[user_id]
            // % Many consultations data can be created by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'consultation_created_by_patient',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });

            // % M:1 (belongsTo) [consultations].[updated_by] -> [user].[user_id]
            // % Many consultations data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'consultation_updated_by_admin',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });

            // // % M:1 (belongsTo) [consultations].[created_by] -> [user].[user_id]
            // // % Many consultations data can be created by a single admin/doctor
            // this.belongsTo(models.User, {
            //     foreignKey: 'created_by',
            //     as: 'consultation_created_by_doctor',
            //     onDelete: 'RESTRICT',
            // });

            // // % M:1 (belongsTo) [consultations].[updated_by] -> [user].[user_id]
            // // % Many consultations data can be updated by a single admin/doctor
            // this.belongsTo(models.User, {
            //     foreignKey: 'updated_by',
            //     as: 'consultation_updated_by_doctor',
            //     onDelete: 'RESTRICT',
            // });

            // //% M:M (hasMany) [consultations].[pat_user_id] -> [patients].[user_id]
            // //% Many consultations can be created by a single patient
            // this.hasMany(models.Patients, {
            //     foreignKey: 'user_id',
            //     as: 'consultation_patient',
            //     onDelete: 'RESTRICT',
            // });

            // //% M:M (hasMany) [consultations].[doc_user_id] -> [doctors].[user_id]
            // //% Many consultations have many doctors
            // this.hasMany(models.Doctors, {
            //     foreignKey: 'user_id',
            //     as: 'consultation_doctor',
            //     onDelete: 'RESTRICT',
            // });
        }
    };
    Consultations.init({
        // consult_id, consult_type, consult_date, cosult_time, consult_doctype, pat_remarks
        // doc_diagnosis, doc_recoms, created_by, updated_by, doc_user_id, pat_user_id

        consult_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "Consultation ID"
        },

        consult_type: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                allowNull: { msg: '[consultations].[consult_type] cannot be null!' },
                isIn: {
                    args: [
                        ['Online', 'In Person']
                    ],
                    msg: '[consultations].[consult_type] must be either `Online`, or `In Person`!'
                },
            },
            defaultValue: 'Consultant',
            comment: 'Consultation Type'
        },

        consult_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                allowNull: { msg: '[consultations].[consult_date] cannot be null!' },
                isDate: { msg: '[consultations].[consult_date] must be a valid date!' },
            },
            comment: 'Consultation Date'
        },

        consult_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                allowNull: { msg: '[consultations].[consult_time] cannot be null!' },
                isTime: { msg: '[consultations].[consult_time] must be a valid time!' },
            },
            comment: 'Consultation Time'
        },

        consult_doctype: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                allowNull: { msg: '[consultations].[consult_doctype] cannot be null!' },
                isIn: {
                    args: [
                        ['Consultant', 'Referral']
                    ],
                    msg: '[consultations].[consult_doctype] must be either `Consultant`, or `Referral`!'
                },
            },
            defaultValue: 'Consultant',
            comment: 'Consultation Type'
        },

        pat_remarks: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 255],
                    msg: '[consultations].[pat_remarks] must be less than 255 characters!'
                },
            },
            comment: 'Patient Remarks'
        },

        doc_diagnosis: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 255],
                    msg: '[consultations].[doc_diagnosis] must be less than 255 characters!'
                },
            },
            comment: 'Doctor Diagnosis'
        },

        doc_recoms: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 255],
                    msg: '[consultations].[doc_recoms] must be less than 255 characters!'
                },
                comment: 'Doctor Recommendations'
            },
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[consultations].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Consultations created by Patient'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[consultations].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Consultations updated by Patient'
        },

    }, {
        sequelize,
        modelName: 'Consultations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Consultations;
};