import { CldUploadButton } from 'next-cloudinary'
import { RiCamera2Fill } from 'react-icons/ri'
import { logger } from '@/lib/logger'

export function ControlPanel() {
  return (
    <div className="mb-5 mr-2 flex">
      <CldUploadButton
        uploadPreset="bathroom-buddy"
        signatureEndpoint="/api/upload/image"
        options={{
          maxFiles: 5,
          multiple: true,
          showPoweredBy: false,
          sources: ['local', 'camera'],
        }}
        onSuccess={(response) => {
          logger(response, 'Upload successful')
        }}
      >
        <RiCamera2Fill size={50} />
      </CldUploadButton>
    </div>
  )
}
