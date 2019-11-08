import React from 'react'

export const UserContext = React.createContext({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        countryCode: "",
        getCountryCode: (val) => {},
        getValueFromInputs: (e) => {}
    }
);