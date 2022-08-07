'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PaymentsDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Patient

            // % M:1 (belongsTo) [payment].[created_by] -> [users].[user_id]
            // % Many payment can be added by admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'paymentid_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [payment].[updated_by] -> [users].[user_id]
            // % Many payment data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'doctor_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            // % 1:1 (belongsTo) [patient].[patient_id] -> [payments].[detail_desc]
            // % One patient can have only one detail desc
            this.hasMany(models.DetailsDesc, {
                foreignKey: 'patient_id',
                as: 'detail_desc',
                onDelete: 'CASCADE',
            });

            // % 1:1 (belongsTo) [patient].[patient_id] -> [payments].[pay_amount]
            // % One patient can have many pay amount
            this.hasMany(models.PaymentAmount, {
                foreignKey: 'patient_id',
                as: 'pay_amount',
                onDelete: 'CASCADE',
            });

            // % 1:1 (balongsTo) [patient].[patient_id] -> [payments].[detail_status]
            // % One patient can have only one details status
            this.hasMany(models.DetailsStatus, {
                foreignKey: 'patient_id',
                as: 'details_status',
                onDelete: 'CASCADE',
            });


            
        }
    }
    PaymentsDetails.init({
        DetailsDesc: DataTypes.STRING,
        PayAmount: DataTypes.STRING,
        DetailsStatus: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Payments Details',
    });
    return Payments Details;
};