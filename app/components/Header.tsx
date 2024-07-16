"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/dist/Flip";

gsap.registerPlugin(Flip, useGSAP);

export function Header(): JSX.Element {
  const { contextSafe } = useGSAP();

  const onOrder = () => {
    const event = new Event("reorder");
    window.dispatchEvent(event);
  };

  const onRandomize = contextSafe(() => {
    onOrder();
    const wrapper = document.getElementById("draggableContainer")!;
    const cards = gsap.utils.toArray(".gsap\\:cards");

    const state = Flip.getState(cards as any);

    for (let i = cards.length; i >= 0; i--) {
      wrapper.appendChild(wrapper.children[(Math.random() * i) | 0]);
    }

    Flip.from(state);
  });

  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10 pointer-events-none flex gap-4">
      <button
        className="bg-gray-400 p-4 pointer-events-auto w-full uppercase"
        onClick={onOrder}
      >
        Reorder windows
      </button>
      <button
        className="bg-pink-400 p-4 pointer-events-auto w-full uppercase"
        onClick={onRandomize}
      >
        Randomize
      </button>
    </header>
  );
}
