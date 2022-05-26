import { useSiderDragWidth } from "@/hooks";
import "./index.less";
const Drag = () => {
  const { width } = useSiderDragWidth({ parentClass: ".left" });
  const div = useSiderDragWidth({
    parentClass: ".right",
    initStyle: `
        position: absolute; width: 2px;
        height: 100%;
        left: 0;
        cursor: col-resize;
        z-index: 112;
        top: 0`,
    direction: "left",
  });
  return (
    <div className="box">
      <div className="left" style={{ width }}>
        121
      </div>
      <div className="middle">21212</div>
      <div className="right" style={{ width: div.width }}>
        333
      </div>
    </div>
  );
};

export default Drag;
