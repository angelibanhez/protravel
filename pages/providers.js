import Link from 'next/link';
import { Box, Title, Button } from '../components/StyledComponents';

export default function Providers() {
  return (
    <Box>
      <Title>Manage Providers</Title>
      <Link href="/add-provider">
        <Button>Add New Provider</Button>
      </Link>
      {/* Aquí iría la lista de proveedores */}
    </Box>
  );
}
