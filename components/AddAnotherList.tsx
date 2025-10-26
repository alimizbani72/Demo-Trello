'use client'
import useBoardStore from '@/lib/store'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Paper, TextField } from '@mui/material'
import { useState } from 'react'

export default function AddAnotherList() {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const { addColumn } = useBoardStore()

  const handleAddColumn = () => {
    if (!title.trim()) return
    addColumn(title.trim())
    setTitle('')
    setAdding(false)
  }

  return (
    <Paper sx={{ minWidth: 300, }} elevation={1}>
      {!adding ? (
        <Box
          sx={{
            cursor: 'pointer',
            color: 'white',
            fontWeight: 500,
            p: 1,
            background: "#096faaff",
          }}
          onClick={() => setAdding(true)}
        >
          + Add another list
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 2 }}>
          <TextField
            placeholder="Enter list title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            fullWidth
            autoFocus
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" onClick={handleAddColumn} sx={{
    backgroundColor: '#5aac44', 
    '&:hover': {
      backgroundColor: '#519839',
    }
  }}>Add List</Button>
            <IconButton size="small" onClick={() => { setAdding(false); setTitle('') }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
