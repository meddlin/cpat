import React, { useState } from 'react';
import { Heading, Dialog, Pane, Autocomplete, TextInput, Button } from 'evergreen-ui';
import { targetActions } from '../state-management/target/actions';

const ScanTargetSelection = (props) => {
    const { enable, enableCallback } = props;

    const [isShown, setIsShown] = useState(false);
    const [targetEntry, setTargetEntry] = useState('');

    return (
        <Dialog
            isShown={enable}
            title="Target Selection (self-managed)"
            intent="success"
            onCloseComplete={() => {
                setIsShown(false);
                enableCallback();
            }}
            hasFooter={false}>

            {( {close} ) => (
                <Pane style={{ display: 'flex', flexDirection: 'column' }}>
                    <Heading size={500}>Select a Target</Heading>

                    <TextInput 
                        placeholder="" 
                        value={targetEntry}
                        onChange={e => setTargetEntry(e.target.value)}
                    />

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1em' }}>
                        <Button onClick={close}>Cancel</Button>
                        <Button
                            appearance="primary"
                            intent="success"
                            onClick={() => {
                                targetActions.setTarget(targetEntry);
                                close();
                            }}>
                            Save
                        </Button>
                    </div>
                </Pane>
            )}
        </Dialog>
    );
};

export default ScanTargetSelection;