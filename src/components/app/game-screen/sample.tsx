import { useState } from "react";
import "./sample.css";

export default function Sample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="scene" onClick={() => setIsOpen(!isOpen)}>
      <div className="fridge">
        <div className={`door ${isOpen ? "open" : ""}`}></div>
      </div>
    </div>
  );
}
