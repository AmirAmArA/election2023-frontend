import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
    width:number,
    height:number,
    aspectRatio:string,
    src:string,
    alt:string,
}

const Images = (props:Props) => {
  return (
    <Image
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
    className={cn(
      "h-auto w-auto object-cover transition-all hover:scale-105",
      props.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
    )}
    />
  )
}

export default Images