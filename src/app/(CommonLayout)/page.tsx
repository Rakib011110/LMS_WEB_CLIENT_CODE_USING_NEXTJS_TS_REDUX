import Banner from "@/components/HomeSection/Banner/Banner";
import { CarouselBanner } from "@/components/HomeSection/Banner/Carouselbanner";
import CourseList from "@/components/HomeSection/CourseSection/CourseList";
import OurExperienceSection from "@/components/HomeSection/OurExperience/OurExperience";
import ExperiencedMentorsSlider from "@/components/HomeSection/OurTeacher/OurTeacher";
import { StudyResources } from "@/components/HomeSection/ResourcesSection/ResourcesSection";
import StudentsShowcase from "@/components/HomeSection/StudentsShowcase";
import TEST from "@/components/HomeSection/Test";

export default function HomePages() {
  return (
    <div>
          <div className="">
      <Banner />

      <div>
        <CourseList />
      </div>
<div>
  <StudyResources />
</div>

<OurExperienceSection />
<ExperiencedMentorsSlider />
<StudentsShowcase />

      <CarouselBanner />

      <TEST/>
    </div>
    </div>
  );
}