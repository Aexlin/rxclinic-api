'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ConsultAttachments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin / Doctor

            // % M:M (hasMany) [consultations].[consult_id] -> [consultattachments].[attach_id]
            // % Many consultations can have many attachments
            this.hasMany(models.Consultations, {
                foreignKey: 'consult_id',
                as: 'consultation_attachments',
                onDelete: 'RESTRICT',
                // onUpdate: 'CASCADE'
            });

            // % M:1 (belongsTo) [consultattachments].[created_by] -> [user].[user_id]
            // % Many consultattachments data can be created by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'consultattachment_created_by_admin',
                onDelete: 'RESTRICT',
                // onUpdate: 'CASCADE'
            });

            // % M:1 (belongsTo) [consultattachments].[updated_by] -> [user].[user_id]
            // % Many consultattachments data can be updated by a single admin/doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'consultattachment_updated_by_admin',
                onDelete: 'RESTRICT',
                // onUpdate: 'CASCADE'
            });

            // this.belongsTo(models.Consultations, {
            //     foreignKey: 'consult_id',
            //     as: 'consultattachments_consultation',
            //     onDelete: 'RESTRICT',
            //     // onUpdate: 'CASCADE'
            // });

            // % M:1 (belongsTo) [consultattachments].[created_by] -> [users].[user_id]
            // % Many consultattachments data can be created by an admin / doctor
            // this.belongsTo(models.User, {
            //     foreignKey: 'created_by',
            //     as: 'consultattachments_created_by_user',
            //     onDelete: 'RESTRICT',
            //     // onUpdate: 'CASCADE'
            // });

            // // % M:1 (belongsTo) [consultattachments].[updated_by] -> [users].[user_id]
            // // % Many consultattachments data can be updated by an admin / doctor
            // this.belongsTo(models.User, {
            //     foreignKey: 'updated_by',
            //     as: 'consultattachments_updated_by_user',
            //     onDelete: 'RESTRICT',
            //     // onUpdate: 'CASCADE'
            // });


        }
    }
    ConsultAttachments.init({
        // attach_id, consult_id, attach_type, attach_file, attach_status, created_by, updated_by
        attach_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },

        consult_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'consultations',
                key: 'consult_id',
            },
        },

        attach_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[consultattachments].[attach_type] cannot be null!' },
                isIn: {
                    args: [
                        ['Lab Results', 'Med Cert'],
                    ],
                    msg: '[consultattachments].[attach_type] must be `Lab Results`, `Med Cert`!'
                },
            },
            comment: 'Attachment Type'
        },

        attach_file: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[consultattachments].[attach_file] cannot be null!' },
            },
            comment: 'Attachment File',
            get() {
                const rawValue = this.getDataValue('attach_file');
                return rawValue ? "http://localhost:3600/public" + rawValue : null;
            }
        },

        attach_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[consultattachments].[attach_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[consultattachments].[attach_status] must be either `Active` or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Attachment Status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[consultattachments].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Consultation Attachments created by Admin / Doctor'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[consultattachments].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Consultation Attachments updated by Admin / Doctor'
        },

    }, {
        sequelize,
        modelName: 'ConsultAttachments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return ConsultAttachments;
};