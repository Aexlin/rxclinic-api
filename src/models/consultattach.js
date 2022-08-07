'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ConsultationsAttachment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Patient

            // % M:1 (belongsTo) [attach_id].[created_by] -> [patient].[patient_id]
            // % Many consultation attachment can be added by a single patient
            this.belongsTo(models.Patient, {
                foreignKey: 'created_by',
                as: 'Consultation_Attachment_created_by_patient',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [attach_id].[updated_by] -> [patient].[patient_id]
            // % Many attachment can be updated by a single patient
            this.belongsTo(models.Patient, {
                foreignKey: 'updated_by',
                as: 'Consultation_Attachment_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            //% 1:1 (belongsTo) [patient].[patient_id] -> [attach_img].[attach_id]
            //% One patient can have only one attach image
            this.belongsTo(models.AttachImage, {
                foreignKey: 'consultation_id',
                as: 'attach_image',
                onDelete: 'RESTRICT',
            });

            //% 1:1 (belongsTo) [attachment].[attach_id] -> [attachment_status].[attach_id]
            //% One Attachemnt can have only one attachment status
            this.belongsTo(models.AttachImage, {
                foreignKey: 'consultation_id',
                as: 'attach_image',
                onDelete: 'RESTRICT',
            });

           
        }
    }
    ConsultationsAttachment.init({
        AttachType: DataTypes.STRING,
        AttachFile: DataTypes.STRING,
        AttachStatus: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ConsultationsAttachment',
    });
    return ConsultationsAttachment;
};