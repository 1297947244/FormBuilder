import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField, IFieldBuilderProps, IFieldInputProps, IFieldInputInjector, createFieldBuilderWrapper } from 'react-dynamic-formbuilder';

interface IState {
}

export class SingleLineTextField extends React.PureComponent<IFieldInputProps & IFieldBuilderProps, IState> implements IFieldInputInjector {
    public static defaultProps = {
        value: ''
    } as IFieldInputProps & IFieldBuilderProps

    constructor(props: IFieldInputProps & IFieldBuilderProps) {
        super(props);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    public componentDidMount() {
        const error = this.validate(this.props.value);
        if (this.props.onValueChange) {
            this.props.onValueChange(this.props.field, this.props.value, { error });
        }
    }

    public render() {
        const { label } = this.props.field;
        const { hint, required } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <FormGroup className='clearfix'>
                    <Col componentClass={ControlLabel} md={5}>{label}</Col>
                    <Col md={7}>
                        <FormControl type='text' placeholder={hint} required={required} value={this.props.value} onChange={this.onTextFieldChange} />
                    </Col>
                </FormGroup>
            </div>
        );
    }

    public onValuesChanged(value: { [id: string]: any }): any {
        console.log("SingleLineTextField onValuesChange", value);
        return null;
    }

    private onTextFieldChange(event: any) {
        const value = event.target.value;
        const error = this.validate(value);
        this.props.onValueChange(this.props.field, value, { error });
    }

    private validate(value: string): string {
        if (this.props.field.options && this.props.field.options.required) {
            if (value.trim() === '') {
                return 'required';
            }
        }

        return null;
    }
}

export const SingleLineTextBuilder = createFieldBuilderWrapper()(SingleLineTextField);