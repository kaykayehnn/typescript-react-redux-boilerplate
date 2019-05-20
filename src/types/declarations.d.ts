declare module '*.scss' {
  interface ClassNames {
    [className: string]: string
  }

  const classNames: ClassNames
  export default classNames
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >

  const src: string
  export default src
}
