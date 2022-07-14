import FutureNextImage from 'next/future/image';
import type { ImageProps as NextImageProps } from 'next/image';
import NextImage from 'next/image';

import type { FC } from '@/types';
import { styled, css } from '~/stitches';

const imageWrapperChildCss = css({
  objectFit: 'contain',
  position: 'relative',
  minHeight: 0,
  height: 'auto',
});

const ImageWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  minHeight: 0,
  maxHeight: '100%',
  overflow: 'hidden',
  '& > span:first-of-type': imageWrapperChildCss,
  '& img': imageWrapperChildCss,
});

type BaseImageProps = Pick<
  NextImageProps,
  | 'alt'
  | 'width'
  | 'height'
  | 'className'
  | 'objectFit'
  | 'objectPosition'
  | 'layout'
  | 'quality'
  | 'priority'
>;

export interface ImageProps extends BaseImageProps {
  src: string;
  size?: number;
  avoidNextImage?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  isFourOhFour?: boolean;
}

export const Img: FC<ImageProps> = (props) => {
  const {
    avoidNextImage = false,
    size,
    width = size,
    height = size,
    layout,
    className,
    loading = 'lazy',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFourOhFour,
    ...rest
  } = props;

  if (!avoidNextImage) {
    if (typeof size !== 'undefined' || typeof layout !== 'undefined') {
      return (
        <FutureNextImage
          {...rest}
          width={width}
          height={height}
          className={className}
          loading={props.priority ? undefined : loading}
        />
      );
    }
    return (
      <ImageWrapper className={className}>
        <NextImage
          {...rest}
          layout={'fill'}
          loading={props.priority ? undefined : loading}
        />
      </ImageWrapper>
    );
  }
  return (
    // eslint-disable-next-line
    <img loading={'lazy'} decoding={'async'} className={className} {...rest} />
  );
};