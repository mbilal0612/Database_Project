import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OutlinedCard({ subject_code, subject, grade, click }) {
  return (
    <Box sx={{ minWidth: 275, boxShadow: 3, borderRadius: '10%'}}>
      <Card variant="outlined">
        {
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {subject_code}
              </Typography>
              <Typography variant="h5" component="div">
                {subject}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Class
              </Typography>
              <Typography variant="body2">
                {grade}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={click} size="small">View Details</Button>
            </CardActions>
          </React.Fragment>
        }
      </Card>
    </Box>
  );
}
