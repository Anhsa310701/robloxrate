
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    text: string;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, change, className = "" }: StatCardProps) => {
  return (
    <div className={`admin-stats-card ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {title}
          </h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="icon-circle bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-3 flex items-center">
          <span
            className={`text-xs font-medium mr-1 ${
              change.type === "increase"
                ? "text-green-600 dark:text-green-400"
                : change.type === "decrease"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {change.type === "increase" ? "+" : change.type === "decrease" ? "-" : ""}
            {Math.abs(change.value)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {change.text}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
