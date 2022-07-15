import React from "react"

import ContentHeader from "@/components/ContentHeader"

import { Container } from "./styles"
import SelectInput from "@/components/SelectInput"

const Dashboard: React.FC = () => {
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#fff">
        <SelectInput options={[]} onChange={() => {}} />
      </ContentHeader>
    </Container>
  )
}

export default Dashboard
