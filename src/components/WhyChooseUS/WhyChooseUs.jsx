import { motion } from "framer-motion";
import { CheckCircle, Search, CalendarCheck, ShieldCheck } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Search size={40} className="text-blue-500" />, 
      title: "Find the Perfect Studio",
      description: "Easily search and filter studios based on location, availability, and features."
    },
    {
      icon: <CalendarCheck size={40} className="text-green-500" />, 
      title: "Instant Booking",
      description: "Book your favorite studio in just a few clicks with real-time availability checking."
    },
    {
      icon: <ShieldCheck size={40} className="text-yellow-500" />, 
      title: "Secure Payments",
      description: "Enjoy safe and seamless transactions with our secure payment system."
    },
    {
      icon: <CheckCircle size={40} className="text-purple-500" />, 
      title: "Verified Studios",
      description: "We ensure all listed studios are verified for quality and trustworthiness."
    }
  ];

  return (
    <section className="py-16 px-5   container mx-auto  text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-teal-950"
      >
        Why Choose Us?
      </motion.h2>
      <p className="text-gray-600 mt-4 w-full mx-auto">
        Discover the best studios with seamless booking, secure payments, and verified listings.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white border-2 shadow-lg p-6 rounded-2xl flex flex-col items-center hover:shadow-2xl transition-all"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
            <p className="text-gray-500 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
