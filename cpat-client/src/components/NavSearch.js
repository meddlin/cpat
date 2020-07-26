import React, { useState } from 'react';
import { Pane, SideSheet, Heading, Paragraph, Card, SearchInput } from 'evergreen-ui';
import { connect } from 'react-redux';
import { searchActions } from '../state-management/search/actions';

const NavSearch = (props) => {
    const { dispatch, loading, results } = props;
    const [isShown, setIsShown] = useState(false);

    const handleKeyPress = (ev) => {
        if (ev.keyCode === 13) {
            console.log(`ev: ${ev.target.value}`);
            setIsShown(true);

            dispatch(searchActions.searchQuery());
        }
    }

    return (
        <div>
            <SearchInput placeholder="Search..." onKeyDown={(ev) => handleKeyPress(ev)} />

            <SideSheet
                    isShown={isShown}
                    onCloseComplete={() => setIsShown(false)}
                    containerProps={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                    }}>
                    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                        <Pane padding={16}>
                            <Heading size={600}>Search Results</Heading>
                            <Paragraph size={400}>
                            # results
                            </Paragraph>
                        </Pane>
                    </Pane>
                    <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
                        {results ? results.map( r => <div>{r.name}</div> ) : ''}
                    </Pane>
                </SideSheet>
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