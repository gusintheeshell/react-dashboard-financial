import ContentHeader from "@/components/ContentHeader"
import SelectInput from "@/components/SelectInput"
import React from "react"

import { Container } from "./styles"

const List: React.FC = () => {
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#fff">
        <SelectInput options={[]} />
      </ContentHeader>
    </Container>
  )
}

export default List
