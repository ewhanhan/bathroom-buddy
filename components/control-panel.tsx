import { CldUploadWidget } from 'next-cloudinary'
import { RiCamera2Fill } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { logger } from '@/lib/logger'
import { Button } from '@/components/ui/button'

export function ControlPanel() {
  const router = useRouter()

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
        onQueuesEnd={(response: any, { widget }) => {
          logger(response.info.files, 'All uploads completed')

          // add a query parameter to the URL to trigger a revalidation
          router.push(`?uploaded=${encodeURIComponent(response.data.info.files[0].uploadInfo.public_id ?? response.info.files[0].uploadInfo.public_id)}`)

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
