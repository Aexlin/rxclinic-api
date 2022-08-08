'use strict';
const { Model } = require('sequelize');

// Bcrypt lib for encrypting password
const bcrypt = require('bcrypt');

// Include all protected attributes
const PROTECTED_ATTRIBUTES = ['password'];

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* >> User Table: Created by / Updated By / Verified By

            // % M:1 (belongsTo) [users].[user_id] -> [users].[created_by]
            // % Admin adding other Admins
            this.belongsTo(models.User, {
                foreignKey: "created_by",
                as: "created_by_admin",
                onDelete: "RESTRICT",
            });

            // % 1:M (hasMany) [users].[updated_by] -> [users].[user_id]
            // % Admins updating other Admin
            this.hasMany(models.User, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [users].[user_id] -> [users].[updated_by]
            // % Admin updating other Admins
            this.belongsTo(models.User, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            // % 1:M (hasMany) [users].[verified_by] -> [users].[user_id]
            // % Admin verifying other Doctors
            this.hasMany(models.User, {
                foreignKey: "verified_by",
                as: "verified_by_admin",
                onDelete: "RESTRICT",
            });

            // % 1:M (hasMany) [users].[verified_by] -> [users].[user_id]
            // % Doctor verifying other Doctors
            this.hasMany(models.User, {
                foreignKey: "verified_by",
                as: "verified_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [users].[user_id] -> [users].[created_by]
            // % Patient adding self
            this.belongsTo(models.User, {
                foreignKey: "created_by",
                as: "created_by_patient",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [users].[user_id] -> [users].[updated_by]
            // % Patient updating self
            this.belongsTo(models.User, {
                foreignKey: "updated_by",
                as: "updated_by_patient",
                onDelete: "RESTRICT",
            });

            //* >> Specializations Table: Created by / Updated By 

            // % M:1 (belongsTo) [specializations].[specialty_id] -> [users].[created_by]
            // % Admin adding Specializations
            this.belongsTo(models.Specializations, {
                foreignKey: "created_by",
                as: "created_by_admin",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [specializations].[specialty_id] -> [users].[updated_by]
            // % Admin updating Specializations
            this.belongsTo(models.Specializations, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            //* >> Schedules Table: Created by / Updated By 

            // % M:1 (belongsTo) [schedules].[sched_id] -> [users].[created_by]
            // % Doctor adding Schedules
            this.belongsTo(models.Schedules, {
                foreignKey: "created_by",
                as: "created_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [schedules].[sched_id] -> [users].[updated_by]
            // % Doctor updating Schedules
            this.belongsTo(models.Schedules, {
                foreignKey: "updated_by",
                as: "updated_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [schedules].[sched_id] -> [users].[updated_by]
            // % Admin updating Schedules
            this.belongsTo(models.Schedules, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            //* >> Allergies Table: Created by / Updated By

            // % M:1 (belongsTo) [patallergies].[allergy_id] -> [users].[created_by]
            // % Patient adding Allergies
            this.belongsTo(models.PatAllergies, {
                foreignKey: "created_by",
                as: "created_by_patient",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [patallergies].[allergy_id] -> [users].[updated_by]
            // % Patient updating Allergies
            this.belongsTo(models.PatAllergies, {
                foreignKey: "updated_by",
                as: "updated_by_patient",
                onDelete: "RESTRICT",
            });

            //* >> Patient Family Medical History Table: Created by / Updated By

            // % M:1 (belongsTo) [patfammedhist].[medhist_id] -> [users].[created_by]
            // % Patient adding Family Medical History
            this.belongsTo(models.PatFamMedHist, {
                foreignKey: "created_by",
                as: "created_by_patient",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [patfammedhist].[medhist_id] -> [users].[updated_by]
            // % Patient updating Family Medical History
            this.belongsTo(models.PatFamMedHist, {
                foreignKey: "updated_by",
                as: "updated_by_patient",
                onDelete: "RESTRICT",
            });

            //* >> Consultations Table: Created by / Updated By

            // % M:1 (belongsTo) [consultations].[consult_id] -> [users].[created_by]
            // % Patient creating Consultation
            this.belongsTo(models.Consultations, {
                foreignKey: "created_by",
                as: "created_by_patient",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [consultations].[consult_id] -> [users].[updated_by]
            // % Patient updating Consultation
            this.belongsTo(models.Consultations, {
                foreignKey: "updated_by",
                as: "updated_by_patient",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [consultations].[consult_id] -> [users].[updated_by]
            // % Doctor updating Consultation
            this.belongsTo(models.Consultations, {
                foreignKey: "updated_by",
                as: "updated_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [consultations].[consult_id] -> [users].[updated_by]
            // % Admin updating Consultation
            this.belongsTo(models.Consultations, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            //* >> Consultation Attachments Table: Created by / Updated By

            // % M:1 (belongsTo) [consultattachments].[attach_id] -> [users].[created_by]
            // % Doctor adding Consultation Attachment
            this.belongsTo(models.ConsultAttachments, {
                foreignKey: "created_by",
                as: "created_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [consultattachments].[attach_id] -> [users].[created_by]
            // % Admin adding Consultation Attachment
            this.belongsTo(models.ConsultAttachments, {
                foreignKey: "created_by",
                as: "created_by_admin",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [consultattachments].[attach_id] -> [users].[updated_by]
            // % Doctor updating Consultation Attachment
            this.belongsTo(models.ConsultAttachments, {
                foreignKey: "updated_by",
                as: "updated_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [consultattachments].[attach_id] -> [users].[updated_by]
            // % Admin updating Consultation Attachment
            this.belongsTo(models.ConsultAttachments, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            //* >> Payments Table: Created by / Updated By

            // % M:1 (belongsTo) [payments].[pay_id] -> [users].[created_by]
            // % Admin adding Payment
            this.belongsTo(models.Payments, {
                foreignKey: "created_by",
                as: "created_by_admin",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [payments].[pay_id] -> [users].[updated_by]
            // % Admin updating Payment
            this.belongsTo(models.Payments, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [payments].[pay_id] -> [users].[created_by]
            // % Doctor adding Payment
            this.belongsTo(models.Payments, {
                foreignKey: "created_by",
                as: "created_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [payments].[pay_id] -> [users].[updated_by]
            // % Doctor updating Payment
            this.belongsTo(models.Payments, {
                foreignKey: "updated_by",
                as: "updated_by_doctor",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [payments].[pay_id] -> [users].[updated_by]
            // % Patient updating Payment
            this.belongsTo(models.Payments, {
                foreignKey: "updated_by",
                as: "updated_by_patient",
                onDelete: "RESTRICT",
            });

            //* >> Payment Details Table: Created by / Updated By

            // % M:1 (belongsTo) [paymentdetails].[detail_id] -> [users].[created_by]
            // % Admin adding Payment Detail
            this.belongsTo(models.PaymentsDet, {
                foreignKey: "created_by",
                as: "created_by_admin",
                onDelete: "RESTRICT",
            });

            // % M:1 (belongsTo) [paymentdetails].[detail_id] -> [users].[updated_by]
            // % Admin updating Payment Detail
            this.belongsTo(models.PaymentsDet, {
                foreignKey: "updated_by",
                as: "updated_by_admin",
                onDelete: "RESTRICT",
            });

            //* Patients Table: Foreign Keys

            // % M:1 (belongsTo) [patients].[user_id] -> [users].[user_id]
            // % User is Patient
            this.belongsTo(models.Patients, {
                foreignKey: "user_id",
                as: "user_patient",
                onDelete: "RESTRICT",
            });

            //* Doctors Table: Foreign Keys

            // % M:1 (belongsTo) [doctors].[user_id] -> [users].[user_id]
            // % User is Doctor
            this.belongsTo(models.Doctors, {
                foreignKey: "user_id",
                as: "user_doctor",
                onDelete: "RESTRICT",
            });

        }

        toJSON() {
            const attributes = {...this.get() }
            for (const x of PROTECTED_ATTRIBUTES) {
                delete attributes[x];
            }
            return attributes;
        }
    }
    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { args: true, msg: '[users].[email] must be unique!' },
                notNull: { msg: '[users].[email] cannot be null!' },
                notEmpty: { msg: '[users].[email] cannot be blank or empty!' }
            },
            comment: 'User Email Address'
        },

        pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[password] cannot be null!' },
                notEmpty: { msg: '[users].[password] cannot be blank or empty!' }
            },
            comment: 'User Password'
        },

        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'UUID for the User table.'
        },

        fname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[fname] cannot be null!' },
                notEmpty: { msg: '[users].[fname] cannot be blank or empty!' }
            },
            comment: 'User\'s first name.'
        },

        mname: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'User\'s middle name.'
        },

        lname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[lname] cannot be null' },
                notEmpty: { msg: '[users].[lname] cannot be blank or empty' }
            },
            comment: 'User\'s last name.'
        },

        fullname: {
            type: DataTypes.STRING,
            set(value) {
                if (this.middle_name === undefined) {
                    this.setDataValue('fullname', `${this.fname} ${this.lname}`);
                } else {
                    this.setDataValue(
                        "fullname",
                        `${this.fname} ${this.mname.charAt(0).toUpperCase()}. ${this.lname}`
                    );
                }
            }
        },

        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: { args: true, msg: '[users].[email_address] must be unique!' },
                notNull: { msg: '[users].[email_address] cannot be null!' },
                notEmpty: { msg: '[users].[email_address] cannot be blank or empty!' }
            },
            unique: { msg: 'Email must be unique. ' },
            comment: 'User\'s email address.'
        },

        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[dob] cannot be null!' },
                notEmpty: { msg: '[users].[dob] cannot be blank or empty!' }
            },
            comment: 'User\'s date of birth.'
        },

        cellnum: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[contact_number] cannot be null' },
                notEmpty: { msg: '[users].[contact_number] cannot be blank or empty' },

            },
            comment: 'This contains the contact number of the user.'
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[address] cannot be null' },
                notEmpty: { msg: '[users].[address] cannot be blank or empty' }
            },
            comment: 'This contains the address of the user.'
        },

        photo: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'This contains the profile picture of the user.',
            get() {
                const rawValue = this.getDataValue('profile_pic');
                return rawValue ? "http://localhost:3600/public/" + rawValue : null;
            }
        },

        user_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[status] cannot be null' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[users].[status] value must be `Active` or `Inactive` only'
                }
            },
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors, Patients, & Admin, that determines who created the user.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Doctors, Patients, & Admin, that determines who updated the user.'

        },

        verified_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin and Doctors, that determines who verified the Doctor in the API.'
        }

    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // tableName: 'users', -> to change table name.

        hooks: {
            beforeCreate: (user) => {
                // Encrypt user's password before getting sent to the database. 
                user.password = bcrypt.hashSync(user.password, 10);
            },

            afterCreate: () => {
                if (process.env.ENABLE_MODEL_LOG === 'true') {
                    console.log('A new record has been added to table [users]');
                }
            }
        }
    });
    return User;
};