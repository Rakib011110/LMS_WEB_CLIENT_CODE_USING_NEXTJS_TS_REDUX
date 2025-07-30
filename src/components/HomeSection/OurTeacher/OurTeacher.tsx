"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

// Define the type for a single mentor
type Mentor = {
  name: string;
  title: string;
  companyLogoUrl: string;
  imageUrl: string;
};

// Sample data for the mentors
const mentors: Mentor[] = [
  {
    name: "Md. Ehsanul Hoque",
    title: "Partner Director",
    companyLogoUrl: "https://placehold.co/100x40/ffffff/000000?text=CompanyA",
    imageUrl: "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1744196674%2FWhatsApp_Image_2025-04-09_at_4_16_48_PM_1_-Picsart-BackgroundChanger_mmxwom.jpg&w=1080&q=75",
  },
  {
    name: "A B M Jabed Sultan",
    title: "Chief Business Officer",
    companyLogoUrl: "https://placehold.co/100x40/ffffff/000000?text=CompanyB",
    imageUrl: "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1744196674%2FWhatsApp_Image_2025-04-09_at_4_16_48_PM_1_-Picsart-BackgroundChanger_mmxwom.jpg&w=1080&q=75",
  },
  {
    name: "Joshua Adhikari",
    title: "Regional Growth Manager",
    companyLogoUrl: "https://placehold.co/100x40/ffffff/000000?text=CompanyC",
    imageUrl: "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1744196674%2FWhatsApp_Image_2025-04-09_at_4_16_48_PM_1_-Picsart-BackgroundChanger_mmxwom.jpg&w=1080&q=75",
  },
  {
    name: "Jane Doe",
    title: "Lead Product Designer",
    companyLogoUrl: "https://placehold.co/100x40/ffffff/000000?text=CompanyD",
    imageUrl: "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1744196674%2FWhatsApp_Image_2025-04-09_at_4_16_48_PM_1_-Picsart-BackgroundChanger_mmxwom.jpg&w=1080&q=75",
  },
  {
    name: "John Smith",
    title: "Senior Software Engineer",
    companyLogoUrl: "https://placehold.co/100x40/ffffff/000000?text=CompanyE",
    imageUrl: "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1744196674%2FWhatsApp_Image_2025-04-09_at_4_16_48_PM_1_-Picsart-BackgroundChanger_mmxwom.jpg&w=1080&q=75",
  },
];

// Reusable Mentor Card Component
const MentorCard = ({ mentor }: { mentor: Mentor }) => (
  <div className="relative bg-white rounded-3xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    {/* Greenish background gradient */}
    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-emerald-50 via-teal-50 to-white rounded-t-3xl"></div>
    
    <div className="relative pt-8 px-4 flex flex-col items-center text-center">
      <div className="relative w-40 h-40 mb-4">
        <Image
          src={mentor.imageUrl}
          alt={`Photo of ${mentor.name}`}
          width={160}
          height={160}
          className="rounded-full object-cover border-4 border-white shadow-sm"
        />
      </div>
      <div className="pb-8">
        <Image
          src={mentor.companyLogoUrl}
          alt={`Logo of ${mentor.name}'s company`}
          width={80}
          height={32}
          className="mx-auto mb-3 h-8 object-contain"
        />
        <h3 className="font-bold text-lg text-slate-800">{mentor.name}</h3>
        <p className="text-sm text-slate-500">{mentor.title}</p>
      </div>
    </div>
  </div>
);


// Main Slider Component
export default function ExperiencedMentorsSlider() {
  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
            Experienced Mentors
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            To help shape your career
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {mentors.map((mentor, index) => (
                <div className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-4" key={index}>
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Previous Mentor"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Next Mentor"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
