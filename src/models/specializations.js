// JavaScript source code
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specializations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin

            // % M:1 (belongsTo) [speecializations].[created_by] -> [user].[user_id]
            // % Many specializations can be added by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'specialization_created_by_admin',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [speecializations].[updated_by] -> [user].[user_id]
            // % Many specializations can be updated by a single admin
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'specialization_updated_by_admin',
                onDelete: 'RESTRICT',
            });

            // % 1:M (belongsTo) [specializations].[specialization_id] -> [doctors].[specialization_id]
            // % One specialization can have many doctors
            // this.hasMany(models.Doctors, {
            //     foreignKey: 'specialization_id',
            //     as: 'doctors',
            //     onDelete: 'RESTRICT',
            // });
        }
    }
    Specializations.init({
        //specialty_id, specialty_name, specialty_desc, specialty_status, created_by, updated_by

        specialty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        specialty_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        specialty_desc: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        specialty_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[specializations].[specialty_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[specializations].[specialty_status] must be either `Active` or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Specialization status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[specializations].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Admin who created the specialization.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[specializations].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Admin who updated the specialization.'
        }


    }, {
        sequelize,
        modelName: 'Specializations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Specializations;
};