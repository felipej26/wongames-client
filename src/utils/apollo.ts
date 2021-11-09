import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useMemo } from 'react'
import apolloCache from './apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createApolloClient(session?: any) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  })

  const authLink = setContext((_, { headers, session: clientSession }) => {
    const jwt = session?.jwt || clientSession?.jwt || ''
    const authorization = jwt ? `Bearer ${jwt}` : ''
    return { headers: { ...headers, authorization } }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: apolloCache
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initializeApollo(initialState = null, session?: any) {
  const apolloClientGlobal = apolloClient ?? createApolloClient(session)

  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return apolloClientGlobal

  apolloClient = apolloClient ?? apolloClientGlobal
  return apolloClient
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(initialState = null, session?: any) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  )
  return store
}
