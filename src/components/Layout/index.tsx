import React, { PropsWithChildren } from "react"

import { Grid } from "./styles"

import MainHeader from "../MainHeader"
import Aside from "../Aside"
import Content from "../Content"
import { AuxProps } from "@/interfaces/AuxProps.interface"

const Layout: React.FC<PropsWithChildren<AuxProps>> = ({ children }) => {
  return (
    <Grid>
      <MainHeader />
      <Aside />
      <Content>{children}</Content>
    </Grid>
  )
}

export default Layout
