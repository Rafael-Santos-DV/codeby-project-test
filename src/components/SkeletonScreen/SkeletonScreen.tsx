import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CSSProperties } from 'styled-components';
import { ContainerSkeleton } from './style';

type SkeletonType = {
  count: number;
  className?: string;
  style?: CSSProperties;
  childrenStyle?: CSSProperties;
  childrenClassName?: string;
  childrenLines: number;
};

export const SkeletonScreen: React.FC<SkeletonType> = ({
  className,
  count,
  style,
  childrenStyle,
  childrenClassName,
  childrenLines,
}) => {
  let amountOfSkeletons = [];
  for (let value = 0; value < count; value++) {
    amountOfSkeletons.push(value);
  }
  return (
    <ContainerSkeleton style={style} className={className}>
      {amountOfSkeletons.map((index) => (
        <Skeleton
          key={index}
          count={childrenLines}
          className={`skeleton-screen-master ${childrenClassName ?? ''}`}
          style={childrenStyle}
        />
      ))}
    </ContainerSkeleton>
  );
};
