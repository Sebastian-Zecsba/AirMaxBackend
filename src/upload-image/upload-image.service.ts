import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image-response';
const streamifier = require('streamifier');

@Injectable()
export class UploadImageService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [
            {
              width: 1000, 
              crop: 'limit',
              quality: 'auto',
              fetch_format: 'auto'
            }
          ]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            transformation: [
              {
                width: 1000,
                crop: 'limit',
                quality: 'auto',
                fetch_format: 'auto',
              },
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });
    return Promise.all(uploadPromises);
  }
}


