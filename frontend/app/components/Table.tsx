import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'

interface TableProps {
  children: ReactNode
}

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: ${colors.tHead};
    font-weight: 600;
    font-size: 0.7rem;
  }
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`

const Table: FC<TableProps> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>
}

export default Table
