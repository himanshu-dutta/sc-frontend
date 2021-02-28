const today = new Date();

function dateDifference(date1, date2) {
    const date1utc = Date.UTC(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
    );
    const date2utc = Date.UTC(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
    );
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day / 365;
}

export const parseRegistration = (registrationDetails) => {
    if (registrationDetails.password !== registrationDetails.confirmPassword)
        throw new Error("Password doesn't match");

    if (dateDifference(new Date(registrationDetails.dob), today) < 18)
        throw new Error("Age can't be less than 18 years.");

    const details = {
        username: registrationDetails.username,
        email: registrationDetails.email,
        password: registrationDetails.password,
        user_account: {
            first_name: registrationDetails.firstName,
            date_of_birth: registrationDetails.dob,
            phone: registrationDetails.phone,
            ...(registrationDetails.lastName && {
                last_name: registrationDetails.lastName,
            }),
        },
    };

    return details;
};
