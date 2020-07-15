let initial = [
    {
        numbers: '555-555-1234',
        type: 'asdf'
    },
    {
        numbers: '123-345-1234',
        type: ''
    }
];

let secondary = [{
    numbers: '',
    type: ''
}];


// Check if array of objects is "empty", with empty strings also returning "empty".
const containsData = (arrObj) => {
    let res = false;
    for (let i = 0; i < arrObj[i]; i++) {
        
        let foundData = Object.keys(arrObj[i]).some((key, idx) => {
                            if (arrObj[i][key] === undefined || arrObj[i][key] === '') return false;
                            else return true;
                        })
        if (foundData) {
            res = foundData;
            break;
        }
    }
    return res;
};




// if (initial has deep values)
//      merge with secondary
for(let i = 0; i < initial.length; i++) {
    // each object
    let res = Object.keys(initial[i]).some((init, idx) => {
        if (initial[i][init] !== undefined && initial[i][init] !== '') {
            // data exists, push initial[i]
            return true;
        } else {
            return false;
        }
    });

    if (res) secondary.push(initial[i])
    else continue;
}

let data = secondary ? secondary : [];
data.forEach(d => {
    Object.keys(d).map(key => {
        console.log(`data${key}: ${d[key]}`);
    })
})