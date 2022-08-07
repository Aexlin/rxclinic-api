// JavaScript source code
// JavaScript source code
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class allergies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Patient

            // % M:1 (belongsTo) [allergies].[created_by] -> [allergies].[allergy_id]
            // % Many allergy data can be added by a single patient
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'allergy_created_by_patient',
                onDelete: 'RESTRICT',
            });

            // % 1:M (belongsTo) [allergies].[updated_by] -> [allergies].[allergy_id]
            // % Many allergy data can be updated by a single patient
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'allergy_updated_by_patient',
                onDelete: 'RESTRICT',
            });

            // % 1:M (belongsTo) [allergies].[updated_by] -> [allergies].[allergy_id]
            //% One patient can have only one medical detail.
            this.belongsTo(models.medical_details, {
                foreignKey: 'allergy id',
                as: 'medical details',
                onDelete: 'RESTRICT',
            });

            // % 1:1 (belongsto) [allergy status].[allergy_id] -> [allergy status].[allergy_id]
            // % one patient can have many allergies
            this.hasMany(models.patient, {
                foreignKey: 'patient_id',
                as: 'allergy status',
                onDelete: 'CASCADE',
            });

            //% 1:1 (belongsto) [allergy name].[allergy_id] -> [allergy name].[allergy_id]
            //% One patient can have many allergies.
            this.hasMany(models.patientconditionstatus, {
                foreignKey: 'patient_id',
                as: 'allergy name',
                onDelete: 'CASCADE',
            });


        }
    }
    patallergies.init({
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'allergies',
    });
    return patallergies;
};