import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export default function AddClient() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Title>Add New Client</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name')} placeholder="Client Name" />
        <Input {...register('email')} placeholder="Email" type="email" />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
