/**
 * Check if an array only contains empty objects.
 * NOTE: ONLY single-depth arrays of objects containing simple string/undefined properties.
 * @param {*} arrObjs 
 */
const isOnlyEmpty = (arrObjs) => {
	let res = false;

	for (let i = 0; i < arrObjs.length; i++) {
		
		// Iterate over each key of the current object in the array.
        let isEmpty = Object.keys(arrObjs[i]).some((key, idx) => {
                            if (arrObjs[i][key] === undefined || arrObjs[i][key] === '') return true;
                            else return false;
						});
		
		// If iteration returns true, set and keep going; if iteration is false, data isn't empty--end.
		if (isEmpty) {
			res = isEmpty;
		} else {
			res = isEmpty;
			break;
		}
    }

	return res;
};

/**
 * Validates the provided 'formik' values are empty.
 * @param {*} initial 
 * @param {*} formValues 
 */
const emptyFormValues = (initial, formValues) => {
	return Array.isArray(initial) && Array.isArray(formValues) && isOnlyEmpty(formValues);
}

/**
 * Validates the 'initialValues' (labeled 'initial', here) provided to 'formik' hold more entries than the values
 * already loaded in the form.
 * NOTE: This situation should only happen on initial load operation(s) for a 'formik' form.
 * @param {*} initial 
 * @param {*} formValues 
 */
const initialLongerThanValues = (initial, formValues) => {
	return Array.isArray(initial) && Array.isArray(formValues) && (initial.length > formValues.length);
}

export const validations = {
    emptyFormValues,
    initialLongerThanValues
};