import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File too large');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'shortenLink',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
          public_id: `img_${Date.now()}`,
        },
        (error, result) => {
          if (error) {
            reject(new BadRequestException('Upload failed'));
          } else {
            resolve(result);
          }
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
