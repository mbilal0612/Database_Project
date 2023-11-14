import {useState, useEffect} from 'react'
import { getNat } from "../../apis/Admin/nationality"
import MenuItem from "@mui/material/MenuItem";

async function handleNats() {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {

        async function abc() {
            const res = await getNat();
            setData(res.data);
            setLoading(false);
        }
        setLoading(true);
        abc();

    });

    return !loading ? (
        <>
        {
            data.map(
                (item) => {
                    <MenuItem>{item.NAT_ID}</MenuItem>
                }
            )
        }
        </>
    ) : <div>FUCK YOU</div>;

}

export default handleNats;