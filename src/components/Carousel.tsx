import Link from "next/link";
import { useEffect, useState } from "react";

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
  id,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
  id: string | undefined;
}) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));

  const next = () =>
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    // clearInterval(slideInterval);
  }, []);

  return (
    <div className="flex items-center w-[460px]">
      <button
        onClick={prev}
        className="p-1 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <Link href={`/products/${id}`}>
        <div className="relative flex overflow-hidden">
          <div
            className="flex transition-transform ease-out duration-500  "
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((img) => (
              <img
                className="object-cover"
                key={img}
                src={img}
              />
            ))}
          </div>

          <div className="absolute bottom-1 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`
              transition-all w-3 h-3 bg-blue-200 rounded-full
              ${current === i ? "p-2" : "bg-opacity-50"}
              `}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={next}
        className="p-1 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
