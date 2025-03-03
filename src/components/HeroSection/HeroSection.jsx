import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Studio",
    subtitle: "Book the best studio spaces near you with ease.",
    image: "https://i.ibb.co.com/VWMZzWS2/images-32.jpg",
  },
  {
    id: 2,
    title: "Photography & Film Studios",
    subtitle: "Premium spaces equipped for photography and filmmaking.",
    image: "https://i.ibb.co.com/kVWpgbNw/STUDIO-18-01-23-62744-1.jpg",
  },
  {
    id: 3,
    title: "Top Rated Recording Studios",
    subtitle: "Record your next masterpiece in top-tier facilities.",
    image: "https://i.ibb.co.com/PsP7HqDr/Screen-Shot-2025-01-21-at-1-43-41-PM.webp",
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full mt-14 lg:mt-16">
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[400px] md:h-[500px]">
            {/* Background Image */}
            <motion.img
              src={slide.image}
              alt="Studio"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 px-4">
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-3"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;
