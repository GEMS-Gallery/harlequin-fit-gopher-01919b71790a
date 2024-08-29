import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import NewTaxPayerForm from './components/NewTaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerSearch from './components/TaxPayerSearch';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
};

function App() {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleNewTaxPayer = async (newTaxPayer: Omit<TaxPayer, 'tid'> & { tid: number }) => {
    try {
      const result = await backend.createTaxPayer(
        BigInt(newTaxPayer.tid),
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      if ('ok' in result) {
        fetchTaxPayers();
      } else {
        console.error('Error creating tax payer:', result.err);
      }
    } catch (error) {
      console.error('Error creating tax payer:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TaxPayer Management System
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <NewTaxPayerForm onSubmit={handleNewTaxPayer} />
          <TaxPayerSearch />
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <TaxPayerList taxPayers={taxPayers} />
        )}
      </Box>
    </Container>
  );
}

export default App;
