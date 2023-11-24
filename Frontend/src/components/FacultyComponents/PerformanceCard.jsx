import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { Card } from "@mui/material";
import TypographyTheme from "./HeadingTheme";

export default function ({ label, percentage }) {
  return (
    <Card
      sx={{
        Height: "90%",
        width: "90%",
        backgroundColor: "#F2F2F2",
        fontFamily: "Inter",
        marginTop: "1%",
        marginBottom: "1%",
        borderRadius: "15px",
        margin: "10px",
        boxShadow: "3",
      }}
    >
      <TypographyTheme
        sx={{ maxWidth: "2px" }}
        label={label.length <= 11 ? label : label.substr(0, 10) + "..."}
      >
        {" "}
        <br></br>{" "}
      </TypographyTheme>
      <CircularProgressbar
        minValue={0}
        maxValue={100}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Text size
          textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `rgba(${255 - (percentage / 100) * 255}, ${
            (percentage / 100) * 255
          }, 0, 100)`,
          textColor: `rgba(${255 - (percentage / 100) * 255}, ${
            (percentage / 100) * 255
          }, 0, 100)`,
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
        value={percentage}
        text={`${percentage}%`}
      />
    </Card>
  );
}
