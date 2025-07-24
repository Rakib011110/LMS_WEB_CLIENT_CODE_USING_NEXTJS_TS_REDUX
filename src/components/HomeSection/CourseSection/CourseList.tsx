import  { Title3DFlip } from "@/components/common/Commontitle/Commontitle";
import { CourseCard } from "./CourseSection";
import { motion } from 'framer-motion';

// Example of how to use the CourseCard in a list
export default function CourseList() {
    const courses = [
        {
            imageUrl: 'https://placehold.co/400x240/1a202c/ffffff?text=English',
            category: 'EVERYDAY ENGLISH',
            instructor: { name: 'Elita Karim', title: 'Former Editor', company: 'The Daily Star' },
            tags: ['Communication', 'Skill Development'],
            title: 'Everyday English',
            description: 'একটি কোর্সের মাধ্যমে আপনার ইংরেজিভীতির দশা বাড়িয়ে ফেলুন।',
            rating: 4.9,
            enrolled: 26738,
            price: 649,
            originalPrice: 1750,
        },
        {
            imageUrl: 'https://placehold.co/400x240/2c5282/ffffff?text=Excel',
            category: 'Microsoft Excel',
            instructor: { name: 'Rifatul Maksud', title: 'Manager', company: 'Products & Technology' },
            tags: ['Tools and Technology'],
            title: 'MS Excel for Professionals',
            description: 'This course enables you to utilize MS Excel more efficiently and confidently.',
            rating: 4.8,
            enrolled: 16799,
            price: 649,
            originalPrice: 1750,
        },
        {
            imageUrl: 'https://placehold.co/400x240/276749/ffffff?text=Sales',
            category: 'TERRITORY SALES',
            instructor: { name: 'Imtiaz Ahmed Chowdhury', title: 'Sales Director', company: 'Syngenta Bangladesh' },
            tags: ['Sales and Marketing'],
            title: 'Territory Sales Management',
            description: 'হয়ে উঠুন একজন সফল সেলার, গ্রেড মার্কেটিং ও ডিস্ট্রিবিউশন প্রোফেশনাল।',
            rating: 4.9,
            enrolled: 4544,
            price: 649,
            originalPrice: 1750,
        },
    ];

    return (
        <div className=" py-12 max-w-6xl mx-auto">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    {/* <h2 className="text-4xl font-bold text-gray-800">Our Top Picks</h2>
                    <p className="text-gray-500 mt-2">Tailored to your career</p> */} 
 <Title3DFlip />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => <CourseCard key={course.title} {...course} />)}
                </div>
                <div className="text-center mt-12">
                    <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:bg-green-700 hover:scale-105">
                        Explore All Courses
                    </button>
                </div>
            </div>
        </div>
    );
}
