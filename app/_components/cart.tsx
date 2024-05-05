import { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import { CartItem } from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../_helpers/price'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'

export function Cart() {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext)

  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator className="h-[0.5px] bg-muted" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrency(totalDiscounts)}</span>
                </div>

                <Separator className="h-[0.5px] bg-muted" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products?.[0]?.restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Grátis</span>
                  ) : (
                    formatCurrency(
                      Number(products?.[0]?.restaurant.deliveryFee),
                    )
                  )}
                </div>

                <Separator className="h-[0.5px] bg-muted" />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h2 className="text-center font-medium">Sua sacola está vazia.</h2>
      )}
    </div>
  )
}
