export default function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid mb-4 mx-auto max-w-7xl px-2 grid-cols-1 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
