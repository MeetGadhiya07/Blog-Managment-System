export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  title: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Carter',
    role: 'Fitness Trainer',
    company: 'FitLife Gym',
    content:
      'With over a decade in fitness, Alex specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs. His passion is helping clients build strength and confidence through personalized routines. Outside the gym, Alex enjoys running and outdoor adventures.',
    rating: 5,
    avatar: '/images/Blog/alex-carter.jpg',
    title: '5 Tips for Better Cardio Sessions',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Nutritionist',
    company: 'Wellness Center',
    content:
      'Sarah brings 8 years of experience in sports nutrition and meal planning. She helps athletes and fitness enthusiasts optimize their performance through proper nutrition. Her holistic approach combines science-based nutrition with practical lifestyle solutions.',
    rating: 5,
    avatar: '/images/Blog/miranda-rachel.png',
    title: 'Meal Prep Basics for Gym Enthusiasts',
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    role: 'Personal Trainer',
    company: 'Elite Fitness',
    content:
      'Mike specializes in functional training and injury prevention. With certifications in corrective exercise, he helps clients achieve their goals safely and effectively. His motivational coaching style has transformed hundreds of lives over his 12-year career.',
    rating: 5,
    avatar: '/images/Blog/danielle-marsh.png',
    title: 'Advanced Strength Training Techniques',
  },
];
