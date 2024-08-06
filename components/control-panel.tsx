import { CldUploadWidget } from 'next-cloudinary'
import { RiCamera2Fill } from 'react-icons/ri'
import { logger } from '@/lib/logger'
import { Button } from '@/components/ui/button'

export function ControlPanel() {
  return (
    <div className="mb-5 mr-2 flex">
      <CldUploadWidget
        uploadPreset="bathroom-buddy"
        signatureEndpoint="/api/upload/image"
        options={{
          maxFiles: 5,
          multiple: true,
          showPoweredBy: false,
          sources: ['local', 'camera'],
        }}
        onQueuesEnd={(response, { widget }) => {
          logger(response, 'All uploads completed')
          widget.close()
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            open()
          }

          return (
            <Button
              variant="outline"
              size="icon"
              onClick={handleOnClick}
            >
              <RiCamera2Fill size={50} />
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
