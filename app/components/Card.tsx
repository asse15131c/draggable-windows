"use client";

import clsx from "clsx";
import gsap from "gsap";
import { useRef, useState, type PropsWithChildren } from "react";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "gsap/dist/InertiaPlugin";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

type CardProps = {
  title: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export function Card({
  children,
  title,
  className,
}: PropsWithChildren & CardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const tl = useRef(gsap.timeline()).current;
  const [open, setOpen] = useState<boolean>(true);

  const { contextSafe } = useGSAP(
    () => {
      Draggable.create(cardRef.current, {
        bounds: document.getElementById("draggableContainer"),
        inertia: true,
      });

      const animate = () => {
        tl.clear();
        tl.to(cardRef.current, {
          x: 0,
          y: 0,
          ease: "expo.out",
          duration: 0.6,
        });
      };

      window.addEventListener("reorder", animate);
    },
    {
      scope: cardRef,
      dependencies: [],
    }
  );

  const onClick = contextSafe(() => {
    tl.clear();
    tl.to(".gsap\\:inner", {
      height: open ? "0px" : "auto",
      onStart: () => {
        setOpen((e) => !e);
      },
    });
  });

  return (
    <div className={clsx(className, "gsap:cards")}>
      <div
        className={clsx(
          "flex flex-col w-full p-2 bg-slate-700 text-black flex-none h-auto max-h-full"
        )}
        ref={cardRef}
      >
        <button onClick={onClick} className="bg-yellow-200 p-4">
          {title}
        </button>

        <div
          className={clsx(
            "w-full h-full origin-top overflow-y-auto",
            "gsap:inner"
          )}
        >
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
