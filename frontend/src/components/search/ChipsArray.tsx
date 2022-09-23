import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Ingredient } from './interface';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props: { ingredients: Ingredient[] }) {
  const [chipData, setChipData] = React.useState<readonly Ingredient[]>(
    props.ingredients
  );

  const handleDelete = (chipToDelete: Ingredient) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.name === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.id}>
            <Chip
              icon={icon}
              label={data.name}
              onDelete={data.name === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
