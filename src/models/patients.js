// JavaScript source code
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patients extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Patient

            // % M:1 (belongsTo) [patient].[created_by] -> [users].[user_id]
            // % Many Patient data can be added by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'patient_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % 1:M (belongsTo) [patient].[updated_by] -> [users].[user_id]
            // % Many patient data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'patient_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            //% 1:1 (belongsTo) [patient].[patient_id] -> [medical details].[allergy_id]
            //% One patient can have only one medical details.
            this.belongsTo(models.medicaldetails, {
                foreignKey: 'user id',
                as: 'medical details',
                onDelete: 'RESTRICT',
            });

            // % M:M (hasMany) [patient].[patient_id] -> [condition].[allergy_id]
            // % Many patient can have many condition
            this.hasMany(models.patientconditionstatus, {
                foreignKey: 'user_id',
                as: 'allergies',
                onDelete: 'CASCADE',
            });

            //% 1:1 (belongsto) [patient].[patient_id] -> [medical details].[patient_id]
            //% One patient can have one medical details.
            this.hasMany(models.patientconditionstatus, {
                foreignKey: 'user_id',
                as: 'patient_medical details',
                onDelete: 'CASCADE',
            });


        }
    }
    patients.init({
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Patients',
    });
    return Patients;
};