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
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  )
  let fullYear = new Date().getFullYear()
  const [yearSelected, setYearSelected] = useState<number>(0)
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
    "recorrente",
    "eventual",
  ])

  const { type } = useParams()

  const pageData = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4E41F0",
          data: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#E44C4E",
          data: expenses,
        }
  }, [type])

  const years = useMemo(() => {
    let uniqueYears: number[] = []

    const { data } = pageData

    data.forEach((item) => {
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
  }, [pageData])

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    })
  }, [])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    )

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      )
      setFrequencyFilterSelected(filtered)
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency])
    }
  }

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month)
      setMonthSelected(parseMonth)
    } catch {
      throw new RangeError("invalid month value. Is accept 0 - 24.")
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year)
      setYearSelected(parseYear)
    } catch {
      throw new RangeError("invalid year value. Is accept integer numbers.")
    }
  }

  useEffect(() => {
    const { data } = pageData

    const filteredData = data.filter((item) => {
      const date = new Date(item.date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return (
        month === monthSelected && year === yearSelected
        // && frequencyFilterSelected.includes(item.frequency)
      )
    })

    const formattedData = filteredData.map((item) => {
      return {
        id: uuid(),
        description: item.description,
        formattedAmount: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        formattedDate: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
      }
    })

    setData(formattedData)
  }, [
    pageData,
    monthSelected,
    yearSelected,
    data.length,
    frequencyFilterSelected,
  ])

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className={`
                    tag-filter 
                    tag-filter-recurrent
                    ${
                      frequencyFilterSelected.includes("recorrente") &&
                      "tag-actived"
                    }`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`
                    tag-filter 
                    tag-filter-eventual
                    ${
                      frequencyFilterSelected.includes("eventual") &&
                      "tag-actived"
                    }`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
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
