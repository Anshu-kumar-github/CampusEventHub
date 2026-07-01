// import { Link } from "react-router-dom";

// const StatCard = ({
//   icon,
//   title,
//   value,
//   color,
//   to
// }) => {

//   // const card = (

//   //   <div
//   //     className="
//   //       bg-white
//   //       rounded-xl
//   //       shadow-md
//   //       hover:shadow-xl
//   //       hover:scale-105
//   //       transition
//   //       duration-300
//   //       p-5
//   //       flex
//   //       items-center
//   //       gap-4
//   //       cursor-pointer
//   //     "
//   //   >

//   //     <div className={`text-3xl ${color}`}>
//   //       {icon}
//   //     </div>

//   //     <div>

//   //       <h3 className="text-gray-500 text-sm">
//   //         {title}
//   //       </h3>

//   //       <p className="text-2xl font-bold">
//   //         {value}
//   //       </p>

//   //     </div>

//   //   </div>

//   // );
//   const card = (

//   <div
//     className="
//       bg-white
//       rounded-2xl
//       shadow-md
//       hover:shadow-xl
//       hover:-translate-y-1
//       transition-all
//       duration-300
//       p-6
//       flex
//       items-center
//       gap-5
//       cursor-pointer
//     "
//   >

//     <div
//       className={`
//         w-14
//         h-14
//         rounded-xl
//         flex
//         items-center
//         justify-center
//         text-2xl
//         bg-gray-100
//         ${color}
//       `}
//     >
//       {icon}
//     </div>

//     <div>

//       <p className="text-sm text-gray-500">
//         {title}
//       </p>

//       <h2 className="text-3xl font-bold mt-1">
//         {value}
//       </h2>

//     </div>

//   </div>

// );

//   if (to) {
//     return (
//       <Link to={to}>
//         {card}
//       </Link>
//     );
//   }

//   return card;

// };

// export default StatCard;

import { Link } from "react-router-dom";

const StatCard = ({
  icon,
  title,
  value,
  color,
  to,
  subtitle
}) => {

  const card = (

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
        cursor-pointer
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

          {subtitle && (

            <p className="text-gray-400 text-sm mt-2">
              {subtitle}
            </p>

          )}

        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-3xl
            bg-gray-100
            ${color}
          `}
        >

          {icon}

        </div>

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