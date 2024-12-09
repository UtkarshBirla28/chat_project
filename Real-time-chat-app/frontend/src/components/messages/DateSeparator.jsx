const DateSeparator = ({ date }) => {
    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-1 text-xs text-gray-500 dark:text-gray-400">
          {date}
        </div>
      </div>
    );
  };
  
  export default DateSeparator;
  