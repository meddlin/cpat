import React from 'react';
import { Heading, Autocomplete, TextInput } from 'evergreen-ui';

const ScanTargetSelection = () => {
    return (
        <div>
            <Heading size={500}>Select a Target</Heading>

            <Autocomplete
                onChange={(changedItem) => console.log(changedItem)}
                items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}>
                {(props) => {
                    const { getInputProps, getRef, inputValue } = props
                    return (
                    <TextInput
                        placeholder="Fruits"
                        value={inputValue}
                        innerRef={getRef}
                        {...getInputProps()}
                    />
                    )
                }}
            </Autocomplete>
        </div>
    );
};

export default ScanTargetSelection;