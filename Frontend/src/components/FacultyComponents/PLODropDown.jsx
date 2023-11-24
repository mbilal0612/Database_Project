import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function MultipleSelect({ names, setSelectedPlo }) {
  //   console.log(names);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    setSelectedPlo(personName);
  }, [personName]);

  return (
    <>
      <FormControl sx={{marginTop:2, width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">PLO/s</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="CLO" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.PLO_ID}
              value={name.PLO_ID}
              style={getStyles(name, personName, theme)}
            >
              {name.PLO_NAME}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
