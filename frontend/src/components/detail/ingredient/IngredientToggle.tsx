import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function IngredientToggle(props: { toggleSpice: () => void }) {
  const [alignment, setAlignment] = React.useState('ingredient');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    props.toggleSpice();
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      color="success"
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="ingredient">식재료</ToggleButton>
      <ToggleButton value="spice">양념</ToggleButton>
    </ToggleButtonGroup>
  );
}
