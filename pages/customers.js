import { useState } from 'react';
import ClientsTable from '../components/ClientsTable';
import AddClientModal from '../components/AddClientModal';
import styled from 'styled-components';

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

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      nationality: "USA",
      recommendedBy: "Mike",
      folios: [
        { id: 1, number: "F001", description: "Purchase of flight tickets to NYC", responsible: "Alice" },
        { id: 2, number: "F002", description: "Hotel booking in Manhattan", responsible: "Bob" },
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      nationality: "Canada",
      recommendedBy: "Sarah",
      folios: [
        { id: 1, number: "F003", description: "Purchase of cruise tickets", responsible: "Charlie" },
      ]
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      nationality: "UK",
      recommendedBy: "Tom",
      folios: []
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    recommendedBy: "",
    folios: []
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [isFolioModalOpen, setIsFolioModalOpen] = useState(false);
  const [newFolio, setNewFolio] = useState({
    number: "",
    description: "",
    responsible: ""
  });

  const handleInputChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClient = () => {
    setClients([...clients, { id: clients.length + 1, ...newClient }]);
    setIsModalOpen(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      nationality: "",
      recommendedBy: "",
      folios: []
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowSideBar(true);
  };

  const handleCloseSideBar = () => {
    setShowSideBar(false);
  };

  const handleFolioInputChange = (e) => {
    setNewFolio({
      ...newFolio,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFolio = () => {
    setSelectedClient(prevClient => ({
      ...prevClient,
      folios: [
        ...prevClient.folios,
        { id: prevClient.folios.length + 1, ...newFolio }
      ]
    }));
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === selectedClient.id
          ? { ...selectedClient, folios: [...selectedClient.folios, { id: selectedClient.folios.length + 1, ...newFolio }] }
          : client
      )
    );
    setIsFolioModalOpen(false);
    setNewFolio({
      number: "",
      description: "",
      responsible: ""
    });
  };

  return (
    <Container>
      <Header>
        <Title>Clients</Title>
        <ButtonStyled onClick={() => setIsModalOpen(true)}>Add Client</ButtonStyled>
      </Header>
      <SearchInput
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ClientsTable clients={filteredClients} onClientClick={handleClientClick} />

      <Overlay show={showSideBar} onClick={handleCloseSideBar} />

      <SideBarRight show={showSideBar}>
        {selectedClient && (
          <>
            <SideBarHeader>
              <h3>{selectedClient.name}'s Details</h3>
              <CloseButton onClick={handleCloseSideBar}>&times;</CloseButton>
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
            <AddFolioButton onClick={() => setIsFolioModalOpen(true)}>Add Folio</AddFolioButton>
          </>
        )}
      </SideBarRight>

      {isFolioModalOpen && (
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
            <ButtonStyled onClick={handleAddFolio}>Save Folio</ButtonStyled>
            <ButtonStyled onClick={() => setIsFolioModalOpen(false)} style={{ marginLeft: '1rem', backgroundColor: 'gray' }}>Cancel</ButtonStyled>
          </ModalFooter>
        </FolioModalStyled>
      )}

      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        clientData={newClient}
        onChange={handleInputChange}
      />
    </Container>
  );
}
