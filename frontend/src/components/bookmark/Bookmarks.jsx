import React, { useState, useEffect } from 'react';
import './Bookmarks.css'
import SearchResult from '../dashboard/SearchResult';
import axios from 'axios';
import DataGraph from '../data-graph/DataGraph';

const Bookmarks = () => {
    const [objs, setObjs] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [clickedObj, setClickedObj] = useState({})
    const [open, setOpen] = useState(false);

    useEffect(() => {
        var emailId = sessionStorage.getItem("userLoggedIn")
        console.log(emailId)
        var baseURL = `http://localhost:8080/bookmark/get/${emailId}`;
        axios.get(baseURL).then(res => {
            console.log(res)
            setObjs(res.data)
        })

    }, [])
    const handleSearch = async () => {
        setObjs('')
        console.log("hi")
    }

    const handleCallback = (childData) => {
        console.log({data:childData})
        setClickedObj(childData);
        setOpen(true)
    };
    return (<>
        <main>
            <div className="papers">
                {Array.isArray(objs) ? (
                    objs.map((obj) => (
                        <SearchResult key={obj.id} obj={obj} bookmarks={true} parentCallback={handleCallback}/>
                    ))
                ) : (
                    <p>No Bookmarks.</p>
                )}
            </div>
            {open ? <DataGraph currentItem = {clickedObj} closePopup={() => setOpen(false)} /> : null}

        </main>
    </>);
};

export default Bookmarks;