
import { Gamepad } from "lucide-react";
import { Link } from "react-router-dom";

interface GameCardProps {
  id: string;
  name: string;
  image?: string;
  onClick?: () => void;
  className?: string;
}

const GameCard = ({ id, name, image, onClick, className = "" }: GameCardProps) => {
  return (
    <div 
      className={`game-card bg-game-card ${className}`}
      onClick={onClick}
    >
      <Link to={`/games/${id}`} className="block p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/30 rounded-full flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-10 h-10 object-contain"
            />
          ) : (
            <Gamepad size={32} className="text-blue-400" />
          )}
        </div>
        <h3 className="text-center text-white font-medium">{name}</h3>
      </Link>
    </div>
  );
};

export default GameCard;
