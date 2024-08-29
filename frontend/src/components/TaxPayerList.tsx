import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DataTable from 'react-data-table-component';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
};

type TaxPayerListProps = {
  taxPayers: TaxPayer[];
};

const columns = [
  {
    name: 'TID',
    selector: (row: TaxPayer) => Number(row.tid),
    sortable: true,
  },
  {
    name: 'First Name',
    selector: (row: TaxPayer) => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: TaxPayer) => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: TaxPayer) => row.address,
    sortable: true,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <DataTable
      columns={columns}
      data={taxPayers}
      pagination
      responsive
      highlightOnHover
      striped
    />
  );
};

export default TaxPayerList;
