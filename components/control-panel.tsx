import { CldUploadWidget } from 'next-cloudinary'
import { Camera } from '@phosphor-icons/react/Camera'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function ControlPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()

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
          const params = new URLSearchParams(searchParams.toString())

          const publicIds = response.data.info.files
            .map((file: { uploadInfo: { public_id: string } }) => file.uploadInfo.public_id)
            .filter((publicId: string) => publicId) // Filter out any undefined or null values

          if (publicIds.length > 0) {
            params.set('uploaded', publicIds.join(','))
          }

          router.push(`?${params.toString()}`)

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
              <Camera size={64} />
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
