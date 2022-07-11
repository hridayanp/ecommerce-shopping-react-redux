import { FormInputLabel, Group, InputStyles } from './form-input.styles';

export const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <InputStyles {...otherProps} />
            {label && (
                <FormInputLabel
                    shrink={otherProps.value.length}
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};
