export default function StatCard({
  title,
  value,
  description,
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      {description && (
        <p className="text-sm text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}