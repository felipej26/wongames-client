import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'

import { useCart } from 'hooks/use-cart'
import { createPaymentIntent } from 'utils/stripe/methods'
import Button from 'components/Button'
import Heading from 'components/Heading'

import * as S from './styles'
import { FormLoading } from 'components/Form'

export type PaymentFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const { push } = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length > 0) {
        const data = await createPaymentIntent({ items, token: session?.jwt })

        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        if (data.error) {
          setError(data.error)
          return
        } else {
          setFreeGames(false)
          setClientSecret(data.client_secret)
        }
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (freeGames) {
      push('/success')
      return
    }

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload?.error) {
      setError(`Payment failer ${payload?.error.message}`)
    } else {
      setError(null)
    }

    setLoading(false)
    push('/success')
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" lineBottom size="small">
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px'
                  }
                }
              }}
              onChange={handleChange}
            />
          )}

          {error && (
            <S.Error>
              <ErrorOutline size={20} /> {error}
            </S.Error>
          )}
        </S.Body>

        <S.Footer>
          <Button as="a" fullWidth minimal>
            Continue shopping
          </Button>

          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
