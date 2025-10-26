'use client'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, TextField } from "@mui/material"
import { useState } from "react"

interface ColumnAddCardProps {
  columnId: string
  addCard: (columnId: string, title: string) => void
}

export default function AddCard({ columnId, addCard }: ColumnAddCardProps) {
  const [addingCard, setAddingCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return
    addCard(columnId, newCardTitle.trim())
    setNewCardTitle('')
    setAddingCard(false)
  }

  return (
    <Box sx={{ mt: 2 }}>
      {!addingCard ? (
        <Button
          fullWidth
          variant="text"
          onClick={() => setAddingCard(true)}
          sx={{ justifyContent: 'flex-start', textTransform: 'none', color: "#6B778C" }}
        >
          + Add another card
        </Button>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <TextField
            multiline
            minRows={3}
            size="small"
            placeholder="Enter card title"
            value={newCardTitle}
            onChange={e => setNewCardTitle(e.target.value)}
            autoFocus
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#5aac44',
                textTransform: "none",
                '&:hover': { backgroundColor: '#519839' }
              }}
              onClick={handleAddCard}
            >
              Create Card
            </Button>
            <IconButton onClick={() => { setAddingCard(false); setNewCardTitle('') }} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}