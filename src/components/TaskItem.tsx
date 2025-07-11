
import { Check } from "lucide-react";
import { useState } from "react";

interface TaskItemProps {
  label: string;
  completed?: boolean;
  onChange?: (completed: boolean) => void;
}

const TaskItem = ({ label, completed = false, onChange }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleChange = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="flex items-start gap-3 py-2">
      <button
        type="button"
        onClick={handleChange}
        className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center ${
          isCompleted
            ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      >
        {isCompleted && <Check size={12} className="text-white" />}
      </button>
      <span
        className={`${
          isCompleted ? "text-gray-500 line-through" : "text-gray-900 dark:text-gray-200"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default TaskItem;
