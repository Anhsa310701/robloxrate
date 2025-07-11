
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
}

const ActivityItem = ({ icon, title, time }: ActivityItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <div className="icon-circle bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-gray-900 dark:text-gray-200">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
