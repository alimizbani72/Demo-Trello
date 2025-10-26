'use client'
import useBoardDrag from '@/hooks/useDrag'
import {
    closestCenter,
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import AddAnotherList from './AddAnotherList'
import CardItem from './card/CardItem'
import Column from './columns/Column'

export default function Board() {
  const { columns, activeCard, handleDragStart, handleDragEnd } = useBoardDrag()

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={columns.map(c => c.id)} strategy={horizontalListSortingStrategy}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, alignItems: 'flex-start', height: "100vh" }}>
          {columns.map(col => (
            <Column key={col.id} column={col} />
          ))}
          <AddAnotherList />
        </Box>
      </SortableContext>

      <DragOverlay>
        {activeCard ? <CardItem card={activeCard} columnId={activeCard.columnId || ''} /> : null}
      </DragOverlay>
    </DndContext>
  )
}