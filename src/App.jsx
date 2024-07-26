import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from "./ui/Home"
import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Error from "./ui/Error"
import Cart from "./features/cart/Cart"
import User from"./features/user/CreateUser"
import Order, {loader as orderLoader} from "./features/order/Order"
import {action as updateOrderAction} from "./features/order/UpdateOrder"
import CreateOrder, {action as orderAction} from "./features/order/CreateOrder"
import AppLayout from './AppLayout'

const router = createBrowserRouter([
  {
    element:  <AppLayout/>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error/>
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error/>,
        action: updateOrderAction
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: orderAction
      },
      {
        path: '/user',
        element: <User />
      }
    ]
  }

])


function App() {

  return <RouterProvider router={router}/>
  
}

export default App
