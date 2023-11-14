import data from '../ComponentData/AdminHomeKard.json'
import Kard from '../kard';
import Grid from '@mui/system/Unstable_Grid/Grid';

function Kards(props) {

    const filteredData = data.filter((T) => {

        if (props.input === '') {
            return T;
        }

        else {
            return T.title.toLowerCase().match(props.input);
        }
    })

    return (
        <Grid container spacing={2} style={{ justifyContent: 'center', margin: '1% 0 0 0' }}>
            {filteredData.map
                (
                    (item) => (
                        <Kard title={item.title} domain={item.domain} desc={item.desc} status={item.status} Click={() => {
                            window.location.assign(item.url);
                        }}></Kard>
                    )
                )
            }
        </Grid>
    )
}

export default Kards;