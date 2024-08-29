import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type NewTaxPayerFormProps = {
  onSubmit: (data: { tid: number; firstName: string; lastName: string; address: string }) => void;
};

const NewTaxPayerForm: React.FC<NewTaxPayerFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
        <Controller
          name="tid"
          control={control}
          rules={{ required: 'TID is required', min: { value: 1, message: 'TID must be positive' } }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="TID"
              type="number"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          rules={{ required: 'First name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'Last name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Address"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Add TaxPayer
        </Button>
      </Box>
    </form>
  );
};

export default NewTaxPayerForm;
