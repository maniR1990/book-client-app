//

import { useEffect, useState } from 'react';
import {
  deleteBook,
  getAllBooks,
  getBooksByStatus,
  searchBook,
  updateBookStatus,
} from '../apiConfig/httpService';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateBook from './component/createBook';

const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'Read' | 'Unread' | ''>('');

  const loadBooks = async () => {
    const res: any = await getAllBooks();
    setBookList(res.data);
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    loadBooks();
  };

  const handleSearch = async () => {
    if (searchText.trim()) {
      const res = await searchBook(searchText);
      setBookList(res.data);
    } else {
      loadBooks();
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateBookStatus(id, newStatus);
    if (selectedFilter) {
      handleFilter(selectedFilter);
    } else {
      loadBooks();
    }
  };

  const handleFilter = async (status: 'Read' | 'Unread') => {
    const res = await getBooksByStatus(status);
    setBookList(res.data);
    setSelectedFilter(status);
  };

  const clearFilter = async () => {
    await loadBooks();
    setSelectedFilter('');
    setSearchText('');
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <Typography variant="h4">Book List</Typography>
      <Divider sx={{ mb: 2 }} />
      <CreateBook />
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Search books"
            variant="outlined"
            size="small"
            value={searchText}
            type="search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={selectedFilter === 'Read' ? 'contained' : 'outlined'}
            onClick={() => handleFilter('Read')}
          >
            Read
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={selectedFilter === 'Unread' ? 'contained' : 'outlined'}
            onClick={() => handleFilter('Unread')}
          >
            Unread
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" onClick={clearFilter}>
            Clear Filter
          </Button>
        </Grid>
      </Grid>

      <List sx={{ width: '100%', mt: 2 }} dense>
        {bookList.length > 0 ? (
          bookList.map((book: any) => (
            <ListItem
              key={book.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingY: 1,
                paddingX: 3,
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Link href={`/book/${book.id}`} underline="hover">
                  {book.title}
                </Link>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  {book.status}
                </Typography>
              </Box>

              <FormControl size="small" variant="standard" sx={{ minWidth: 100, mx: 2 }}>
                <InputLabel>Change Status</InputLabel>
                <Select
                  value={book.status || ''}
                  label="Status"
                  onChange={(e) => handleStatusChange(book.id, e.target.value)}
                  sx={{ fontSize: 12 }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Read">Read</MenuItem>
                  <MenuItem value="Unread">Unread</MenuItem>
                </Select>
              </FormControl>

              <IconButton onClick={() => handleDelete(book.id)} color="error">
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ padding: 2 }}>
            No books found.
          </Typography>
        )}
      </List>
    </>
  );
};

export default BookList;
