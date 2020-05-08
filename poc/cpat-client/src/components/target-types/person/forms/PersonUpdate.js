import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { PersonDocumentRelationsFormArray } from './form-arrays/PersonDocumentRelationsFormArray';
import { PersonNicknamesFormArray } from './form-arrays/PersonNicknameFormArray';
import { PersonPhoneNumbersFormArray } from './form-arrays/PersonPhoneNumbersFormArray';
import { PersonEmailAddressesFormArray } from './form-arrays/PersonEmailAddressesFormArray';
import { PersonOrganizationsFormArray } from './form-arrays/PersonOrganizationsFormArray';
import { PersonEmployersFormArray } from './form-arrays/PersonEmployersFormArray';
import { PersonSocialLinksFormArray } from './form-arrays/PersonSocialLinksFormArray';
import styled from 'styled-components';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { personActions } from '../../../../state-management/person/actions';
import Person from '../../../../data/Person';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const PersonUpdate = (props) => {
    let history = useHistory();
    let match = useRouteMatch('/person/update/:id');
    
    // Formik values supplied via props
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    // Other supporting values supplied via props
    const { dispatch, person, loading, updateResult } = props;

    useEffect(() => {
        dispatch(personActions.getPerson(match.params.id));
    }, []);

    return (
        <div>
            <h2>Person: Update</h2>

            {(loading === true) ? <h3>Loading...</h3> : 
                <FormStyle>
                    <h1>Person Update</h1>
                    <h2>Updating: {person && person.firstName ? person.firstName : ''}</h2>

                    <p>
                        <b>update result: {(updateResult !== null) ? updateResult : ''}</b>
                    </p>

                    <Form>
                        <label>First Name</label>
                        <TextInput 
                            name="firstName"
                            label="First Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName || person.firstName}
                        />
                        {(touched.firstName && errors.firstName) ? <div>{errors.firstName}</div> : ""}

                        <label>Middle Name</label>
                        <TextInput 
                            name="middleName"
                            label="Middle Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.middleName || person.middleName}
                        />
                        {(touched.middleName && errors.middleName) ? <div>{errors.middleName}</div> : ""}

                        <label>Last Name</label>
                        <TextInput 
                            name="lastName"
                            label="Last Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName || person.lastName}
                        />
                        {(touched.lastName && errors.lastName) ? <div>{errors.lastName}</div> : ""}

                        <div>
                            <FieldArray name="relations" component={PersonDocumentRelationsFormArray} />
                            <FieldArray name="nickNames" component={PersonNicknamesFormArray} />
                            <FieldArray name="phoneNumbers" component={PersonPhoneNumbersFormArray} />
                            <FieldArray name="emailAddresses" component={PersonEmailAddressesFormArray} />
                            <FieldArray name="organizations" component={PersonOrganizationsFormArray} />
                            <FieldArray name="employers" component={PersonEmployersFormArray} />
                            <FieldArray name="socialLinks" component={PersonSocialLinksFormArray} />
                        </div>

                        <label>Date Created:</label>
                        <TextInput 
                            disabled 
                            name="dateCreated"
                            label="Date Created"
                            value={person.dateCreated} />

                        <label>Updated At:</label>
                        <TextInput 
                            disabled 
                            name="updatedAt"
                            label="Updated At"
                            value={person.updatedAt} />

                        <label>Last Modified By:</label>
                        <TextInput 
                            disabled 
                            name="lastModifiedBy"
                            label="Last Modified By"
                            value={person.lastModifiedBy || 'some user'} />
                        
                        <div style={{ display: 'flex' }}>
                            <Button type="submit">Create</Button>
                            <Button onClick={handleReset}>Cancel</Button>
                        </div>
                    </Form>

                    <Button onClick={() => history.goBack()}>Back</Button>
                </FormStyle>
            }
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        firstName,
        middleName,
        lastName,
        nickNames,
        phoneNumbers,
        emailAddresses,
        organizations,
        employers,
        socialLinks,
        relations,
        updatedAt,
        lastModifiedBy,

        person
     }) => {
        return {
            firstName: firstName || person.firstName,
            middleName: middleName || person.middleName,
            lastName: lastName || person.lastName,
            nickNames: (Array.isArray(nickNames) && nickNames.length > 0) || person.nickNames,
            phoneNumbers: (Array.isArray(phoneNumbers) && phoneNumbers.length > 0) || person.phoneNumbers,
            emailAddresses: (Array.isArray(emailAddresses) && emailAddresses.length > 0) || person.emailAddresses,
            organizations: (Array.isArray(organizations) && organizations.length > 0) || person.organizations,
            employers: (Array.isArray(employers) && employers.length > 0) || person.employers,
            socialLinks: (Array.isArray(socialLinks) && socialLinks.length > 0) || person.socialLinks,
            relations: (Array.isArray(relations) && relations.length > 0) || person.relations,

            updatedAt: updatedAt,
            lastModifiedBy: lastModifiedBy || person.lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('First name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let updatedPerson = new Person();
        updatedPerson.firstName = values.firstName;
        updatedPerson.middleName = values.middleName;
        updatedPerson.lastName = values.lastName;
        updatedPerson.nickNames = values.nickNames;
        updatedPerson.phoneNumbers = values.phoneNumbers;
        updatedPerson.emailAddresses = values.emailAddresses;
        updatedPerson.organizations = values.organizations;
        updatedPerson.employers = values.employers;
        updatedPerson.socialLinks = values.socialLinks;
        updatedPerson.relations = values.relations;
        updatedPerson.updatedAt = values.updatedAt;
        updatedPerson.lastModifiedBy = values.lastModifiedBy;

        props.dispatch(personActions.partialUpdatePerson(props.person.id, updatedPerson.apiObject()));
        setSubmitting(false);
    }
})(PersonUpdate);

function mapStateToProps(state) {
    const { person } = state;
    return {
        person: (person && person.persons) ? person.persons : {},
        updateResult: (person && person.partialUpdateResult) ? person.partialUpdateResult : 0,
        loading: person ? person.loading : false
    };
}

const PersonUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { PersonUpdateConnection as PersonUpdate };