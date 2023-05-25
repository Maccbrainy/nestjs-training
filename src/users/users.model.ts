import * as bcrypt from 'bcrypt';
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Tasks } from 'src/tasks/tasks.model';

@Table
export class Users extends Model {
  @Column({
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV1,
  })
  userId: typeof DataType.UUID;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  set password(value: any) {
    const salt: string = bcrypt.genSaltSync();
    const password: string = bcrypt.hashSync(value, salt);
    this.setDataValue('password', password);
  }
  @HasMany(() => Tasks)
  tasks: Tasks[];
}
