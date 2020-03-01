import React, { useState } from 'react';
import { Button, Pane, SideSheet, Position, Heading, Card, Icon } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBar = styled.div`
    display: flex;
    align-content: center;
    align-items: center;

    h2 {
        margin: 0;
        margin-left: 20px;
    }
`;

const NavigationBar = () => {
    const [isShown, setIsShown] = useState(false);

    return (
        <StyledBar style={{ display: 'flex' }}>
            <SideSheet
                position={Position.LEFT}
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}>
                
                <Heading size={600}>Menu</Heading>

                <Pane flex="1" background="tint1" padding={16}>
                    <ul>
                        <li><Link to="/companies">Companies</Link></li>
                        <li><Link to="/devices">Devices</Link></li>
                        <li><Link to="/locations">Locations</Link></li>
                        <li><Link to="/people">People</Link></li>
                        <li><Link to="/targets">Targets</Link></li>
                    </ul>
                </Pane>
            </SideSheet>
            <Button appearance="minimal" onClick={() => setIsShown(true)}>
                <Icon icon="list" color="muted" />
            </Button>

            <Heading size={600} marginTop="default">CPAT</Heading>
        </StyledBar>
    );
};

export default NavigationBar;