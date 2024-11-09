import React from "react";

type ProgressBarProps = {
  current: number; // current number of lessons completed
  total: number; // total number of lessons
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-500 text-sm">
        Đã học {current}/{total} bài
      </span>
      <div className="relative w-full h-3 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
