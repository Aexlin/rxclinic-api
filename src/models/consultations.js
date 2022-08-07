'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class consultations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Doctor

            // % M:1 (belongsTo) [consultations].[created_by] -> [users].[user_id]
            // % Many consultations data can be added by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'consultation_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [consultations].[updated_by] -> [users].[user_id]
            // % Many consultations data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'consultation_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            //% 1:M (hasMany) [doctor].[doctor_id] -> [consultation_type].[consultation_id]
            //% One doctor can have many consultation type.
            this.belongsTo(models.ConsultationType, {
                foreignKey: 'doctor_id',
                as: 'consultation_type',
                onDelete: 'RESTRICT',
            });

            // % 1:1 (belongsTo) [patient].[patient_id] -> [consultations].[consultation_id]
            // % One patient can have only one consultation type
            this.hasMany(models.ConsultationType, {
                foreignKey: 'patient_id',
                as: 'consultation_type',
                onDelete: 'CASCADE',
            });

            //% 1:1 (belongsTo) [patients].[patient_id] -> [consultationdate].[consultation_id]
            //% One patient can have only one consultation date.
            this.belongsTo(models.Consultations, {
                foreignKey: 'patient_id',
                as: 'consult time',
                onDelete: 'CASCADE',
            });
            
            //% 1:1 (belongsTo) [patients].[patient_id] -> [consultationtime].[consultation_id]
            //% One patient can have only one consultation time.
            this.belongsTo(models.Consultations, {
                foreignKey: 'patient_id',
                as: 'consult time',
                onDelete: 'CASCADE',
            });
        }
    }
    Consultations.init({
        ConsultationType: DataTypes.STRING,
        ConsultationDate: DataTypes.STRING,
        ConsultationTime: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Consultations',
    });
    return Consultations;
};