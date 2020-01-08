import React from 'react';

class Form extends React.Component {
    onChangeValue = (field, value, index = -1, field1 = undefined) => {
        if ((field === 'day' || field === 'month') && this.state.form[field].value.length > 1 && value.length > 2) {
            return;
        }
        if (field === 'year' && this.state.form[field].value.length > 3 && value.length > 4) {
            return;
        }
        let form = this.state.form;

        

        if (index > -1) {
            if (field1 !== undefined)
                form[field][index][field1] = value;
            else
            form[field][index] = value;
        } else if (field === 'day') {
            if (this.state.form[field].value.length > value.length) {
                if (form[field].value !== undefined)
                    form[field].value = value;
                else
                    form[field] = value;
            } else {
                if (this.state.form[field].value.length < 1) {
                    if (parseInt(value, 10) > 3) {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    } else {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    }
                } else {
                    if (parseInt(this.state.form[field].value[0], 10) < 3) {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    } else if (parseInt(this.state.form[field].value[0], 10) === 3 && parseInt(value[1], 10) < 2) {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    }
                }
            }

        } else if (field === 'month') {
            if (this.state.form[field].value.length > value.length) {
                if (form[field].value !== undefined)
                    form[field].value = value;
                else
                    form[field] = value;
            } else {
                if (this.state.form[field].value.length < 1) {
                    if (parseInt(value, 10) > 1) {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    } else {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    }
                } else {
                    if (parseInt(value[1], 10) < 3)
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                }
            }
        } else {
            if (field === 'phone') {
                const phone = this.state.form.phone.value !== undefined ? this.state.form.phone.value : this.state.form.phone;
                if (phone.length > value.length) {
                    if (form[field].value !== undefined)
                        form[field].value = value;
                    else
                        form[field] = value;
                } else {
                    if (parseInt(value[value.length - 1], 10) >= 0 || value[value.length - 1] === '+') {
                        if (form[field].value !== undefined)
                            form[field].value = value;
                        else
                            form[field] = value;
                    }
                }
            } else {
                if (form[field].value !== undefined)
                    form[field].value = value;
                else
                    form[field] = value;
            }
        }
        this.setState({
            form
        });
    }

    checkValidate = (field, isDate = false) => {
        if (field.isTouched) {
            if (isDate) {
                if (field.value == null)
                    return true;
                return false;
            }
            if (field.value.length > 0) {
                return false;
            }
            return true;
        }
        return false;
    }

    onTouched = (field) => {
        let form = this.state.form;
        form[field].isTouched = true;
        this.setState({
            form
        })
    }

    checkSameValue = (compareField, currentField) => {
        if (this.state.form[currentField].value.length > 0) {
            return this.state.form[currentField].value === this.state.form[compareField].value;
        }
        return true;
    }

    validateRequired = () => {
        let conditions = true;
        let form = this.state.form;
        Object.keys(form).forEach(k => {
            if (form[k] && form[k].isTouched !== undefined && form[k].value !== undefined && form[k].value.length < 1) {
                conditions = false;
                form[k].isTouched = true;
            }
        });
        if (!conditions) {
            this.setState({
                form
            });
        }
        return conditions;
    }

    getValue = (exclude = []) => {
        let datas = {};
        Object.keys(this.state.form).forEach(k => {
            if (exclude.indexOf(k) < 0) {
                if (this.state.form[k].value !== undefined) {
                    datas[k] = this.state.form[k].value;
                } else {
                    datas[k] = this.state.form[k];
                }
            }
        });
        return datas;
    }
}

export default Form;
