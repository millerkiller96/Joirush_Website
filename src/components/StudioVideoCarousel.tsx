"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { studioVideos } from "@/data/studio-videos";
import { asset } from "@/lib/paths";
import { site } from "@/data/site";

export function StudioVideoCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });
  }, []);

  const playVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  const handleVideoEnd = useCallback(
    (endedIndex: number) => {
      if (!isInView) return;
      const nextIndex = (endedIndex + 1) % studioVideos.length;
      setCurrentIndex(nextIndex);
      playVideo(nextIndex);
    },
    [isInView, playVideo]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio >= 0.4;
          setIsInView(inView);

          if (inView) {
            playVideo(currentIndex);
          } else {
            pauseAllVideos();
          }
        });
      },
      { threshold: [0, 0.4, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [currentIndex, pauseAllVideos, playVideo]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handler = () => handleVideoEnd(index);
        video.addEventListener("ended", handler);
        return () => video.removeEventListener("ended", handler);
      }
    });
  }, [handleVideoEnd]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.children[currentIndex] as HTMLElement | undefined;
    if (card) {
      const scrollLeft =
        card.offsetLeft - carousel.offsetWidth / 2 + card.offsetWidth / 2;
      carousel.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  const handlePrev = () => {
    pauseAllVideos();
    const prevIndex =
      (currentIndex - 1 + studioVideos.length) % studioVideos.length;
    setCurrentIndex(prevIndex);
    if (isInView) playVideo(prevIndex);
  };

  const handleNext = () => {
    pauseAllVideos();
    const nextIndex = (currentIndex + 1) % studioVideos.length;
    setCurrentIndex(nextIndex);
    if (isInView) playVideo(nextIndex);
  };

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (index !== currentIndex) {
      pauseAllVideos();
      setCurrentIndex(index);
      if (isInView) playVideo(index);
    } else {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  };

  return (
    <section ref={sectionRef} className="bg-cream-deep py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              From the studio
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-chocolate md:text-5xl">
              See the Magic in Motion
            </h2>
            <p className="mt-4 text-lg text-chocolate-mid">
              Behind-the-scenes sculpting, finished pieces, and happy collectors.
            </p>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-chocolate px-5 py-2.5 text-sm font-medium text-cream hover:bg-pink"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow {site.instagramHandle}
          </a>
        </div>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 text-chocolate shadow-card hover:bg-pink hover:text-white md:block"
            aria-label="Previous video"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide md:gap-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {studioVideos.map((video, index) => (
              <div
                key={video.id}
                className={`relative flex-shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-4 ring-pink ring-offset-2 ring-offset-cream-deep"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{ width: "200px" }}
                onClick={() => handleVideoClick(index)}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={asset(video.src)}
                  muted
                  playsInline
                  loop={false}
                  preload={index === currentIndex ? "auto" : "metadata"}
                  className="h-[356px] w-full object-cover"
                  onEnded={() => handleVideoEnd(index)}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-3">
                      <svg className="h-6 w-6 text-chocolate" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    </div>
                  </div>
                )}
                <a
                  href={video.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-2 right-2 rounded-full bg-white/90 p-1.5 text-chocolate hover:bg-pink hover:text-white"
                  aria-label="View on Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 text-chocolate shadow-card hover:bg-pink hover:text-white md:block"
            aria-label="Next video"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {studioVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                pauseAllVideos();
                setCurrentIndex(index);
                if (isInView) playVideo(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-pink"
                  : "w-2 bg-chocolate/20 hover:bg-chocolate/40"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
