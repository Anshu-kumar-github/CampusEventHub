import { Link } from "react-router-dom";

const StatCard = ({
  icon,
  title,
  value,
  color,
  to
}) => {

  const card = (

    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-xl
        hover:scale-105
        transition
        duration-300
        p-5
        flex
        items-center
        gap-4
        cursor-pointer
      "
    >

      <div className={`text-3xl ${color}`}>
        {icon}
      </div>

      <div>

        <h3 className="text-gray-500 text-sm">
          {title}
        </h3>

        <p className="text-2xl font-bold">
          {value}
        </p>

      </div>

    </div>

  );

  if (to) {
    return (
      <Link to={to}>
        {card}
      </Link>
    );
  }

  return card;

};

export default StatCard;