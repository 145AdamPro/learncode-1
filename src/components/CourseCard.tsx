import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  url?: string;
  onClick?: () => void;
}

const CourseCard = ({ title, icon, description, url, onClick }: CourseCardProps) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <p className="mt-3 text-gray-600">{description}</p>
    </div>
  );
};

export default CourseCard;