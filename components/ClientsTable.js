import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 0.375rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: var(--table-header-bg, #f7fafc);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--table-row-even-bg, #f7fafc);
  }
  cursor: pointer;
`;

const TableHead = styled.th`
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 0.75rem;
  border-top: 1px solid var(--border-color, #e2e8f0);
`;

export default function ClientsTable({ clients, onClientClick }) {
  if (clients.length === 0) {
    return <p>No clients available.</p>;
  }

  return (
    <TableContainer>
      <TableStyled>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Recommended By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} onClick={() => onClientClick(client)}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.nationality}</TableCell>
              <TableCell>{client.recommendedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
}
