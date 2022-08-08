'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PaymentsDet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin

            // % M:1 (belongsTo) [paymentsdet].[created_by] -> [users].[user_id]
            // % Many payment details can be created by admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'payment_details_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [paymentsdet].[updated_by] -> [users].[user_id]
            // % Many payment details can be updated by admin
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'payment_details_updated_by_admin',
                onDelete: 'RESTRICT',
            });

        }
    }
    PaymentsDet.init({
        // detail_id, pay_id, detail_desc, detail_amount, detail_status, created_by, updated_by

        detail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        pay_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'payments',
                key: 'pay_id'
            }
        },

        detail_desc: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Payment Details Description"
        },

        pay_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Payment Amount'
        },

        detail_status: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                allowNull: { msg: '[paymentsdet].[detail_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[paymentsdet].[detail_status] must be either `Active`, or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Patient payment detail status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[paymentsdet].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Payment Details, created by Admin'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[paymentsdet].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Payment Details, updated by Admin'
        },

    }, {
        sequelize,
        modelName: 'PaymentsDet',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return PaymentsDet;
};