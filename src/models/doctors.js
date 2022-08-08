'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctors extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Doctor

            // % M:1 (belongsTo) [doctors].[created_by] -> [users].[user_id]
            // % Many doctors data can be added by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_doctor',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [doctors].[updated_by] -> [users].[user_id]
            // % Many doctors data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_doctor',
                onDelete: 'RESTRICT',
            });

            //% 1:1 (belongsTo) [doctors].[user_id] -> [specializations].[specialty_id]
            //% One doctor can have only one specialty.
            this.belongsTo(models.Specializations, {
                foreignKey: 'specialty_id',
                as: 'specialization',
                onDelete: 'RESTRICT',
            });

            //% 1:M (hasMany) [doctors].[user_id] -> [schedules].[sched_id]
            //% One doctor can have many schedules.
            this.hasMany(models.Schedules, {
                foreignKey: 'user_id',
                as: 'schedules',
                onDelete: 'RESTRICT',
            });

            // % M:M (belongsTo) [doctors].[user_id] -> [consultations].[doc_user_id]
            // % Many patients can have many consultations
            this.belongsToMany(models.Consultations, {
                as: 'consultations',
                foreignKey: 'doc_user_id',
                onDelete: 'RESTRICT',
            });

            // % M:M (belongsTo) [doctors].[user_id] -> [consultationattachments].[created_by]
            // % Many doctors can have many consultation attachments
            this.belongsToMany(models.ConsultationAttachments, {
                as: 'consultattachments',
                foreignKey: 'created_by',
                onDelete: 'RESTRICT',
            });

            // % M:M (belongsTo) [doctors].[user_id] -> [consultationattachments].[updated_by]
            // % Many doctors can udpate many consultation attachments
            this.belongsToMany(models.ConsultationAttachments, {
                as: 'consultattachments',
                foreignKey: 'updated_by',
                onDelete: 'RESTRICT',
            });
        }
    }
    Doctors.init({
        // user_id, specialty_id, specialty_cert, prcnumber, prcimg, ptrnumber, philhealthidnum, philhealthidimg
        // resumecv, nbicleardate, nbiclearfile, membershipdate, membershipcert
        // vat_status, tinnum, certofregbir, receiptdeclaration, created_by, updated_by
        // verification_status, verified_by

        user_id: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors, Patients, & Admin, that determines user id.'
        },

        specialty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { args: true, msg: '[doctors].[specialty_id] value must be an integer' },
            },
            comment: 'This column is for Doctors, that determines specialty id.'
        },

        specialty_cert: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Specialty Certificate of the doctor',
            get() {
                const rawValue = this.getDataValue('specialty_cert');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        prcnumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'PRC Number of the doctor'
        },

        prcimg: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'PRC Image of the doctor',
            get() {
                const rawValue = this.getDataValue('prcimg');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        ptrnumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'PTR Number of the doctor'
        },

        philhealthidnum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Philhealth ID Number of the doctor'
        },

        philhealthidimg: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Philhealth ID Image of the doctor',
            get() {
                const rawValue = this.getDataValue('philhealthidimg');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        resumecv: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Resume/CV of the doctor',
            get() {
                const rawValue = this.getDataValue('resumecv');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        nbicleardate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: 'NBI Clearance Date of the doctor'
        },

        nbiclearfile: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'NBI Clearance File of the doctor',
            get() {
                const rawValue = this.getDataValue('nbiclearfile');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        membershipdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: 'Membership Date of the doctor'
        },

        membershipcert: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Membership Certificate of the doctor',
            get() {
                const rawValue = this.getDataValue('membershipcert');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        vat_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[doctors].[vat_status] cannot be null!' },
                isIn: {
                    args: [
                        ['VAT', 'NON-VAT']
                    ],
                    msg: '[doctors].[vat_status] must be either `Active` or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Patient status. Example values are: Active, Inactive...'
        },

        tinnum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'TIN Number of the doctor'
        },

        certofregbir: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Certificate of BIR Registration of the doctor',
            get() {
                const rawValue = this.getDataValue('certofregbir');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        receiptdeclaration: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Receipt of Declaration of the doctor',
            get() {
                const rawValue = this.getDataValue('receiptdeclaration');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[doctors].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors that determines who created the record.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[doctors].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors that determines who updated the record.'
        },

        verification_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[doctors].[verification_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Verified', 'Unverified', 'Declined']
                    ],
                    msg: '[doctors].[verification_status] must be either `Verified`, `Unverified` or `Declined`!'
                },
            },
            defaultValue: 'Unverified',
            comment: 'Doctor verification status. Example values are: Verified, Unverified, Declined...'
        },

        verified_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[doctors].[verified_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors that determines who verified the record.'
        },

    }, {
        sequelize,
        modelName: 'Patients',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        verifiedAt: 'verified_at',
        // tableName: 'users', -> to change table name.
    });
    return Doctors;
};