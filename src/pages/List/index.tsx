import React, { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import ContentHeader from "@/components/ContentHeader"
import HistoryFinanceCard from "@/components/HistoryFinanceCard"
import SelectInput from "@/components/SelectInput"

import { Container, Content, Filters } from "./styles"

import gains from "@/repositories/gains"
import expenses from "@/repositories/expenses"

import formatCurrency from "@/utils/formatCurrency"
import formatDate from "@/utils/formatDate"

interface IData {
  id: string
  description: string
  formattedAmount: string
  frequency: string
  formattedDate: string
  tagColor: string
}

const List: React.FC = () => {
  const [data, setData] = useState<Array<IData>>([])
  const { type } = useParams()

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses
  }, [type])

  const title = useMemo(() => {
    return type === "entry-balance" ? "Entrada" : "Saídas"
  }, [type])

  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#F7931B" : "#E44C4E"
  }, [type])

  const months = [
    {
      value: 7,
      label: "Julho",
    },
    {
      value: 8,
      label: "Agosto",
    },
    {
      value: 9,
      label: "Setembro",
    },
  ]

  const years = [
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
  ]

  useEffect(() => {
    const response = listData.map(
      ({ description, frequency, amount, date, type }) => {
        return {
          id: String(Math.random() * data.length),
          description,
          formattedAmount: formatCurrency(Number(amount)),
          frequency,
          formattedDate: formatDate(date),
          tagColor: frequency === "recorrente" ? "#4E41F0" : "#E66C4E",
        }
      }
    )

    setData(response)
  }, [type])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button className="tag-filter tag-filter-recurrent">Recorrentes</button>
        <button className="tag-filter tag-filter-eventual">Eventuais</button>
      </Filters>

      <Content>
        {data.map((value) => (
          <HistoryFinanceCard
            key={value.id}
            tagColor={value.tagColor}
            title={value.description}
            subtitle={value.formattedDate}
            amount={value.formattedAmount}
          />
        ))}
      </Content>
    </Container>
  )
}

export default List
