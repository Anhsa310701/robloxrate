
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 transition-transform duration-300 hover:scale-105">
      <div className="mx-auto w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-center mb-2">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
