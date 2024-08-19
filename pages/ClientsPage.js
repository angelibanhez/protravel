import { useState } from 'react';
import ClientsTable from '../components/ClientsTable';
import AddClientModal from '../components/AddClientModal';
import { notifyError, notifySuccess } from '../components/NotificationModal';
import fetchers from '@/lib/fetchers';
import useSWR from 'swr';
import _ from 'lodash'
import styled from 'styled-components';
import useBool from '@/hooks/useBool';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonStyled = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color, #0070f3);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-hover, #005bb5);
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Overlay = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SideBarRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: white;
  padding: 2rem;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FolioList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FolioItem = styled.li`
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
`;

const AddFolioButton = styled(ButtonStyled)`
  margin-top: 1rem;
  width: 100%;
`;

const FolioModalStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`;

const ModalInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const ModalTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const fetchClients = async () => {
  return fetchers.GET('/api/clients').catch((err) => {
    notifyError(err?.message)
  })
}

// Main ClientsPage component
export default function ClientsPage() {
  // State management
  const {
    data: clients = [], mutate: setClients
  } = useSWR('clients', fetchClients)

  const [searchQuery, setSearchQuery] = useState('');
  const addModalState = useBool(false)
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    recommendedBy: "",
    folios: []
  });
  const [selectedClientId, setSelectedClientId] = useState(null);
  const selectedClient = _.find(clients, {id: selectedClientId})

  const sideBarState = useBool(false)
  const folioModalState = useBool(false)
  const [newFolio, setNewFolio] = useState({
    number: "",
    description: "",
    responsible: ""
  });

  // Handle input changes for new client
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prevState => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  // Save new client to the database
  const handleSaveClient = async () => {
    if (!newClient.name || !newClient.email || !newClient.phone || !newClient.nationality || !newClient.recommendedBy) {
      notifyError('All fields are required')
      return;
    }
  
    const client = await fetchers.POST('/api/clients', newClient)
      .catch((err) => {
        notifyError(`Error adding client: ${err.message}`)
      })

    setClients([...clients, client], {
      revalidate: false
    });

    // Clear the input fields
    setNewClient({
      name: "",
      email: "",
      phone: "",
      nationality: "",
      recommendedBy: "",
      folios: []
    });

    addModalState.close()
    notifySuccess('Client added successfully!')
  };
  

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle client click to open sidebar
  const handleClientClick = (client) => {
    setSelectedClientId(client.id);
    sideBarState.open()
  };

  // Handle folio input change
  const handleFolioInputChange = (e) => {
    const { name, value } = e.target;
    setNewFolio(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add new folio to the selected client
  const handleAddFolio = () => {
    const updatedClient = {
      ...selectedClient,
      folios: [...selectedClient.folios, { id: selectedClient.folios.length + 1, ...newFolio }],
    };

    setClients(clients.map(client => client.id === selectedClient.id ? updatedClient : client));
    folioModalState.close()
    setNewFolio({ number: "", description: "", responsible: "" });
  };

  return (
    <Container>
      <Header>
        <Title>Clients</Title>
        <ButtonStyled onClick={addModalState.open}>
          Add Client
        </ButtonStyled>
      </Header>
      <SearchInput
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ClientsTable clients={filteredClients} onClientClick={handleClientClick} />

      <Overlay show={sideBarState.value} onClick={sideBarState.close} />

      <SideBarRight show={sideBarState.value}>
        {selectedClient && (
          <>
            <SideBarHeader>
              <h3>{selectedClient.name}'s Details</h3>
              <CloseButton onClick={sideBarState.close}>&times;</CloseButton>
            </SideBarHeader>
            <p>Email: {selectedClient.email}</p>
            <p>Phone: {selectedClient.phone}</p>
            <p>Nationality: {selectedClient.nationality}</p>
            <p>Recommended By: {selectedClient.recommendedBy}</p>
            <h4>Folios:</h4>
            <FolioList>
              {selectedClient.folios.length > 0 ? (
                selectedClient.folios.map(folio => (
                  <FolioItem key={folio.id}>
                    <strong>Folio #{folio.number}</strong>: {folio.description} (Responsible: {folio.responsible})
                  </FolioItem>
                ))
              ) : (
                <p>No folios available for this client.</p>
              )}
            </FolioList>
            <AddFolioButton onClick={folioModalState.open}>
              Add Folio
            </AddFolioButton>
          </>
        )}
      </SideBarRight>

      {folioModalState.value && (
        <FolioModalStyled>
          <h3>Add New Folio</h3>
          <ModalInput
            type="text"
            placeholder="Folio Number"
            name="number"
            value={newFolio.number}
            onChange={handleFolioInputChange}
          />
          <ModalTextArea
            placeholder="Description"
            name="description"
            value={newFolio.description}
            onChange={handleFolioInputChange}
            rows="3"
          />
          <ModalInput
            type="text"
            placeholder="Responsible Person"
            name="responsible"
            value={newFolio.responsible}
            onChange={handleFolioInputChange}
          />
          <ModalFooter>
            <ButtonStyled onClick={handleAddFolio}>
              Save Folio
            </ButtonStyled>
            <ButtonStyled onClick={folioModalState.close}
              style={{ marginLeft: '1rem', backgroundColor: 'gray' }}
            >
              Cancel
            </ButtonStyled>
          </ModalFooter>
        </FolioModalStyled>
      )}
      <AddClientModal
        isOpen={addModalState.value}
        onClose={addModalState.close}
        onSave={handleSaveClient}
        clientData={newClient}
        onChange={handleInputChange}
      />
    </Container>
  );
}
