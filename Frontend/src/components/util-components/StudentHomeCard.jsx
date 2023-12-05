import React from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    CardActions,
    Box,
} from "@mui/material";

export default function StudentHomeCard({
    COURSE_ID,
    COURSE_NAME,
    CLASS_ID,
    FACULTY_NAME,
    MARKS,
}) {
    return (
        <Card
            sx={{
                height: "100%",
                width: "90%",
                backgroundColor: "#F2F2F2",
                fontFamily: "Inter",
                marginTop: "1%",
                marginBottom: "1%",
                borderRadius: "15px",
            }}
        >
            <CardContent>
                <Typography
                    sx={{
                        fontSize: 36,
                        fontWeight: 800,
                        textAlign: "start",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        paddingLeft: "1%",
                    }}
                >
                    {COURSE_NAME}:
                </Typography>
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "space-between" }}
                >
                    <Grid
                        sx={{
                            textAlign: "start",
                            pl: 2,
                            fontSize: 24,
                            fontWeight: 800,
                            paddingLeft: "3%",
                        }}
                    >
                        <p> Course ERP: {COURSE_ID}</p>
                        <p>Teacher: {FACULTY_NAME}</p>
                        <p>Class: {CLASS_ID}</p>
                    </Grid>
                    <Grid
                        sx={{
                            textAlign: "start",
                            fontSize: 24,
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <p>Marks: {MARKS}</p>
                    </Grid>
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column-reverse",
                        }}
                    >
                        <Button
                            href="/StudentCourseDetails"
                            sx={{
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "12px",
                                fontSize: 15,
                            }}
                        >
                            View More
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
