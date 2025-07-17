import { Box, Button, Divider, FormControl, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { createBook } from '../../apiConfig/httpService';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const createBookHandler = async () => {
    if (title && author) {
      const res = await createBook({
        title,
        author,
      });
      console.log(res);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="300px">
        <TextField
          label="Book Title"
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Book Author"
          variant="standard"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Button variant='outlined' type="submit" onClick={createBookHandler}>
          Create Book
        </Button>
    
    </Box>
  );
};

export default CreateBook;
