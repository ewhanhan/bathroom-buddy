import type { Photo } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { StarIcon } from '@/components/icons/star-icon'

export function WashroomCard({
  cleanliness,
  description,
  photos,
  rating,
  title,
}: {
  cleanliness: number
  description: string
  photos: Photo[]
  rating: number
  title: string
}) {
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
                className={`mr-1 size-5 ${index < Math.floor(rating) ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
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
