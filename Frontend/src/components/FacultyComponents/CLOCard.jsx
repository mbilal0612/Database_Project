import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import { MultipleSelect } from "./PLODropDown";

export default function CLOCard({
  courseId,
  ploList,
  setSelectedPlo,
  handleNewClo,
  setCloId,
  setCloName,
  setCloDesc,
}) {
  const [id, setId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    setCloId(id);
  }, [id]);
  useEffect(() => {
    setCloName(courseName);
  }, [courseName]);
  useEffect(() => {
    setCloDesc(desc);
  }, [desc]);
  return (
    <Card
      sx={{
        maxWidth: "30%",
        marginTop: "5%",
        alignSelf: "center",
        marginLeft: "35%",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Create New CLO
        </Typography>
        <FormControl
          style={{ width: "100%", justifyContent: "center", marginTop: "2%" }}
        >
          <TextField
            label="CLO ID"
            value={courseId + "-" + id}
            inputProps={{ maxLength: 12 }}
            onChange={(data) => {
              setId(data.target.value.substring(courseId.length + 1));
            }}
            style={{ marginTop: "5%" }}
          ></TextField>

          {id != "" ? (
            <TextField
              label="CLO Name"
              value={courseName}
              inputProps={{ maxLength: 256 }}
              onChange={(data) => {
                setCourseName(data.target.value);
              }}
              style={{ marginTop: "5%" }}
            ></TextField>
          ) : (
            <></>
          )}
          {courseName != "" ? (
            <TextField
              label="CLO Description"
              value={desc}
              inputProps={{ maxLength: 1024 }}
              onChange={(data) => {
                setDesc(data.target.value);
              }}
              style={{ marginTop: "5%" }}
            ></TextField>
          ) : (
            <></>
          )}
          {desc != "" ? (
            <MultipleSelect names={ploList} setSelectedPlo={setSelectedPlo} />
          ) : (
            <></>
          )}
        </FormControl>
      </CardContent>
      <CardActions>
        <Button onClick={handleNewClo} size="large">
          Create
        </Button>
      </CardActions>
    </Card>
  );
}
