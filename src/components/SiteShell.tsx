"use client";

import { useState } from "react";
import { Intro } from "./Intro";
import { Navbar } from "./Navbar";
import { EcgProgress } from "./EcgProgress";
import { ParallaxController } from "./ParallaxController";
import { Hero } from "./sections/Hero";
import { Philosophy } from "./sections/Philosophy";
import { Training } from "./sections/Training";
import { Facility } from "./sections/Facility";
import { Mindset } from "./sections/Mindset";
import { Community } from "./sections/Community";
import { Membership } from "./sections/Membership";
import { Footer } from "./sections/Footer";

export function SiteShell() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Intro onDone={() => setIntroDone(true)} />
      <EcgProgress />
      <Navbar />
      <main id="main">
        <Hero introDone={introDone} />
        <Philosophy />
        <Training />
        <Facility />
        <Mindset />
        <Community />
        <Membership />
      </main>
      <Footer />
      <ParallaxController />
    </>
  );
}
