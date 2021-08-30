import React, { useState } from 'react';
import { Input } from 'antd';
const { Search } = Input; 

function SearchMovie(props) {

    const [SearchType, setSearchType] = useState("");

    const onChangeSearch = (e) => {
        setSearchType(e.currentTarget.value);
        props.refreshFunction(e.currentTarget.value);
    }


    return (
        <div>
            <Search
                value={SearchType}
                onChange={onChangeSearch}
                placeholder = "Search by title..."
            />
        </div>
    );
}

export default SearchMovie;
