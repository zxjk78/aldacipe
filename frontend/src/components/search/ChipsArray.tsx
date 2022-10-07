import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Ingredient } from '../../util/interface';
import {
  ingredientCategoryDictionary,
  ingredientCategoryColor,
} from '../../util/data';
import imageArr from '../../assets/ingredients';
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props: {
  ingredients: Ingredient[];
  deleteIngre: (ingredientId: number) => void;
}) {
  const chipData = props.ingredients;

  const handleDelete = (chipToDelete: Ingredient) => () => {
    props.deleteIngre(+chipToDelete.id);
    // setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        bgcolor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;
        const primaryCode = ingredientCategoryColor[data.smallCategory].primary;
        const secondaryCode =
          ingredientCategoryColor[data.smallCategory].secondary;
        const CustomChip = styled(Chip)`
          width: auto;
        `;

        if (data.name === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.id}>
            <div style={{ position: 'relative' }}>
              <img
                src={imageArr[ingredientCategoryDictionary[data.smallCategory]]}
                alt="재료이미지"
                width={'28px'}
                height={'28px'}
                style={{ position: 'absolute', top: '0.1rem', left: '0.5rem' }}
              />

              <CustomChip
                variant="outlined"
                label={'\u00A0'.repeat(7) + data.name}
                sx={{
                  border: '2px solid',
                  borderColor: primaryCode,
                  color: primaryCode,
                  fontWeight: 'bold',
                  // height: '40px',
                }}
                onDelete={
                  data.name === 'React' ? undefined : handleDelete(data)
                }
              />
            </div>
          </ListItem>
        );
      })}
    </Paper>
  );
}
