'use client'
import useBoardStore from '@/lib/store'
import { Column as ColumnType, } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Paper } from '@mui/material'
import AddCard from './AddCard'
import ColumnHeader from './ColumnHeader'
import ColumnCards from './ColumnsCard'

interface ColumnProps {
  column: ColumnType
}

export default function Column({ column }: ColumnProps) {
  const { addCard, updateColumnTitle } = useBoardStore()
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
    data: { type: 'COLUMN' }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    minWidth: 300
  }

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{ p: 2, borderColor: "red", bgcolor: "#ceced0", flexDirection: 'column', maxHeight: 'auto' }}
      {...attributes}
      {...listeners}
    >
      <ColumnHeader
        title={column.title}
        columnId={column.id}
        onUpdateTitle={(newTitle) => updateColumnTitle(column.id, newTitle)}
      />

      <ColumnCards cards={column.cards} columnId={column.id} />

      <AddCard columnId={column.id} addCard={addCard} />
    </Paper>
  )
}