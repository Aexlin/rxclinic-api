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

            // % M:1 (belongsTo) [consultattachments].[created_by] -> [users].[user_id]
            // % Many consultattachments data can be created by an admin / doctor
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'consultattachment_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [consultattachments].[updated_by] -> [users].[user_id]
            // % Many consultattachments data can be updated by an admin / doctor
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'consultattachment_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [consultattachments].[attach_id] -> [consultations].[consult_id]
            // % Many consultattachments data can be created by a single consultation
            this.belongsTo(models.Consultations, {
                foreignKey: 'attach_id',
                as: 'consultattachment_consultation',
                onDelete: 'RESTRICT',
            });

        }
    }
    ConsultAttachments.init({
        // attach_id, consult_id, attach_type, attach_file, attach_status, created_by, updated_by
        attach_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
            comment: 'This column is for Consultations updated by Admin / Doctor'
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