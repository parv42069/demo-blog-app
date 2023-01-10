import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
