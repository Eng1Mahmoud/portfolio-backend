// src/services/cloudinaryService.ts
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

// Log environment variables for debugging
console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? 'PRESENT' : 'MISSING',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'PRESENT' : 'MISSING'
});

// Explicitly configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (
    file: string, 
    options?: { 
        folder?: string 
    }
): Promise<UploadApiResponse | null> => {
    try {
        // Validate Cloudinary configuration
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            throw new Error('Cloudinary cloud_name is missing');
        }
        if (!process.env.CLOUDINARY_API_KEY) {
            throw new Error('Cloudinary api_key is missing');
        }
        if (!process.env.CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary api_secret is missing');
        }

        console.log('Uploading to Cloudinary with folder:', options?.folder);

        const result = await cloudinary.uploader.upload(file, {
            folder: options?.folder || 'default'
        });
        return result;
    } catch (error) {
        console.error('Detailed Cloudinary Upload Error:', error);
        return null;
    }
};

export const getOptimizedUrl = (
    publicId: string, 
    options?: { 
        width?: number, 
        height?: number, 
        crop?: string 
    }
): string => {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
        width: options?.width,
        height: options?.height,
        crop: options?.crop || 'scale'
    });
};