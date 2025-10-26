'use client'
import { Card } from "@/types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Box } from "@mui/material"
import CardItem from "../card/CardItem"

interface ColumnCardsProps {
  cards: Card[]
  columnId: string
}

export default function ColumnCards({ cards, columnId }: ColumnCardsProps) {
  return (
    <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {cards.map(c => (
          <CardItem key={c.id} card={c} columnId={columnId} />
        ))}
      </Box>
    </SortableContext>
  )
}