import * as React from "react";

interface NumericalParameterControlProps {
    labelText: string;
    initialValue: number;
    minValue: number;
    maxValue: number;
    stepValue: number;
    disabled: boolean;
    changeListener: (nextValue: number) => void
}
interface NumericalParameterControlState {
    value: number;
}
class NumericalParameterControl extends React.Component<NumericalParameterControlProps, NumericalParameterControlState> {
    
    constructor(props: NumericalParameterControlProps) {
        super(props);
        this.state = {
            value: props.initialValue
        };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    componentDidUpdate(_: NumericalParameterControlProps, prevState: NumericalParameterControlState) {
        if (prevState.value !== this.state.value) {
            this.props.changeListener.apply(this.state.value);
        }
    }

    handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        const nextValue = parseFloat(event.target.value);
        this.setState({
            value: nextValue
        });
    }

    render() {

        const numberInput = React.createElement("input", {
            type: "number",
            min: this.props.minValue,
            max: this.props.maxValue,
            step: this.props.stepValue,
            disabled: this.props.disabled,
            value: this.state.value,
            onChange: this.handleValueChange
        });

        const rangeInput = React.createElement("input", {
            type: "range",
            min: this.props.minValue,
            max: this.props.maxValue,
            step: this.props.stepValue,
            disabled: this.props.disabled,
            value: this.state.value,
            onChange: this.handleValueChange
        });

        const label = React.createElement("label", null, this.props.labelText, numberInput, rangeInput);

        return React.createElement("form", { className: "NumericalParameterControl" }, label);
    }
}