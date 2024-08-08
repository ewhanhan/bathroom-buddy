// eslint-disable-next-line import/no-default-export
export default function CloudinaryLoader({ options = {}, quality, src, width }: {
  options?: Record<string, string>
  quality?: string
  src: string
  width: number
}) {
  const defaultParams = {
    c: 'limit',
    f: 'auto',
    q: quality || 'auto',
    w: width,
  }

  // Merge default parameters with additional options
  const params = { ...defaultParams, ...options }

  // Convert parameters object to Cloudinary URL format
  const paramsArray = Object.entries(params).map(([key, value]) => `${key}_${value}`)

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${paramsArray.join(',')}/${src}`
}
