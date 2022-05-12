import { RouterContext } from "next/dist/shared/lib/router-context"
import { NextRouter } from "next/router"
import { vi } from "vitest"

const getMockRouter = (props?: Partial<NextRouter & { path: string }>) => {
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
    asPath: props?.path || "/",
    pathname: props?.path || "/",
    route: props?.path || "/",
    ...props,
  } as NextRouter

  return {
    router,
    RouterProvider: ({ children }) => (
      <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
    ),
  }
}

export default getMockRouter
