export default function Loading() {
  return (
    <div className="page-container animate-pulse">
      <div className="h-8 bg-gray-700 w-1/3 rounded mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-800 rounded"></div>
        ))}
      </div>
    </div>
  );
}
