'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Patient

            // % M:1 (belongsTo) [payment].[created_by] -> [users].[user_id]
            // % Many payments can be added by admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'payment_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [payment].[updated_by] -> [users].[user_id]
            // % Many payment data can be updated by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'payment_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            //% 1:M (belongsTo) [patient].[user_id] -> [payments].[pay_id]
            //% One patient can have many payments
            // this.hasMany(models.Patients, {
            //     foreignKey: 'user_id',
            //     as: 'patient',
            //     onDelete: 'RESTRICT',
            // });

            // % 1:M (belongsTo) [patient].[patient_id] -> [payments].[pay_id]
            // % One patient can update many payments
            // this.hasMany(models.Patients, {
            //     foreignKey: 'patient_id',
            //     as: 'patient',
            //     onDelete: 'RESTRICT',
            // });

            // % 1:1 (belongsTo) [consultations].[consult_id] -> [payments].[pay_id]
            // % One consultation can have only one payment
            this.belongsTo(models.Consultations, {
                foreignKey: 'consult_id',
                as: 'consultation',
                onDelete: 'RESTRICT',
            });

            // 1:M (belongsTo) [payments].[pay_id] -> [paymentsdet].[detail_id]
            // One payment can have many payment details
            // this.hasMany(models.PaymentsDet, {
            //     foreignKey: 'pay_id',
            //     as: 'payment_details',
            //     onDelete: 'RESTRICT',
            // });

        }
    }
    Payments.init({
        //pay_id, pay_datetime, pay_amount, pay_status, created_by, updated_by, consult_id

        pay_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            comment: 'Payment ID'
        },

        pay_datetime: {
            // datatype is datetime
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Payment Date and Time'
        },

        pay_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Payment Amount, total of all payment details'
        },

        pay_status: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                allowNull: { msg: '[payments].[pay_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Pending', 'Paid', 'Cancelled']
                    ],
                    msg: '[payments].[pay_status] must be either `Pending`, `Paid`, or `Cancelled`!'
                },
            },
            defaultValue: 'Pending',
            comment: 'Patient payment status. Example values are: Pending, Paid, Cancelled...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[payments].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Payments, created by Admin'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[payments].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Payments, updated by Admin'
        },

        consult_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[payments].[consult_id] cannot be null!' },
            },
            comment: 'This column is for Payments to be linked to Consultations.'
        },

    }, {
        sequelize,
        modelName: 'Payments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Payments;
};