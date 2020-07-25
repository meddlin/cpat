import React from 'react';
import { SearchInput } from 'evergreen-ui';

const NavSearch = () => {

    const handleKeyPress = (ev) => {
        console.log('key press...');
        console.log(`ev: ${ev.target.value}`)

        if (ev.keyCode === 13) console.log('ENTER PRESSED...')
    }

    return (
        <div>
            <SearchInput placeholder="Search..." onKeyDown={(ev) => handleKeyPress(ev)} />
        </div>
    );
};

export default NavSearch;