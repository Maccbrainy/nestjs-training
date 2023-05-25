import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/users/users.model';

@Table
export class Tasks extends Model {
  @Column({
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  taskId: typeof DataType.UUID;

  @Column
  title: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  done: boolean;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
  })
  userId: typeof DataType.UUID;

  @BelongsTo(() => Users)
  users: Users;
}
