"use client";

import { Box, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Board = dynamic(() => import('@/components/Board'), { ssr: false })

export default function Home() {
  return (
<Container maxWidth={false} sx={{ mt: 3 }}>
<Typography variant="h6" sx={{ flexGrow: 1, color: "white", py: 4}}>Demo Board</Typography>
<Box>
<Board />
</Box>
</Container>

)
}