# cpat-client

## Components

### Users

/components

UserProfile.js

Holds profile information for users of the cpat-client.

- Also need to create, update, delete other users

### Permissions

- Who can create users?
- Who can update user profiles?
- Permissions likely need to be "loose" (very few limitations) 
    - cpat users are already "advanced" users, so permissions are primarily to:
        - prevent data mistakes (no one overwriting others' data)
        - strategic limitation/scoping of script execution


### Analytics

Primary use of analytics is to aid in creating reports on the pentests

- create a timeline of work
- easier attributing sets of work to specific users for team engagements

### Target Types

Need CRUD operations for each target type

/components/target-types

- Company
    - create + update: CompanyFormik.js
    - delete: CompanyRemoveConfirmation.js (implement as a modal?)
    - read (i.e. "detail"): CompanyDetail.js (full detail page for reading)

/components/target-types/company
    - CompanyDetail.js
    - CompanyRemoval.js
    - forms
        - ~/forms/companyCreate
        - ~/forms/companyUpdate

> Note: For simplified data models, combining the "create" and "update" forms would likely be a better implementation by using a trivial amount of  switching logic. (Ex: if no pre-existing data -> use "create"; else if pre-existing data -> use "update".) However, the data models for each target type are likely to grow considerably in size. So, the "trivial amount" of switching logic between the two form types will likely dirty the form code. _So!..._ it's better to split them out--even if that means a little mental repetition.