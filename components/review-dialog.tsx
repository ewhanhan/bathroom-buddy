'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Session } from 'next-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import type { z } from 'zod'
import { FullPageLoadingSpinner } from '@/components/loading-spinner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CldImage } from '@/components/ui/CldImage'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import CloudinaryLoader from '@/lib/cloudinary-loader'
import { errorLogger, logger } from '@/lib/logger'
import { ReviewFormSchema } from '@/schemas/washroom-review-schema'

export function ReviewDialog({
  session,
}: {
  session: Session | null
}) {
  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
  })
  const { toast } = useToast()
  const { errors, isSubmitSuccessful, isSubmitting } = useFormState(form)
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const uploadedParam: string | null = params.get('uploaded')
  const imageIds: string[] = useMemo(() => (
    uploadedParam
      ? uploadedParam.split(',')
      : []
  ), [uploadedParam])
  const firstImageId: string | undefined = imageIds?.[0]

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).map(error => error.message).join(', ')
      toast({
        description: 'There was a problem with your request.',
        title: 'Uh oh! Something went wrong.',
      })

      errorLogger({ errorMessage }, 'Form error')
    }

    if (isSubmitSuccessful) {
      toast({
        description: 'Your review has been submitted.',
        title: 'Success!',
      })
      form.reset()
      router.push('/')
    }
  }, [errors, form, isSubmitSuccessful, router, toast])

  const handleCancel = useCallback(() => {
    router.push('/')
  }, [router])

  const onSubmit = useCallback(async (values: z.infer<typeof ReviewFormSchema>) => {
    try {
      const response = await fetch('/api/reviews', {
        body: JSON.stringify(
          {
            ...values,
            imageUrls: imageIds.map((id) => {
              return CloudinaryLoader({ src: id })
            }),
            userId: session?.user?.id,
          },
        ),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      logger(response, 'Response')
    }
    catch (error) {
      console.error('Error:', error)
    }
  }, [imageIds, session?.user.id])

  if (
    uploadedParam === null
    || firstImageId === 'undefined'
    || !imageIds.length
  ) {
    return null
  }

  if (isSubmitting) {
    <FullPageLoadingSpinner />
  }

  return (
    <AlertDialog open={Boolean(firstImageId)}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Review Washroom</AlertDialogTitle>
              <AlertDialogDescription>
                Please provide your review for the washroom. Upload an image if you have one.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <section className="grid gap-6">
              <div className="flex w-full justify-center">
                <Carousel className="w-full max-w-sm">
                  <CarouselContent>
                    {imageIds.map(id => (
                      <CarouselItem key={id}>
                        <figure className="m-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <CldImage
                                src={id}
                                alt="Uploaded image"
                                width={400}
                                height={225}
                                className="aspect-auto rounded-lg object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                              />
                            </CardContent>
                          </Card>
                        </figure>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <nav>
                    <CarouselPrevious />
                    <CarouselNext />
                  </nav>
                </Carousel>
              </div>
              <fieldset className="grid gap-2">
                <FormField
                  control={form.control}
                  name="washroomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name this place..." className="resize-none" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </fieldset>
              <fieldset className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">😍 Excellent</SelectItem>
                            <SelectItem value="4">😊 Good</SelectItem>
                            <SelectItem value="3">😐 Average</SelectItem>
                            <SelectItem value="2">😕 Poor</SelectItem>
                            <SelectItem value="1">😡 Terrible</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="cleanliness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cleanliness</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cleanliness" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">Excellent</SelectItem>
                            <SelectItem value="4">Good</SelectItem>
                            <SelectItem value="3">Average</SelectItem>
                            <SelectItem value="2">Poor</SelectItem>
                            <SelectItem value="1">Very Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>
              <fieldset className="grid gap-2">
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Share your thoughts..." className="resize-none" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </fieldset>
            </section>
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
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
