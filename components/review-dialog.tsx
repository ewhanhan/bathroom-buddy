import Image from 'next/image'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ReviewDialog({
  imageUrl,
}: {
  imageUrl: string
}) {
  return (
    <AlertDialog open={Boolean(imageUrl)}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Review Washroom</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide your review for the washroom. Upload an image if you have one.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt="Washroom"
              fill
              className="object-cover"
              style={{ aspectRatio: '600/400', objectFit: 'cover' }}
            />
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <Select defaultValue="4">
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 stars</SelectItem>
                    <SelectItem value="4">4 stars</SelectItem>
                    <SelectItem value="3">3 stars</SelectItem>
                    <SelectItem value="2">2 stars</SelectItem>
                    <SelectItem value="1">1 star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cleanliness">Cleanliness</Label>
                <Select defaultValue="4">
                  <SelectTrigger id="cleanliness">
                    <SelectValue placeholder="Select cleanliness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Excellent</SelectItem>
                    <SelectItem value="4">Good</SelectItem>
                    <SelectItem value="3">Average</SelectItem>
                    <SelectItem value="2">Poor</SelectItem>
                    <SelectItem value="1">Very Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea id="comments" placeholder="Share your thoughts..." className="resize-none" />
            </div>
          </div>
        </div>
        <AlertDialogFooter className="mt-6 flex justify-end gap-2">
          <AlertDialogCancel asChild>
            <Button
              variant="ghost"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit">Submit Review</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
