'use client'

import { CldImage as CldImageDefault, type CldImageProps } from 'next-cloudinary'

export function CldImage(props: CldImageProps) {
  return <CldImageDefault {...props} />
}
