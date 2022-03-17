import React, { FC, HTMLProps } from 'react';

const Skeleton: FC<HTMLProps<HTMLDivElement>> = ({className, ...others}) => {
  return <div className={`animate-pulse bg-gray-600 ${className}`} {...others}></div>;
};

export default Skeleton;
