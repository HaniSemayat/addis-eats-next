export default function MenuLayout({ children }) {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </div>
  );
}
