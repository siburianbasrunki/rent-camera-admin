type SkeletonProps = {
  height?: string;
};
export const CardSkeleton = ({ height }: SkeletonProps) => {
  return (
    <div className={`w-full h-48 bg-gray-200 animate-pulse ${height}`}></div>
  );
};
