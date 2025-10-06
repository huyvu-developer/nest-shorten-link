import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('click_logs')
export class ClickLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'clicked_at' })
  clickedAt: Date;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 30, nullable: true })
  device?: string;

  @Column({ length: 30, nullable: true })
  browser?: string;

  @Column({ length: 30, nullable: true })
  os?: string;

  @ManyToOne(() => ShortLink, (shortLink) => shortLink.clickLogs)
  @JoinColumn({ name: 'short_link_id' })
  shortLink: ShortLink;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
