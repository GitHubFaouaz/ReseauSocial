import React from "react";
import { useEffect, useRef, useState } from "react";

/* <section>
   <div class="banner">
   <div class="blocks"></div>

   </div>
</section>
<script>
const banner = document.getElementsByClassName("banner")[0];
const blocks = document.getElementsByClassName("blocks");
for (let i = 1; i < 250; i++) {
  banner.innerHTML += "<div class='blocks'></div> "; //la boucle envoie autant de carré necessaire  pour tout la page
  const duration = Math.random() * 5; //chaque numero aleatoire de math.rom
  blocks[i].style.animationDuration = duration + "s";
}
</script> */

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
