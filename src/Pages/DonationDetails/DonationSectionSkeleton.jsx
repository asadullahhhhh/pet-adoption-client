import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DonationSectionSkeleton({darkLight}) {
  return (
    <div className={`space-y-8 ${darkLight ? "dark" : ""} dark:bg-gray-900`}>
      {/* Featured Donation Card Skeleton */}
      <div className="rounded-2xl overflow-hidden max-w-7xl mx-auto shadow-md bg-white dark:bg-gray-900">
        <Skeleton
          height={200}
          baseColor={darkLight ? "#1f2937" : undefined}
          highlightColor={darkLight ? "#374151" : undefined}
          className="dark:!baseColor-gray-800 dark:!highlightColor-gray-700"
        />
        <div className="p-5 space-y-3">
          <Skeleton
            baseColor={darkLight ? "#1f2937" : undefined}
            highlightColor={darkLight ? "#374151" : undefined}
            width={200}
            height={24}
          />
          <Skeleton
            baseColor={darkLight ? "#1f2937" : undefined}
            highlightColor={darkLight ? "#374151" : undefined}
            width={150}
            height={16}
          />
          <div className="flex gap-4">
            <Skeleton
              baseColor={darkLight ? "#1f2937" : undefined}
              highlightColor={darkLight ? "#374151" : undefined}
              width={80}
              height={14}
            />
            <Skeleton
              baseColor={darkLight ? "#1f2937" : undefined}
              highlightColor={darkLight ? "#374151" : undefined}
              width={80}
              height={14}
            />
            <Skeleton
              baseColor={darkLight ? "#1f2937" : undefined}
              highlightColor={darkLight ? "#374151" : undefined}
              width={100}
              height={14}
            />
          </div>
          <Skeleton
            baseColor={darkLight ? "#1f2937" : undefined}
            highlightColor={darkLight ? "#374151" : undefined}
            width={120}
            height={38}
            borderRadius={8}
          />
        </div>
      </div>

      {/* Recommended Donation Campaigns Title */}
      <div className="max-w-7xl mx-auto">
        <Skeleton
          baseColor={darkLight ? "#1f2937" : undefined}
          highlightColor={darkLight ? "#374151" : undefined}
          width={250}
          height={20}
        />
      </div>

      {/* Recommended Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow bg-white dark:bg-gray-900"
          >
            <Skeleton
              baseColor={darkLight ? "#1f2937" : undefined}
              highlightColor={darkLight ? "#374151" : undefined}
              height={140}
            />
            <div className="p-3 space-y-2">
              <Skeleton
                baseColor={darkLight ? "#1f2937" : undefined}
                highlightColor={darkLight ? "#374151" : undefined}
                width={180}
                height={20}
              />
              <Skeleton
                baseColor={darkLight ? "#1f2937" : undefined}
                highlightColor={darkLight ? "#374151" : undefined}
                width={100}
                height={14}
              />
              <Skeleton
                baseColor={darkLight ? "#1f2937" : undefined}
                highlightColor={darkLight ? "#374151" : undefined}
                width={100}
                height={14}
              />
              <Skeleton
                baseColor={darkLight ? "#1f2937" : undefined}
                highlightColor={darkLight ? "#374151" : undefined}
                width={120}
                height={36}
                borderRadius={8}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
