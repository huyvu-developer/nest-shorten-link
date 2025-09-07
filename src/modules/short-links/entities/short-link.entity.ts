import { ClickLog } from '@modules/click-logs/entities/click-log.entity';
import { User } from '@modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('short_links')
export class ShortLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'short_url', length: 50, unique: true })
  shortUrl: string;

  @Column({ name: 'original_url', type: 'text' })
  originalUrl: string;

  @Column({ name: 'click_count', default: 0 })
  clickCount: number;

  @Column({
    type: 'timestamp',
    name: 'expires_at',
    nullable: true,
  })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.shortLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ClickLog, (clickLog) => clickLog.shortLink)
  clickLogs: ClickLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
