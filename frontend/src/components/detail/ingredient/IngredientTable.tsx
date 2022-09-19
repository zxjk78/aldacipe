import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Ingredient } from '../interface';

const IngredientTable: React.FC<{ ingredients: Ingredient[] }> = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">보유</TableCell>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">수량</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {ingredient.isExist ? '🟢' : '🔴'}
              </TableCell>
              <TableCell component="th" scope="row">
                {ingredient.name}
              </TableCell>
              <TableCell align="center">{ingredient.amount}g</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default IngredientTable;
