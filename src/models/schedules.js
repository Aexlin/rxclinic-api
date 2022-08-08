// JavaScript source code
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedules extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            //* Created, Updated by Admin

            // % M:1 (belongsTo) [schedules].[user_id] -> [doctors].[user_id]
            // % One doctor can have many schedules
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'doctor',
                onDelete: 'RESTRICT',
            });

            // % M:1 (belongsTo) [schedules].[sched_id] -> [doctors].[user_id]
            // % One doctor/admin can create many schedules
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'schedule_created_by_doctor',
                onDelete: 'RESTR2ICT',
            });

            // % M:1 (belongsTo) [schedules].[sched_id] -> [users].[user_id]
            // % One doctor/admin can update many schedules
            this.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'schedule_updated_by_doctor',
                onDelete: 'RESTRICT',
            });
        }
    }
    Schedules.init({
        //sched_id, user_id, day_available, time_available, sched_status, created_by, updated_by
        sched_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: 'This is the user_id of the doctor',
        },

        day_available: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'This is the day of the week that the doctor is available',
        },

        time_available: {
            type: DataTypes.TIME,
            allowNull: false,
            comment: 'This is the time that the doctor is available',
        },

        sched_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: '[schedules].[sched_status] cannot be null!' },
                isIn: {
                    args: [
                        ['Active', 'Inactive']
                    ],
                    msg: '[schedules].[sched_status] must be either `Active` or `Inactive`!'
                },
            },
            defaultValue: 'Active',
            comment: 'Schedule status. Example values are: Active, Inactive...'
        },

        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: { args: 4, msg: '[schedules].[created_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Admin/Doctor who created the schedule.'
        },

        updated_by: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: { args: 4, msg: '[schedules].[updated_by] value must be a UUIDV4 type' },
            },
            comment: 'This column is for Admin/Doctor who updated the schedule.'
        }


    }, {
        sequelize,
        modelName: 'Specializations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Schedules;
};