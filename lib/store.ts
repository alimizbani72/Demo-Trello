import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --------------------
// Types
// --------------------

export type Card = { id: string; title: string; comments?: Comment[] }
export type Column = { id: string; title: string; cards: Card[] }

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
}

// --------------------
// Zustand State Type
// --------------------
type State = {
  columns: Column[],                             
  setColumns: (cols: Column[]) => void,         
  addColumn: (title: string) => void,            
  removeColumn: (id: string) => void,            
  addCard: (columnId: string, title: string) => void, 
  removeCard: (columnId: string, cardId: string) => void, 
  moveCard: (fromCol: string, toCol: string, cardId: string, index?: number) => void, 
  addComment: (columnId: string, cardId: string, text: string) => void, 
  removeAllCards: (columnId: string) => void,    // Clear all cards in a column
  updateColumnTitle: (columnId: string, title: string) => void 
}

// --------------------
// Initial Columns
// --------------------
const initial: Column[] = [
  { id: 'col-1', title: 'To Do', cards: [{ id: 'card-1', title: 'Buy milk' }, { id: 'card-4', title: 'Write docs' }] },
  { id: 'col-2', title: 'In Progress', cards: [{ id: 'card-2', title: 'Build feature' }] },
  { id: 'col-3', title: 'Done', cards: [{ id: 'card-3', title: 'Fix bug' }] },
]

// --------------------
// Zustand Store
// --------------------
const useBoardStore = create<State>()(
  persist(
    (set, get) => ({
      // Current state of columns
      columns: initial,

      // --------------------
      // Column management
      // --------------------
      setColumns: (cols) => set({ columns: cols }), // Replace all columns
      addColumn: (title) => set((s) => ({ 
        columns: [...s.columns, { id: nanoid(), title, cards: [] }] 
      })),
      removeColumn: (id) => set((s) => ({ 
        columns: s.columns.filter(c => c.id !== id) 
      })),
      updateColumnTitle: (columnId, title) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId ? { ...col, title } : col
          ),
        })),
      removeAllCards: (columnId) => set((s) => ({
        columns: s.columns.map(c => c.id === columnId ? { ...c, cards: [] } : c)
      })),

      // --------------------
      // Card management
      // --------------------
      addCard(columnId: string, title: string) {
        set((s) => ({
          columns: s.columns.map(c =>
            c.id === columnId
              ? { ...c, cards: [...c.cards, { id: nanoid(), title, comments: [] }] }
              : c
          )
        }))
      },
      removeCard: (columnId, cardId) => set((s) => ({ 
        columns: s.columns.map(c => 
          c.id === columnId ? { ...c, cards: c.cards.filter(card => card.id !== cardId) } : c
        ) 
      })),

      // Move a card within same column or between columns
      moveCard: (fromCol, toCol, cardId, index) => set((s) => {
        if (fromCol === toCol) {
          // Reorder inside same column
          const col = s.columns.find(c => c.id === fromCol)
          if (!col) return { columns: s.columns }
          const oldIndex = col.cards.findIndex(cd => cd.id === cardId)
          if (oldIndex === -1) return { columns: s.columns }
          const newIndex = typeof index === 'number' ? index : col.cards.length - 1
          const newCards = [...col.cards]
          newCards.splice(oldIndex, 1)
          newCards.splice(newIndex, 0, col.cards[oldIndex])
          return { columns: s.columns.map(c => c.id === col.id ? { ...c, cards: newCards } : c) }
        }

        // Moving between different columns
        const from = s.columns.find(c => c.id === fromCol)
        const to = s.columns.find(c => c.id === toCol)
        if (!from || !to) return { columns: s.columns }
        const card = from.cards.find(cd => cd.id === cardId)
        if (!card) return { columns: s.columns }
        const newFromCards = from.cards.filter(c => c.id !== cardId)
        const newToCards = [...to.cards]
        if (typeof index === 'number' && index >= 0) newToCards.splice(index, 0, card)
        else newToCards.push(card)
        return { columns: s.columns.map(c => {
          if (c.id === fromCol) return { ...c, cards: newFromCards }
          if (c.id === toCol) return { ...c, cards: newToCards }
          return c
        }) }
      }),

      // --------------------
      // Comment management
      // --------------------
      addComment(columnId: string, cardId: string, text: string) {
        set((s) => ({
          columns: s.columns.map(c => {
            if (c.id !== columnId) return c
            return {
              ...c,
              cards: c.cards.map(cd =>
                cd.id === cardId
                  ? { ...cd, comments: [...(cd.comments || []), { id: nanoid(), text, createdAt: new Date().toISOString() }] }
                  : cd
              )
            }
          })
        }))
      },
    }),
    { name: 'trello-clone-storage' } // Persist state in localStorage
  )
)

export default useBoardStore
