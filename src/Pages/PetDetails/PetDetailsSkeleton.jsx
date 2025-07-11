import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PetDetailsSkeleton() {
  return (
    <section className="px-4 md:px-12 py-10 max-w-7xl mx-auto">
      {/* Top Section: Image and Info */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Skeleton for Image */}
        <div className="rounded-lg overflow-hidden">
          <Skeleton height={350} />
        </div>

        {/* Skeleton for Text Content */}
        <div className="space-y-4">
          <Skeleton width={150} height={30} /> {/* Title */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} height={20} />
            ))}
          </div>
          <Skeleton count={2} />
          <Skeleton width={120} height={40} borderRadius={20} />
        </div>
      </div>

      {/* About Section */}
      <div className="mt-12 space-y-4">
        <Skeleton width={200} height={30} /> {/* About title */}
        <div className="flex gap-4 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width={160} height={25} borderRadius={12} />
          ))}
        </div>
        <Skeleton count={5} />
      </div>
    </section>
  );
}
