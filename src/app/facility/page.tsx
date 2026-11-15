import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { photos } from "@/config/images";
import { Photo } from "@/components/Photo";
import { Lines } from "@/components/Lines";

export const metadata: Metadata = {
  title: "The Facility | Steel Heart Fitness Studio",
  description: "Explore the Steel Heart Fitness Studio facility and training spaces.",
};

export default function FacilityGalleryPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] py-12 sm:py-16 lg:py-20">
      <div className="wrap">
        <Link href="/#facility" className="eyebrow inline-flex items-center gap-3 transition-colors hover:text-[var(--sh-red)]">
          <ArrowLeft size={15} /> Back to the facility
        </Link>

        <header className="mb-10 mt-10 flex flex-col justify-between gap-5 border-b border-[var(--line-strong)] pb-8 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <p className="eyebrow mb-4 text-red-accent">03 / The Facility</p>
            <Lines lines={["THE FULL", "PICTURE."]} accent={[1]} className="f-display text-[clamp(3.4rem,9vw,8rem)]" />
          </div>
          <p className="eyebrow pb-2">{String(photos.facility.length).padStart(2, "0")} views</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {photos.facility.map((slot, index) => (
            <figure key={slot.label} className="group relative aspect-[3/4] overflow-hidden border border-[var(--line-strong)] bg-[var(--surface)]">
              <Photo slot={slot} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" showLabel={false} parallax={false} />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
                <span>
                  <span className="eyebrow block !text-[0.58rem] !text-white/65">Steel Heart / {String(index + 1).padStart(2, "0")}</span>
                  <span className="f-display mt-2 block text-2xl sm:text-3xl">{slot.label.replace("Facility: ", "")}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
