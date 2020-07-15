import React, { useState } from 'react';
import { Button, Pane, SideSheet, Position, Heading, Icon, Menu } from 'evergreen-ui';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledBar = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    
    background-color: lightgray;

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
                    <Menu>
                        <Menu.Group>
                            <Menu.Item>
                                <Link to="/companies" onClick={() => setIsShown(false)}>Companies</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/devices" onClick={() => setIsShown(false)}>Devices</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/locations" onClick={() => setIsShown(false)}>Locations</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/people" onClick={() => setIsShown(false)}>People</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/targets" onClick={() => setIsShown(false)}>Targets</Link>
                            </Menu.Item>
                        </Menu.Group>
                    </Menu>
                </Pane>
                <hr />
                <Pane flex="1" background="tint1" padding={16}>
                    <Heading size={500}>Add New sub-targets</Heading>
                    <Menu>
                        <Menu.Group>
                            <Menu.Item><Link to="/company/create" onClick={() => setIsShown(false)}>Company</Link></Menu.Item>
                            <Menu.Item><Link to="/device/create" onClick={() => setIsShown(false)}>Device</Link></Menu.Item>
                            <Menu.Item><Link to="/location/create" onClick={() => setIsShown(false)}>Location</Link></Menu.Item>
                            <Menu.Item><Link to="/person/create" onClick={() => setIsShown(false)}>Person</Link></Menu.Item>
                            <Menu.Item><Link to="/target/create" onClick={() => setIsShown(false)}>Target</Link></Menu.Item>
                        </Menu.Group>
                    </Menu>
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