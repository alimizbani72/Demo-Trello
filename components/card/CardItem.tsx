'use client'
import { Card } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import CardModal from './CardModal'

interface CardItemProps {
  card: Card
  columnId: string
}
export default function CardItem({ card, columnId }: CardItemProps) {

  const [open, setOpen] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: card.id,
    data: { type: 'CARD', columnId }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Number of comments
  const commentCount = card.comments?.length || 0

  return (
    <>
      <Paper
        ref={setNodeRef}
        style={style}
        sx={{ p: 1, mb: 1, cursor: 'pointer' }}
        elevation={1}
        onClick={() => setOpen(true)}
        {...attributes}
        {...listeners}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="subtitle1">{card.title}</Typography>
         
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pb: 1  }}>
      <Typography variant="caption" color="text.secondary" sx={{
          backgroundColor: '#DFE1E6', 
          px: 1, 
          py: 0.25, 
          borderRadius: 1, 
          fontSize: '0.75rem',
          fontWeight: 500,
        }}>
         {commentCount === 1 ? 'comment' : 'comments'}({commentCount})
      </Typography>
    </Box>
      </Paper>

      {open && <CardModal open={open} onClose={() => setOpen(false)} columnId={columnId} card={card} />}
    </>
  )
}
