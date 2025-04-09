import { useEffect, useRef, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import nkar_1 from "./assets/nkar_1.jpg";
import nkar_2 from "./assets/nkar_2.jpg";
import nkar_3 from "./assets/nkar_3.jpg";
import nkar_4 from "./assets/nkar_4.jpg";
import nkar_5 from "./assets/nkar_5.jpg";
import nkar_6 from "./assets/nkar_6.jpg";
import nkar_7 from "./assets/nkar_7.jpg";

function App() {
  const images = [nkar_1, nkar_2, nkar_3, nkar_4, nkar_5, nkar_6, nkar_7];
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);

  const scrollToPage = (pageNumber) => {
    const targetIndex = pageNumber - 1;
    if (targetIndex >= 0 && targetIndex < images.length) {
      const container = containerRef.current;
      const slide = container.children[targetIndex];
      slide.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const screenHeight = window.innerHeight;
    const current = Math.round(scrollTop / screenHeight) + 1;
    setPage(current);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown") scrollToPage(page + 1);
      if (e.key === "ArrowUp") scrollToPage(page - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page]);

  useEffect(() => {
    const container = containerRef.current;
    let touchStart = 0;
    let touchEnd = 0;

    const onTouchStart = (e) => (touchStart = e.touches[0].clientY);
    const onTouchEnd = (e) => {
      touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart - touchEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) scrollToPage(page + 1);
        else scrollToPage(page - 1);
      }
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [page]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-screen h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative bg-black"
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className="w-full h-screen snap-start flex justify-center transition-all duration-500 ease-in-out items-center"
        >
          {idx === 0 && page === 1 && (
            <h1 className="absolute top-[72px] md:top-16 text-white text-2xl sm:text:3xl md:text-4xl lg:text-5xl font-bold z-20 w-full text-center">
              ԲԵՐՄԱՆ ԲԱՆԱՁԵՎԵՐ
            </h1>
          )}
          <div className="fixed top-1 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 p-2 rounded shadow flex gap-3 items-center z-20">
            <button
              onClick={() => scrollToPage(page - 1)}
              className="px-2 py-1 text-xl font-bold bg-gray-200 rounded hover:bg-gray-300"
            >
              <GoArrowLeft />
            </button>

            <span className="text-gray-600">
              {page} / {images.length}
            </span>

            <button
              onClick={() => scrollToPage(page + 1)}
              className="px-2 py-1 text-xl font-bold bg-gray-200 rounded hover:bg-gray-300"
            >
              <GoArrowRight />
            </button>
          </div>
          <img
            src={src}
            alt={`Image ${idx + 1}`}
            style={{
              maxWidth: "100%",
              maxHeight:
                page === 1 ? "calc(100vh - 130px)" : "calc(100vh - 80px)",
              objectFit: "contain",
            }}
            className={`transition-transform duration-300 ${
              idx === 0 && page === 1 ? "mt-28" : "mt-5"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
