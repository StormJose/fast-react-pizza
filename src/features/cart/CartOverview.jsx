import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  // Good practice to write the logic right in the useSelector
  const totalCartPrice = useSelector(state => getTotalCartPrice(state)) // Good practice 
  const totalCartQuantity = useSelector((state) => getTotalCartQuantity(state))

  if (!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 text-sm uppercase px-4 py-4 sm:px-6 md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
