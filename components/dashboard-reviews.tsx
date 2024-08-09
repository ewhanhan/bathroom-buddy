import Link from 'next/link'
import type { JSX, SVGProps } from 'react'
import type { Photo, WashroomReview } from '@prisma/client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { ReviewWithPhotosPayload } from '@/types/api'

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export type WashroomReviewWithPhotos = Omit<WashroomReview, 'photo'> & {
  photo: Photo
}

interface WashroomCardProps {
  cleanliness: number
  description: string
  photos: Photo[]
  rating: number
  title: string
}

const WashroomCard: React.FC<WashroomCardProps> = ({
  cleanliness,
  description,
  photos,
  rating,
  title,
}) => {
  const href = ''
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-background shadow-lg transition-all duration-300 hover:scale-105">
      <Link href={href} className="block" prefetch={false}>
        <div className="relative">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {photos.map(photo => (
                <CarouselItem key={photo.id}>
                  <figure className="m-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={photo.url ?? ''}
                          alt={title}
                          width="400"
                          height="200"
                          className="h-48 w-full object-cover"
                          style={{ aspectRatio: '400/200', objectFit: 'cover' }}
                        />
                      </CardContent>
                    </Card>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-xl font-bold">{title}</h2>
          <div className="mb-2 flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={title}
                className={`mr-1 size-5 ${
                  index < Math.floor(rating) ? 'fill-primary' : 'fill-muted stroke-muted-foreground'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">{rating}</span>
          </div>
          <p className="mb-2 text-sm text-muted-foreground">
            Cleanliness:
            {cleanliness}
            /5
          </p>
          <p className="line-clamp-3 text-sm">{description}</p>
        </div>
      </Link>
    </div>
  )
}

export function Dashboard({
  reviews,
}: {
  reviews: ReviewWithPhotosPayload[]
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((washroom: any) => (
          <WashroomCard
            key={washroom.id}
            cleanliness={washroom.cleanliness}
            description={washroom.comments ?? ''}
            photos={washroom.photos}
            rating={washroom.rating}
            title={washroom.washroomName}
          />
        ))}
      </div>
    </div>
  )
}
