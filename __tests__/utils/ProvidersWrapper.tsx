import { NextComponentType, NextPageContext } from "next"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { NextRouter } from "next/router"
import App from "../../src/pages/_app"

type Props = {
  Component: NextComponentType<NextPageContext, any, any>
  pageProps?: any
  routerProps?: Partial<NextRouter & { path: string }>
}

const ProvidersWrapper = ({
  Component,
  pageProps = {},
  routerProps = {},
}: Props) => {
  const router = {
    query: {},
    components: {},
    isFallback: false,
    basePath: "",
    events: { emit: vi.fn(), off: vi.fn(), on: vi.fn() },
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    asPath: routerProps?.path || "/",
    pathname: routerProps?.path || "/",
    route: routerProps?.path || "/",
    ...routerProps,
  } as NextRouter

  return (
    <RouterContext.Provider value={router}>
      <App router={undefined} Component={Component} pageProps={pageProps} />
    </RouterContext.Provider>
  )
}

export default ProvidersWrapper
