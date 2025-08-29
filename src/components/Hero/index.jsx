import React from "react";
import { forwardRef } from "react";
const Hero = forwardRef((props, ref) => {
  return (
    <div className="w-full h-120 bg-primary">
      <video
        ref={ref}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        controls
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
