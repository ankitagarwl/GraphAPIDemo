import React, { useState, useEffect }  from 'react';
import axios from 'axios';

function Teamchannels() {

    const [channels, setChannels] = useState([]);
    const [teamid, setTeamid] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const handleChange = event => {
        setTeamid(event.target.value);
    };

    useEffect(() => {
        if(teamid != ''){
            makeAPICall();
        }
      }, [teamid])

    const makeAPICall = async () => {
        try {
            const test = await axios.get(`https://localhost:44383/teamdetails?teamid=${teamid}`, {
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
                        seterrormessage('')
                    })
                    .catch((err) => {
                        console.log(err.message);
                        setChannels([])
                        seterrormessage('Sorry! Entered text is not a valid teams id.')
                    });
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ display: 'block', width: '80%', padding: 30, align: 'center' }}>
           <form onSubmit={e => { e.preventDefault(); }}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Team ID</label>
                    <input type="text" class="form-control" id="teamid" onChange={handleChange} value={teamid} aria-describedby="emailHelp" placeholder="Enter team id"></input>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your team id with anyone else.</small><br></br>
                    <small style={{ color : 'red'}} >{errormessage}</small>
                </div>
            </form>
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