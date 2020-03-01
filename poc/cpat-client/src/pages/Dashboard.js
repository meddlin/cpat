import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading, Dialog } from 'evergreen-ui';

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

            <Dialog
                isShown={isShown}
                title="Target Selection"
                intent="success"
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Save">

                <ScanTargetSelection />
            </Dialog>
        </DashboardStyles>
    );
};

export default Dashboard;