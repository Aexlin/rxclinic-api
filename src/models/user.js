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

            //* User Table: Created by / Updated By / Verified By

            // % ONLY Admin can add another admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'admin_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % Admin can update own data
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'admin_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            // % 1:M (hasMany) [users].[verified_by] -> [users].[user_id]
            // % Admin/Doctors verifying Doctors
            this.hasMany(models.User, {
                foreignKey: 'verified_by',
                as: 'verified_by_admins',
                onDelete: 'RESTRICT',
            });

            // >> Consultations Table: Created By / Updated By

            // % 1:M (hasMany) [consultations].[created_by] -> [users].[user_id]
            // % User type Patient creating Consultation
            this.hasMany(models.Consultation, {
                foreignKey: 'created_by',
                as: 'created_by_patients',
                onDelete: 'RESTRICT',
            });

            // %1:M (hasMany) [consultations].[updated_by] -> [users].[user_id]
            // % User type Patient updating Consultation
            this.hasMany(models.Consultation, {
                foreignKey: 'updated_by',
                as: 'updated_by_doctor',
                onDelete: 'RESTRICT',
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
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'UUID for the User table.'
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[first_name] cannot be null!' },
                notEmpty: { msg: '[users].[first_name] cannot be blank or empty!' }
            },
            comment: 'User\'s first name.'
        },

        middle_name: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'User\'s middle name.'
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[last_name] cannot be null' },
                notEmpty: { msg: '[users].[last_name] cannot be blank or empty' }
            },
            comment: 'User\'s last name.'
        },

        full_name: {
            type: DataTypes.STRING,
            set(value) {
                if (this.middle_name === undefined) {
                    this.setDataValue('full_name', `${this.first_name} ${this.last_name}`);
                } else {
                    this.setDataValue(
                        "full_name",
                        `${this.first_name} ${this.middle_name.charAt(0).toUpperCase()}. ${this.last_name}`
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

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[password] cannot be null' },
                notEmpty: { msg: '[users].[password] cannot be blank or empty' },
            },
            comment: 'This contains the encrypted password for authorization'
        },

        user_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[user_type] cannot be null' },
                isIn: {
                    args: [
                        ['Admin', 'Librarian', 'Resident']
                    ],
                    msg: '[users].[user_type] value must be `Admin`, `Librarian` or `Resident` only'
                }
            },
            comment: 'This contains the identification of a user.'
        },

        contact_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[users].[contact_number] cannot be null' },
                notEmpty: { msg: '[users].[contact_number] cannot be blank or empty' },

            },
            comment: 'This contains the contact number of the user.'
        },

        profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'This contains the profile picture of the user.',
            get() {
                const rawValue = this.getDataValue('profile_pic');
                return rawValue ? "http://localhost:3600/public/" + rawValue : null;
            }
        },

        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            comment: 'This indicates if the account of a user is verified or not'
        },

        barangay_card: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'This contains the barangay card of the user.'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin and Librarian, that determines who created the user.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin and Librarian, that determines who updated the user.'

        },

        verified_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[users].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is specifically for Admin and Librarian, that determines who verified the Civilian in the API.'
        },

        status: {
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