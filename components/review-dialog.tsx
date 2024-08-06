'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export function ReviewDialog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paramValue = decodeURIComponent(searchParams.get('uploaded') ?? 'undefined')

  const handleCancel = () => {
    router.push('/')
  }

  if (paramValue === 'undefined') {
    return null
  }

  return (
    <AlertDialog open={Boolean(paramValue)}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Review Washroom</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide your review for the washroom. Upload an image if you have one.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-6">
          <div className="relative max-h-48 w-full pt-[50%]">
            <Image
              src={paramValue}
              alt="Washroom"
              objectFit="contain"
              fill
              className="left-0 top-0 size-full rounded-2xl object-cover"
            />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="washroomName">Comments</Label>
              <Input id="washroomName" placeholder="Name this place..." className="resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <Select defaultValue="4">
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">😍 Excellent</SelectItem>
                    <SelectItem value="4">😊 Good</SelectItem>
                    <SelectItem value="3">😐 Average</SelectItem>
                    <SelectItem value="2">😕 Poor</SelectItem>
                    <SelectItem value="1">😡 Terrible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cleanliness">Cleanliness</Label>
                <Select defaultValue="3">
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
              onClick={handleCancel}
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
