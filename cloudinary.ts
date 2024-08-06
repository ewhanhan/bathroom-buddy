import { v2 as cloudinary } from 'cloudinary'
import { isProd } from './constant/env'

cloudinary.config({
  analytics: false,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  exif: true,
  hide_sensitive: isProd,
})

export { cloudinary }
