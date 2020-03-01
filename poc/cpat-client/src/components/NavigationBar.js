import React, { useState } from 'react';
import { Button, Pane, SideSheet, Position, Heading, Icon } from 'evergreen-ui';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledBar = styled.div`
    display: flex;
    align-content: center;
    align-items: center;

    h2 {
        margin: 0;
        margin-left: 20px;
        cursor: pointer;
    }
`;

const NavigationBar = () => {
    const [isShown, setIsShown] = useState(false);
    let history = useHistory();

    return (
        <StyledBar style={{ display: 'flex' }}>
            <SideSheet
                position={Position.LEFT}
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}>
                
                <Heading size={600}>Navigation</Heading>

                <Pane flex="1" background="tint1" padding={16}>
                    <Heading size={500}>View current</Heading>
                    <ul>
                        <li><Link to="/companies" onClick={() => setIsShown(false)}>Companies</Link></li>
                        <li><Link to="/devices" onClick={() => setIsShown(false)}>Devices</Link></li>
                        <li><Link to="/locations" onClick={() => setIsShown(false)}>Locations</Link></li>
                        <li><Link to="/people" onClick={() => setIsShown(false)}>People</Link></li>
                        <li><Link to="/targets" onClick={() => setIsShown(false)}>Targets</Link></li>
                    </ul>
                </Pane>
                <hr />
                <Pane flex="1" background="tint1" padding={16}>
                    <Heading size={500}>Add New sub-targets</Heading>
                    <ul>
                        <li><Link to="/company/create" onClick={() => setIsShown(false)}>Company</Link></li>
                        <li><Link to="/device/create" onClick={() => setIsShown(false)}>Device</Link></li>
                        <li><Link to="/location/create" onClick={() => setIsShown(false)}>Location</Link></li>
                        <li><Link to="/person/create" onClick={() => setIsShown(false)}>Person</Link></li>
                        <li><Link to="/target/create" onClick={() => setIsShown(false)}>Target</Link></li>
                    </ul>
                </Pane>
            </SideSheet>
            <Button appearance="minimal" onClick={() => setIsShown(true)}>
                <Icon icon="list" color="muted" />
            </Button>

            <Heading 
                size={600} 
                marginTop="default" 
                onClick={() => history.push('/')}>CPAT</Heading>
        </StyledBar>
    );
};

export default NavigationBar;