import { useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

export default function ImageShape({ imageUrl }) {
    const shapeRef = useRef()
    const [ image ] = useImage(imageUrl, 'Anonymous')

    return (
        <Image
            image={image}
            ref={shapeRef}
        />
    )
}