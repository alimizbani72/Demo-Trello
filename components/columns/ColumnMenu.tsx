'use client'
import useBoardStore from '@/lib/store'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'

interface ColumnMenuProps {
  columnId: string
}

export default function ColumnMenu({ columnId }: ColumnMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const removeColumn = useBoardStore(state => state.removeColumn)
  const removeAllCards = useBoardStore(state => state.removeAllCards)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteList = () => {
    removeColumn(columnId)
    handleClose()
  }

  const handleDeleteAllCards = () => {
    removeAllCards(columnId)
    handleClose()
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ ml: 1 }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
         slotProps={{
    paper: {
      sx: { width: 270, p: 0 }
    }
  }}
       
      >
<Box sx={{ position: 'relative', px: 4, py: 1 }}>
  <Typography
    variant="subtitle2"
    sx={{
      fontWeight: 400,
      color: "#6B778C",
      textAlign: 'center',
      display: 'block',
    }}
  >
    List Actions
  </Typography>
  <IconButton
    size="small"
    onClick={handleClose}
    sx={{
      position: 'absolute',
      right: 8,
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  >
    x
  </IconButton>
</Box>
        <Divider />
        <MenuItem onClick={handleDeleteList}>Delete list</MenuItem>
        <MenuItem onClick={handleDeleteAllCards} color='black'>Delete all cards</MenuItem>
      </Menu>
    </>
  )
}
