'use client'
import useBoardStore from '@/lib/store'
import { Card } from '@/types'
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { useState } from 'react'

interface CardModalProps {
  open: boolean
  onClose: () => void
  columnId: string
  card: Card
}

export default function CardModal({ open, onClose, columnId, card }: CardModalProps) {
  const [comment, setComment] = useState('')
  const addComment = useBoardStore(state => state.addComment)

  const handleAddComment = () => {
    if (!comment.trim()) return
    addComment(columnId, card.id, comment.trim())
    setComment('')
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
     <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
       Comments for {`"${card.title}"`}
        <IconButton onClick={onClose} size={"small"}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent >
       
        <List>
         {card.comments && card.comments.length > 0 ? (
    card.comments.map(c => (
      <ListItem
        key={c.id}
        sx={{
          bgcolor: '#F4F5F7',
          borderRadius: 1,
          px: 3,
          py: 1.5,
          my: 2,
          alignItems: 'flex-start',
        }}
      >
        <ListItemText
          primary={
           
              <Typography component="span" variant="caption" color="text.secondary">
              You — {new Date(c.createdAt).toLocaleString()}
              </Typography>
            
          }
          secondary={
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {c.text}
            </Typography>
          }
        />
      </ListItem>
    ))
  ) : (
    <ListItem
      sx={{
        bgcolor: '#F4F5F7',
        borderRadius: 1,
        px: 3,
        py: 1.5,
        alignItems: 'flex-start',
      }}
    >
      <ListItemText
        primary={
          <Typography variant="body2" color="text.secondary">
            No comments yet. Be the first to comment!
          </Typography>
        }
      />
    </ListItem>
  )}
        </List>
        <TextField
          label="Write a Comment..."
          fullWidth
          multiline
          rows={2}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' , mt: 2}}>
            <Button
              sx={{
                backgroundColor: '#61bd4f', 
                textTransform: 'none',
                '&:hover': { backgroundColor: '#519839',  },
              }}
              variant="contained"
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </Box>
         
      </DialogContent>
    </Dialog>
  )
}