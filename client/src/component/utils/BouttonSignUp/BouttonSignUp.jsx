import React from "react";
import { useEffect, useRef, useState } from "react";

function JSAnimation() {
  const banner = useRef(null);
  const blockRefs = [];

  useEffect(() => {
    for (let i = 0; i < 150; i++) {
      blockRefs.push(banner);
      const duration = Math.random() * 5;
      blockRefs.push(banner);
      blockRefs[i].style.animationDuration = `${duration}s`;
    }
  }, [blockRefs]);

  return (
    <div className="banner" ref={banner}>
      {[...Array(150)].map((_, i) => (
        <div key={i} className="blocks" ref={(el) => (blockRefs[i] = el)}></div>
      ))}
      <span>S’inscrire</span>
    </div>
  );
}

export default JSAnimation;
