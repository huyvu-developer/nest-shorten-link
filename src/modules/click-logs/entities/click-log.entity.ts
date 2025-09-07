import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('click_logs')
export class ClickLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'clicked_at' })
  clickedAt: Date;

  @Column({ name: 'ip_address', length: 45 })
  ipAddress: string;

  @Column({ name: 'user_agent', type: 'text' })
  userAgent: string;

  @Column({ length: 100 })
  country: string;

  @ManyToOne(() => ShortLink, (shortLink) => shortLink.clickLogs)
  @JoinColumn({ name: 'short_link_id' })
  shortLink: ShortLink;
}
