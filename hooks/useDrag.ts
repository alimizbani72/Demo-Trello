'use client'

import useBoardStore from '@/lib/store'
import { Card } from '@/types'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import React from 'react'

export default function useBoardDrag() {
  const { columns, setColumns } = useBoardStore()
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [activeCard, setActiveCard] = React.useState<Card & { columnId: string } | null>(null)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)

    if (event.active.data.current?.type === 'CARD') {
      const { columnId } = event.active.data.current as { type: 'CARD'; columnId: string }
      const col = columns.find(c => c.id === columnId)
      const card = col?.cards.find(cd => cd.id === event.active.id)
      if (card) setActiveCard({ ...card, columnId })
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    setActiveCard(null)
    if (!over) return

    // Reorder columns
    if (active.data.current?.type === 'COLUMN' && over.data.current?.type === 'COLUMN') {
      const oldIndex = columns.findIndex(c => c.id === active.id)
      const newIndex = columns.findIndex(c => c.id === over.id)
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setColumns(arrayMove(columns, oldIndex, newIndex))
      }
      return
    }

    // Move cards
    if (active.data.current?.type === 'CARD' && over.data.current) {
      const { columnId: fromColumnId } = active.data.current
      const { columnId: toColumnId } = over.data.current
      const cardId = active.id as string

      if (over.data.current.type === 'COLUMN') {
        useBoardStore.getState().moveCard(fromColumnId, toColumnId, cardId)
        return
      }

      if (over.data.current.type === 'CARD') {
        const toCardId = over.id as string
        const destColumn = columns.find(c => c.id === toColumnId)
        const destIndex = destColumn ? destColumn.cards.findIndex(cd => cd.id === toCardId) : -1
        useBoardStore.getState().moveCard(fromColumnId, toColumnId, cardId, destIndex)
        return
      }
    }
  }

  return {
    columns,
    activeId,
    activeCard,
    handleDragStart,
    handleDragEnd,
  }
}