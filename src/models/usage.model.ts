import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/db.config';

interface UsageAttributes {
  id: number;
  appliedFilter?: string;
  appliedOrder?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UsageCreationAttributes extends Omit<UsageAttributes, 'id' | 'createdAt'> {}

class UsageItem extends Model<UsageAttributes, UsageCreationAttributes> implements UsageAttributes {
  public id!: number;
  public appliedFilter?: string;
  public appliedOrder?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        appliedFilter: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        appliedOrder: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'usage_data',
        sequelize,
      }
    );
  }
}

UsageItem.initialize(sequelize);

export default UsageItem;