import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from 'evergreen-ui';

const ScanTargetSelection = React.lazy(() => import ('../components/ScanTargetSelection'));

const DashboardStyles = styled.div`
    display: flex;
    flex-direction: column;
`;

const CenteredSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Dashboard = () => {
    const [isShown, setIsShown] = useState(false);

    const isShownCallback = function() {
        if (isShown) setIsShown(false);
    }

    return (
        <DashboardStyles>
            <CenteredSection
                style={{ 
                    height: 500, 
                    width: 1200, 
                    backgroundColor: 'lightgray', 
                    alignSelf: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => setIsShown(true)}>
                <Heading size={700}>Must select a target first</Heading>
            </CenteredSection>

            <ScanTargetSelection enable={isShown} enableCallback={isShownCallback} />
        </DashboardStyles>
    );
};

export default Dashboard;