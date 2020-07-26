import React from 'react';
import { SearchInput } from 'evergreen-ui';
import { connect } from 'react-redux';
import { searchActions } from '../state-management/search/actions';

const NavSearch = (props) => {
    const { dispatch, loading } = props;

    const handleKeyPress = (ev) => {
        if (ev.keyCode === 13) {
            console.log(`ev: ${ev.target.value}`);

            dispatch(searchActions.searchQuery());
        }
    }

    return (
        <div>
            <SearchInput placeholder="Search..." onKeyDown={(ev) => handleKeyPress(ev)} />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        results: (state.search && state.search.searchResult && Array.isArray(state.search.searchResult)) ? state.search.searchResult : [],
        loading: state.search ? state.search.loading : false
    }
}

const connectedNavSearch = connect(mapStateToProps)(NavSearch);
export { connectedNavSearch as NavSearch };