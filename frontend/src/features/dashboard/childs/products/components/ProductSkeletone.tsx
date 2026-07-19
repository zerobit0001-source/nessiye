const ProductListLoading = ({ count }: { count: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-4 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex flex-col space-y-4 p-4 border border-gray-300 rounded-lg shadow"
        >
          <div className="bg-gray-300 h-48 rounded-md w-full"></div>{" "}
          {/* Placeholder Image */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>{" "}
            {/* Price or Category */}
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>{" "}
            {/* Extra info */}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductListLoading;
