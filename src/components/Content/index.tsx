import React, { PropsWithChildren } from "react"

import { Container } from "./styles"
import { AuxProps } from "@/interfaces/AuxProps.interface"

const Content: React.FC<PropsWithChildren<AuxProps>> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  )
}

export default Content
