import './App.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const panels = useRef([]);
  const panelsContainer = useRef();

  const createPanelsRefs = (panel, index) => {
    panels.current[index] = panel;
  };

  useEffect(() => {
    const totalPanels = panels.current.length;

    gsap.to(panels.current, {
      xPercent: -100 * (totalPanels - 1),
      ease: "none",
      scrollTrigger: {
        trigger: panelsContainer.current,
        pin: true,
        scrub: 1,
        snap: 1 / (totalPanels - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: () => "+=" + panelsContainer.current.offsetWidth
      }
    });
  }, []);

  return (
    <>
      <div className="container" ref={panelsContainer}>
        <div
          className="description panel blue"
          ref={(e) => createPanelsRefs(e, 0)}
        >
          <div>
            <h1>Horizontal snapping sections (simple)</h1>
            <p>
              Scroll vertically to scrub the horizontal animation. It also
              dynamically snaps to the sections in an organic way based on the
              velocity. The snapping occurs based on the natural ending position
              after momentum is applied, not a simplistic "wherever it is when
              the user stops".
            </p>
            <div className="scroll-down">
              Scroll down<div className="arrow"></div>
            </div>
          </div>
        </div>
        <section className="panel red" ref={(e) => createPanelsRefs(e, 1)}>
          ONE
        </section>
        <section className="panel orange" ref={(e) => createPanelsRefs(e, 2)}>
          TWO
        </section>
        <section className="panel purple" ref={(e) => createPanelsRefs(e, 3)}>
          THREE
        </section>
        <section className="panel green" ref={(e) => createPanelsRefs(e, 4)}>
          FOUR
        </section>
        <section className="panel gray" ref={(e) => createPanelsRefs(e, 5)}>
          FIVE
        </section>
      </div>

      <header>
        <a href="https://greensock.com/scrolltrigger">
          <img
            className="greensock-icon"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-trigger-logo-light.svg"
            width="200"
            height="64"
            alt="GSAP"
          />
        </a>
      </header>
    </>
  );
}

export default App;
