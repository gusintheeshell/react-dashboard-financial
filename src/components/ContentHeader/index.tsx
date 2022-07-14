import React from "react"

import { Container, Controllers, TitleContainer } from "./styles"

const ContentHeader: React.FC = () => {
  return (
    <Container>
      <TitleContainer>
        <h1>Título</h1>
      </TitleContainer>
      <Controllers>
        <button>Opa 1</button>
        <button>Opa 2</button>
      </Controllers>
    </Container>
  )
}

export default ContentHeader
