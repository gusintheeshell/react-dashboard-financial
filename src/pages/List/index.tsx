import React, { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { uuid } from "uuidv4"
import ContentHeader from "@/components/ContentHeader"
import HistoryFinanceCard from "@/components/HistoryFinanceCard"
import SelectInput from "@/components/SelectInput"

import { Container, Content, Filters } from "./styles"

import gains from "@/repositories/gains"
import expenses from "@/repositories/expenses"

import formatCurrency from "@/utils/formatCurrency"
import formatDate from "@/utils/formatDate"
import listOfMonths from "@/utils/months"

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
  const [monthSelected, setMonthSelected] = useState<string>("")
  const [yearSelected, setYearSelected] = useState<string>("")

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

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    })
  }, [])

  const years = useMemo(() => {
    let uniqueYears: number[] = []

    listData.forEach((item) => {
      const date = new Date(item.date)
      const year = date.getFullYear()

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    })

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      }
    })
  }, [listData])

  useEffect(() => {
    const filteredData = listData.filter((item) => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())

      return month === monthSelected && year === yearSelected
    })

    const formattedDate = filteredData.map((item) => {
      return {
        id: uuid(),
        description: item.description,
        formattedAmount: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        formattedDate: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E66C4E",
      }
    })

    setData(formattedDate)
  }, [listData, monthSelected, yearSelected, data.length])

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => {
            setYearSelected(e.target.value)
            console.log(e.target.value)
          }}
          defaultValue={yearSelected}
        />
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
