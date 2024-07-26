import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import store from '../../store'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {

  const dispatch = useDispatch()

  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state) => state.user)
  const isLoadingAddress = addressStatus === 'loading'


  const navigation = useNavigation() 
  const isSubmitting = navigation.state === 'submitting'


  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  if (!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl fontsemibold mb-8">Ready to order? Lets go!</h2>
    
      <Form method="POST">
        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input w-full" type="text" defaultValue={username} name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow w-full">
          
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md ">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="flex flex-col w-full">
            <input className="input grow" 
            type="text" 
            name="address" 
            disabled={isLoadingAddress}
            defaultValue={address}
            required />
            {addressStatus === 'error' && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md ">{errorAddress}</p>}
          </div>

          {!position.latitude && !position.longitude && ( 
            <span className="absolute z-50 right-[3px] top-[35px] sm:right-[2px] sm:top-[3px] md:right-[5px] md:top-[5px]">
            <Button
            disabled={isLoadingAddress}
            type="small" onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress());
            } 
          }>Get position</Button>
          </span>
          )
}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
          className="h-6 w-6 accent-yellow-400 
          focus:outline-none focus:ring
          focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
        <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
        <input type="hidden" name='position' value={ position.longitude && position.latitude ?`${position.latitude}, ${position.longitude}` : ''}/>
        <div>
          <Button type="primary"
          disabled={isSubmitting || isLoadingAddress}> 
          {isSubmitting ? 'Placing order...' : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority,
  }

  console.log(order)

  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'Please give us your correct phone number, We might need to contact you.'
  
  if (Object.keys(errors).length > 0) return errors
  

  // If everything is okay, create new order and redirect.
  const newOrder = await createOrder(order);

  // Calling directly on the store. // DO NOT overuse
  store.dispatch(clearCart())

  console.log(order)

  return redirect(`/order/${newOrder.id}`)

}

export default CreateOrder;
