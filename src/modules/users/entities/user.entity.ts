import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import { UserStatus } from '@common/enums/user.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column({ nullable: true, length: 13 })
  phone: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @OneToMany(() => ShortLink, (shortLink) => shortLink.user)
  shortLinks: ShortLink[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
