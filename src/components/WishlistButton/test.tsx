import { WishlistContextDefaultValues } from 'hooks/use-wishlist'
import { render, screen } from 'utils/test-utils'
import WishlistButton from '.'

describe('<WishlistButton />', () => {
  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })
})
