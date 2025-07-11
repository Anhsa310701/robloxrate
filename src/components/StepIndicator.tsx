
interface StepIndicatorProps {
  number: number;
  title: string;
  description: string;
  active?: boolean;
  className?: string;
}

const StepIndicator = ({ 
  number, 
  title, 
  description, 
  active = false,
  className = ""
}: StepIndicatorProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className={`step-circle ${!active ? "bg-blue-400/30 text-white/70" : ""}`}
      >
        {number}
      </div>
      <h3 className="mt-3 text-xl font-medium text-center">{title}</h3>
      <p className="mt-2 text-center text-gray-300 max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default StepIndicator;
