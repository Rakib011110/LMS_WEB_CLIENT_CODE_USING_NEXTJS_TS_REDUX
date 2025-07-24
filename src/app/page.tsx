
import Banner from '@/components/HomeSection/Banner/Banner';
import { CarouselBanner } from '@/components/HomeSection/Banner/Carouselbanner';
import { SliderBanner } from '@/components/HomeSection/Banner/SliderBanner';
import CourseList from '@/components/HomeSection/CourseSection/CourseList';
import { StudyResources } from '@/components/HomeSection/ResourcesSection/ResourcesSection';

export default function Home() {
  return (
    <div className="">
      <Banner />

      <div>
        <CourseList />
      </div>
<div>
  <StudyResources />
</div>

      {/* <CarouselBanner /> */}
    </div>
  );
}
