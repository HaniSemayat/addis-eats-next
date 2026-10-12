import MenuCounter from "./MenuCounter";

export default function MenuLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 shrink-0 border-r p-4">
        <h2 className="mb-4 font-bold">Menu Tools</h2>
        <MenuCounter />
      </aside>

      <section className="min-w-0 flex-1 p-6">
        {children}
      </section>
    </div>
  );
}
