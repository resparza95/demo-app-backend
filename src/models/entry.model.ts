import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/db.config';

interface EntryAttributes {
  id: number;
  position?: number | null;
  title: string;
  points?: number | null;
  commentCount?: number | null;
  createdAt?: Date;
}

interface EntryCreationAttributes extends Omit<EntryAttributes, 'id' | 'createdAt'> {}

class Entry extends Model<EntryAttributes, EntryCreationAttributes> implements EntryAttributes {
  public id!: number;
  public position?: number;
  public title!: string;
  public points?: number;
  public commentCount?: number;
  public createdAt?: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        position: {
          type: DataTypes.INTEGER,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
        },
        commentCount: {
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'entries',
        sequelize,
      }
    );
  }
}

Entry.initialize(sequelize);

export default Entry;