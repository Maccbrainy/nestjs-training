import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/users/users.model';

@Table
export class Tasks extends Model {
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

  @BelongsTo(() => Users)
  userId: Users;
}
