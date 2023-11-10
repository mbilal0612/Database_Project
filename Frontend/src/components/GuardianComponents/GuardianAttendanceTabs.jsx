import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Attendance2 from "./AttendanceTable2";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function GuardianTabs({ children }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // if(children){
        //     setValue(children[newValue].STUDENT_ID);
        // }
    };

    useEffect(() => {
        if (children.length > 0) {
            setValue(children[0].STUDENT_ID);
        }
    }, [children]);

    return (
        <Paper sx={{ m: 2, height: "100%" }} elevation={24}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {children.map((c) => (
                        <Tab
                            value={c.STUDENT_ID}
                            label={c.FIRST_NAME + " " + c.LAST_NAME}
                            {...a11yProps(c.STUDENT_ID)}
                        />
                    ))}
                </Tabs>
            </Box>
            {children.map((c) => (
                <CustomTabPanel value={value} index={c.STUDENT_ID}>
                    {/* <EnhancedTable/> */}
                    <Attendance2 studentId={c.STUDENT_ID} />
                </CustomTabPanel>
            ))}
        </Paper>
    );
}
