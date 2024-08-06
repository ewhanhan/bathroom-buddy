'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { logger } from '@/lib/logger'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

export function ReviewDialog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const uploadedParam = params.get('uploaded')
  const imageIds = uploadedParam ? uploadedParam.split(',') : []

  logger(imageIds, 'Public IDs Array')

  const handleCancel = useCallback(() => {
    router.push('/')
  }, [router])

  const validId = imageIds?.[0]

  if (
    uploadedParam === null
    || validId === 'undefined'
    || !imageIds.length
  ) {
    return null
  }

  return (
    <AlertDialog open={Boolean(validId)}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Review Washroom</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide your review for the washroom. Upload an image if you have one.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-6">
          <div className="flex w-full justify-center">
            <Carousel className="w-full max-w-sm">
              <CarouselContent className="ml-1">
                {imageIds.map(id => (
                  <CarouselItem key={id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={id}
                            alt="Uploaded image"
                            fill
                            className="rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
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
