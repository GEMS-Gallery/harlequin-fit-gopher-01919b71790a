import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
};

const TaxPayerSearch: React.FC = () => {
  const [tid, setTid] = useState('');
  const [searchResult, setSearchResult] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const result = await backend.getTaxPayerByTID(BigInt(tid));
      if (result.length > 0) {
        setSearchResult(result[0]);
      } else {
        setError('No TaxPayer found with the given TID');
      }
    } catch (error) {
      console.error('Error searching for TaxPayer:', error);
      setError('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
      <TextField
        label="Search by TID"
        type="number"
        value={tid}
        onChange={(e) => setTid(e.target.value)}
      />
      <Button onClick={handleSearch} variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Search'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {searchResult && (
        <Box>
          <Typography variant="h6">Search Result:</Typography>
          <Typography>TID: {Number(searchResult.tid)}</Typography>
          <Typography>Name: {searchResult.firstName} {searchResult.lastName}</Typography>
          <Typography>Address: {searchResult.address}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaxPayerSearch;
