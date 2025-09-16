export default function Error({ message }: { message: string }) {
  return (
    <div className="w-full mx-auto max-w-7xl px-2 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-red-700">{message}</h1>
    </div>
  );
}
