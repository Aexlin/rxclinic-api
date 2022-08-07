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

            //% 1:M (belongsTo) [patient].[patient_id] -> [payments].[payment_id]
            //% One patient can have many payments
            this.belongsTo(models.PatientPayments, {
                foreignKey: 'payment_id',
                as: 'patient_payments',
                onDelete: 'RESTRICT',
            });

            // % 1:1 (belongsTo) [patient].[patient_id] -> [payments].[paymentdatetime]
            // % One patient can have only one payment date time
            this.hasMany(models.PaymentDateTime, {
                foreignKey: 'patient_id',
                as: 'payment_datetime',
                onDelete: 'CASCADE',
            });

            // % 1:1 (belongsTo) [patient].[patient_id] -> [payments].[payment_amount]
            // % One patient can have many payment amount
            this.hasMany(models.PaymentAmount, {
                foreignKey: 'patient_id',
                as: 'payment_amount',
                onDelete: 'CASCADE',
            });

            // % 1:1 (balongsTo) [patient].[patient_id] -> [payments].[payment_status]
            // % One patient can have only one payment status
            this.hasMany(models.PaymentStatus, {
                foreignKey: 'patient_id',
                as: 'payment_status',
                onDelete: 'CASCADE',
            });


            
        }
    }
    Payments.init({
        PaymentDateTime: DataTypes.STRING,
        PaymentAmount: DataTypes.STRING,
        PaymentStatus: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Payments',
    });
    return Payments;
};