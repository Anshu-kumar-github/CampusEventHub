import { Link } from "react-router-dom";

const QuickActionCard = ({
  icon,
  title,
  description,
  to,
  color
}) => {
  return (
    <Link to={to}>
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all
          duration-300
          p-6
          h-full
          flex
          flex-col
          justify-between
        "
      >
        <div>

          <div
            className={`
              w-14
              h-14
              rounded-xl
              bg-gray-100
              flex
              items-center
              justify-center
              text-3xl
              ${color}
            `}
          >
            {icon}
          </div>

          <h3 className="text-xl font-bold mt-5">
            {title}
          </h3>

          <p className="text-gray-500 mt-2">
            {description}
          </p>

        </div>

        <p className="mt-6 font-semibold text-blue-600">
          Open →
        </p>

      </div>
    </Link>
  );
};

export default QuickActionCard;