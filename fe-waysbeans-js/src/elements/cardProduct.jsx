import { Link } from "react-router-dom";

const CardProduct = (props) => {
  return (
    <Link
      className="bg-white shadow-xl w-52 h-64 rounded-xl flex flex-col justify-between"
      to={`/detail-product/${props.id}`}
    >
      <div className="flex-1">
        <img
          src={props.image}
          alt="img-product"
          className="rounded-t-xl h-full"
        />
      </div>

      <div className="flex-1 px-2 mt-2">
        <div className="flex flex-col justify-start">
          <p>{props.name}</p>
          <p className="font-bold ">{props.price}</p>
          <p>Qty : {props.qty}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
