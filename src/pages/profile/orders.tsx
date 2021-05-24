import Profile from 'templates/Profile'

import ordersMock from 'components/OrdersList/mock'
import OrdersList, { OrdersListProps } from 'components/OrdersList'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'

export default function OrdersPage({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      items: ordersMock,
      session
    }
  }
}
