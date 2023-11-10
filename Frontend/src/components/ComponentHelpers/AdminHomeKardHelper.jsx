import data from '../ComponentData/AdminHomeKard.json'
import Kard from '../Kard';

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
        <ul>
            {filteredData.map
                (
                    (item) => (
                        <Kard title = {item.title} domain={item.domain} desc = {item.desc} Click={() =>{
                            window.location.assign(item.url);
                        }}></Kard>
                    )
                )
            }
        </ul>
    )
}

export default Kards;