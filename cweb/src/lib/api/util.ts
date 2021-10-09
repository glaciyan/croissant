export const toFormikError = (errors: any): any => {
    let out = {};

    Object.entries(errors).map(([key, value]) => {
        out[key.toLowerCase()] = value[0];
    });

    return out;
};
