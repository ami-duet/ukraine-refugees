import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import './App.scss';
import Quotes from './components/Quotes/Quotes';
import Timeline from './components/Timeline/Timeline';
import Conclusion from './components/Conclusion/Conclusion';

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
        <section className="panel panel-quotes" ref={(e) => createPanelsRefs(e, 0)}>
          <Quotes />
        </section>
        <section className="panel panel-timeline" ref={(e) => createPanelsRefs(e, 1)}>
          <Timeline />
        </section>
        <section className="panel panel-conclusion" ref={(e) => createPanelsRefs(e, 2)}>
          <Conclusion />
        </section>
      </div>
    </>
  );
}

export default App;
