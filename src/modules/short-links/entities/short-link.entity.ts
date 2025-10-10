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

  @Column({ name: 'original_url', type: 'text' })
  originalUrl: string;

  @Column({ name: 'short_code', length: 20, unique: true })
  shortCode: string;

  @Column({ name: 'click_count', default: 0 })
  clickCount: number;

  @Column({
    type: 'timestamp',
    name: 'expires_at',
    nullable: true,
  })
  expiresAt?: Date | null;

  @ManyToOne(() => User, (user) => user.shortLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ClickLog, (clickLog) => clickLog.shortLink)
  clickLogs: ClickLog[];

  @Column({ name: 'is_expired', default: false })
  isExpired: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
}
