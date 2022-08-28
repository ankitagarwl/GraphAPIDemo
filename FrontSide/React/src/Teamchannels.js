import React, { useState, useEffect }  from 'react';
import axios from 'axios';

function Teamchannels() {

    const [channels, setChannels] = useState([]);
    useEffect(() => {
        makeAPICall();
      }, [])

    const makeAPICall = async () => {
        try {
            const test = await axios.get('https://localhost:44383/weatherforecast', {
                    mode:'cors',
                    method: 'GET',
                    dataType: "jsonp",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        
                    }})
                    .then((data) => {
                        setChannels([])
                        setChannels(data.data)
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ display: 'block', width: '80%', padding: 30, align: 'center' }}>
            <table className="table table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created Date</th>
            </tr>
        </thead>
        <tbody>
            <>
            {channels.map((data, index) => {
                    return(
                       
                            <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td> <a href={data.url}>{data.name} </a></td>
                                    <td>{data.description}</td>
                                    <td>{data.createdDate.slice(0, -7)}</td>
                            </tr>
                       
                )
            }
            )}
            </>
           
        </tbody>
    </table>
        </div>
    );
}
export default Teamchannels;