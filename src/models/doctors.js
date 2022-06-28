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
                as: 'doctor_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [doctors].[updated_by] -> [users].[user_id]
            // % Many doctors data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'doctor_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            //% 1:1 (belongsTo) [doctors].[doctor_id] -> [docspecializations].[specialty_id]
            //% One doctor can have only one specialty.
            this.belongsTo(models.DocSpecializations, {
                foreignKey: 'specialization_id',
                as: 'doctor_specialization',
                onDelete: 'RESTRICT',
            });

            // % M:M (hasMany) [doctors].[doctor_id] -> [docsubspecializations].[doctor_id]
            // % Many doctors can have many subspecializations
            this.hasMany(models.DocSubSpecializations, {
                foreignKey: 'doctor_id',
                as: 'doctor_subspecializations',
                onDelete: 'CASCADE',
            });

            //% 1:M (hasMany) [doctors].[doctor_id] -> [docschedules].[doctor_id]
            //% One doctor can have many schedules.
            this.hasMany(models.DocScheds, {
                foreignKey: 'doctor_id',
                as: 'doctor_schedules',
                onDelete: 'CASCADE',
            });

            //% 1:M (hasMany) [doctors].[doctor_id] -> [consultations].[doctor_id]
            //% One doctor can have many consultations.
            this.hasMany(models.Consultations, {
                foreignKey: 'doctor_id',
                as: 'doctor_consultations',
                onDelete: 'CASCADE',
            });
        }
    }
    Doctors.init({
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Doctors',
    });
    return Doctors;
};