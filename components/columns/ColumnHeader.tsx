'use client'
import { Box, TextField, Typography } from "@mui/material"
import { useState } from "react"
import ColumnMenu from "./ColumnMenu"

interface ColumnHeaderProps {
  title: string
  columnId: string
  onUpdateTitle: (newTitle: string) => void
}

export default function ColumnHeader({ title, columnId, onUpdateTitle }: ColumnHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempTitle, setTempTitle] = useState(title)

  const saveTitle = () => {
    if (tempTitle.trim()) {
      onUpdateTitle(tempTitle.trim())
      setIsEditing(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {isEditing ? (
        <TextField
          value={tempTitle}
          onChange={e => setTempTitle(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={e => e.key === 'Enter' && saveTitle()}
          size="small"
          autoFocus
          fullWidth
        />
      ) : (
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => setIsEditing(true)}
        >
          {title}
        </Typography>
      )}
      <ColumnMenu columnId={columnId} />
    </Box>
  )
}