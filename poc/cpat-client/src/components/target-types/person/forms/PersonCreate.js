import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { PersonDocumentRelationsFormArray } from './form-arrays/PersonDocumentRelationsFormArray';
import { PersonNicknamesFormArray } from './form-arrays/PersonNicknameFormArray';
import { PersonPhoneNumbersFormArray } from './form-arrays/PersonPhoneNumbersFormArray';
import { PersonEmailAddressesFormArray } from './form-arrays/PersonEmailAddressesFormArray';
import { PersonOrganizationsFormArray } from './form-arrays/PersonOrganizationsFormArray';
import { PersonEmployersFormArray } from './form-arrays/PersonEmployersFormArray';
import { PersonSocialLinksFormArray } from './form-arrays/PersonSocialLinksFormArray';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { personActions } from '../../../../state-management/person/actions';
import Person from '../../../../data/Person';
import User from '../../../../data/User';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const PersonCreate = (props) => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props;

    let history = useHistory();

    return (
        <div>
            <h2>Person: Create New</h2>

            <FormStyle>
                <Form>
                    <label>First Name</label>
                    <TextInput 
                        name="firstName"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />
                    {(touched.firstName && errors.firstName) ? <div>{errors.firstName}</div> : ""}

                    <label>Middle Name</label>
                    <TextInput 
                        name="middleName"
                        label="Middle Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.middleName}
                    />
                    {(touched.middleName && errors.middleName) ? <div>{errors.middleName}</div> : ""}

                    <label>Last Name</label>
                    <TextInput 
                        name="lastName"
                        label="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                    />
                    {(touched.lastName && errors.lastName) ? <div>{errors.lastName}</div> : ""}

                    <div>
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
                        value={values.dateCreated || `${new Date('2020-01-30').toLocaleDateString()}`} />

                    <label>Updated At:</label>
                    <TextInput 
                        disabled 
                        name="updatedAt"
                        label="Updated At"
                        value={values.updatedAt || `${new Date().toLocaleDateString()}`} />

                    <label>Last Modified By:</label>
                    <TextInput 
                        disabled 
                        name="lastModifiedBy"
                        label="Last Modified By"
                        value={values.lastModifiedBy || `You - User 1`} />

                    <div>
                        <FieldArray name="documentRelation" component={PersonDocumentRelationsFormArray} />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Button type="submit">Create</Button>
                        <Button onClick={handleReset}>Cancel</Button>
                    </div>
                </Form>

                <Button onClick={() => history.goBack()}>Back</Button>
            </FormStyle>
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
        documentRelation,
        dateCreated,
        updatedAt,
        lastModifiedBy
     }) => {
        return {
            firstName: firstName || '',
            middleName: middleName || '',
            lastName: lastName || '',
            nickNames: nickNames || [],
            phoneNumbers: phoneNumbers || [],
            emailAddresses: emailAddresses || [],
            organizations: organizations || [],
            employers: employers || [],
            socialLinks: socialLinks || [],
            documentRelation: documentRelation || [{}],

            dateCreated: dateCreated,
            updatedAt: updatedAt,
            //lastModifiedBy: lastModifiedBy || new User()
        }
    },
    validationSchema: Yup.object().shape({
        // NOTE: Having a code error in this part (i.e. typo in variable name) can prevent form from submitting.
        firstName: Yup.string().required('First Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newPerson = new Person();
        newPerson.firstName = values.firstName || '';
        newPerson.middleName = values.middleName || '';
        newPerson.lastName = values.lastName || '';
        newPerson.nickNames = values.nickNames || [];
        newPerson.phoneNumbers = values.phoneNumbers || [];
        newPerson.emailAddresses = values.emailAddresses || [];
        newPerson.organizations = values.organizations || [];
        newPerson.employers = values.employers || [];
        newPerson.socialLinks = values.socialLinks || [];

        newPerson.documentRelation = values.documentRelation || [];
        newPerson.dateCreated = values.dateCreated;
        newPerson.updatedAt = values.updatedAt;
        newPerson.lastModifiedBy = values.lastModifiedBy;

        props.dispatch(personActions.insertPerson(newPerson.apiObject()));
        setSubmitting(false);
    }
})(PersonCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const PersonCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { PersonCreateConnection as PersonCreate };