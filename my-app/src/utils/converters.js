export const productToFormData = (data) => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
        if (key === 'NewImages' || key === 'NewTags') {
            for (let image of value) {
                formData.append(key, image);
            }
        } else {
            formData.set(key, value);
        }
    }

    return formData;
};
