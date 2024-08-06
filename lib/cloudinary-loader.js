// eslint-disable-next-line import/no-default-export
export default function CloudinaryLoader({ quality, src, width }) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${src}`
}
