import Button from 'components/Button'
import { useWishlist } from 'hooks/use-wishlist'

import { Favorite, FavoriteBorder } from 'styled-icons/material-outlined'

type WishlistButtonProps = {
  id: string
}

const WishlistButton = ({ id }: WishlistButtonProps) => {
  const { isInWishlist } = useWishlist()

  return (
    <Button
      icon={
        isInWishlist(id) ? (
          <Favorite aria-label="Remove from Wishlist" />
        ) : (
          <FavoriteBorder aria-label="Add from Wishlist" />
        )
      }
    />
  )
}

export default WishlistButton
