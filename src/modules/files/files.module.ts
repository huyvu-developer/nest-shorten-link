import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryProvider } from '@config/cloudinary.provider';

@Module({
  providers: [FilesService, CloudinaryProvider],
  exports: [FilesService],
})
export class FilesModule {}
