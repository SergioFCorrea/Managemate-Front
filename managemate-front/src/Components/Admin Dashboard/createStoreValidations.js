 const createStoreValidations = (formData) => {
    const errors = {}

    if(formData.name.length === 0){
        errors.name = "Please enter a name for your store"
    }

    if(!formData.description.length === 0){
        errors.description = "Please set a description for your store"
    }

    if(!formData.description.length > 150){
        errors.description = `${formData.description.length}/150 characters`
    }

    if(!formData.image){
        errors.image = "Please upload an image for your store"
    }

    if(formData.saleChannels?.length < 1){
        errors.saleChannels = "Please select al least one sale channel"
    }

    if(formData.size !== "Select size"){
        errors.size = "Please choose a size for your store"
    }

    return errors
}

export default createStoreValidations