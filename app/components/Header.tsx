"use client";

export function Header(): JSX.Element {
  const onOrder = () => {
    const event = new Event("reorder");
    window.dispatchEvent(event);
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10 pointer-events-none">
      <button
        className="bg-gray-400 p-4 pointer-events-auto w-full uppercase"
        onClick={onOrder}
      >
        Reorder windows
      </button>
    </header>
  );
}
