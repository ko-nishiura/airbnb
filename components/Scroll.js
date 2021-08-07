import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

function Scroll() {
  const CONTENT_OFFSET_THRESHOLD = 250;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {scrollY > CONTENT_OFFSET_THRESHOLD && (
        <ArrowCircleUpIcon
          className="fixed bottom-0 right-0 h-10 m-3 cursor-pointer "
          onClick={() => {
            scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        />
      )}
    </div>
  );
}

export default Scroll;
