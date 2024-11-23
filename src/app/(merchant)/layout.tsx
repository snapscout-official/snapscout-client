import { type ReactElement } from "react"

export default function layout({ children }: { children: React.ReactNode }): ReactElement {
  return <div>{children}</div>
}
