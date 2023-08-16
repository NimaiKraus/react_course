import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useOrdersServices } from "@/services/orders";

import { Error, Spinner } from "@/components";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";

const CMSOrders = () => {
  const { actions, state } = useOrdersServices();

  useEffect(() => {
    actions.getOrdersList();
  }, []);
  return (
    <div className="mt-12">
      <h1 className="title">
        CMS
      </h1>

      <p className="text-3xl">Pagina ordini</p>

      <hr className='my-8' />

      {state.pending && <div><Spinner /></div>}
      {state.error && <div><Error errorMessage={state.error} /></div>}

      <table className="table-auto w-full hover">
        <thead>
          <tr>
            <td className='font-bold text-xl'>Cliente / Data</td>
            <td className='font-bold text-xl text-center'>Info ordine</td>
            <td className='font-bold text-xl text-center'>Cambia stato</td>
            <td className='font-bold text-xl text-end'>Elimina</td>
          </tr>
        </thead>

        <tbody>
          {state.orders.map(order => (
            <tr
              key={order.id}
              className="h-24"
            // className={clsx(
            //     'cursor-pointer',
            //     { 'bg-sky-300 text-slate-800 pointer-events-none': order.id === activeProduct?.id }
            // )}
            // onClick={() => onProductClick(order)}
            >
              <td className='font-semibold'>
                <div>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {order.user.name}
                </div>
                <div>
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  {new Date(order.created).toDateString()}
                </div>
              </td>
              <td className="text-center font-semibold">
                <div>Totale: € {order.total}</div>
                <div>{order.order.length} prodotti.</div>
              </td>
              <td className="text-center font-semibold">
                {
                  order.status === 'pending'
                    ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.updateOrderStatus(order.id, 'done')
                        }}
                        className="btn primary animated-button"
                      >
                        Imposta ordine come evaso
                      </button>
                    )
                    : <p>Ordine già evaso</p>
                }
              </td>
              <td className='text-end'>
                <FontAwesomeIcon
                  className="pr-6 cursor-pointer"
                  icon={faTrash}
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.deleteOrder(order.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CMSOrders