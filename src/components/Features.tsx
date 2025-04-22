import { motion } from "framer-motion";
import { Brain, Brush, Code, Sparkles, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: {
    name: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    delay: number;
  };
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: feature.delay }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-lg p-6 bg-white dark:bg-gray-800 shadow-lg"
    >
      <div
        className={`absolute inset-0 opacity-10 ${feature.gradient}`}
        style={{ mixBlendMode: "multiply" }}
      />
      <feature.icon className="w-8 h-8 mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
    </motion.div>
  );
};

export default function Features() {
  const features = [
    {
      name: "AI-Powered Insights",
      description: "Get intelligent suggestions and insights to enhance your creative process.",
      icon: Brain,
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      delay: 0.2,
    },
    {
      name: "Creative Tools",
      description: "Access a suite of powerful tools designed for creative expression.",
      icon: Brush,
      gradient: "bg-gradient-to-r from-blue-500 to-teal-500",
      delay: 0.4,
    },
    {
      name: "Smart Integration",
      description: "Seamlessly integrate with your existing workflow and tools.",
      icon: Code,
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
      delay: 0.6,
    },
    {
      name: "Advanced Features",
      description: "Unlock powerful capabilities to take your creativity to the next level.",
      icon: Sparkles,
      gradient: "bg-gradient-to-r from-orange-500 to-yellow-500",
      delay: 0.8,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover what makes our platform unique
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
