import React, { Component } from 'react';
import styled from 'styled-components';

import { Col } from '../Layout';
import { Button } from '../Base';

export class AddMissionForm extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            title: '',
            selectedFile: null,
        };
    }

    onChangeTitleHandler = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    onChangeFileHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        });
    };

    handleSubmitForm = (event) => {
        event.preventDefault();
        const oData = new FormData();
        oData.append('title', this.state.title);
        oData.append('imageFile', this.state.selectedFile, this.state.selectedFile.name);
        this.props.onSubmitHandler(oData);
        event.target.reset();
    };

    handleMouseEnter = () => {
        this.inputRef.current.focus();
    };

    render() {
        const { title, selectedFile } = this.state;
        const { isLoading } = this.props;
        return (
            <form onSubmit={this.handleSubmitForm}>
                <StyledCol>
                    <StyledInput
                        ref={this.inputRef}
                        type='text'
                        name='title'
                        valus={title}
                        onChange={this.onChangeTitleHandler}
                        onMouseEnter={this.handleMouseEnter}
                        placeholder='Type title'
                        required
                    />
                    <StyledInput
                        type='file'
                        name='file'
                        valus={selectedFile}
                        onChange={this.onChangeFileHandler}
                        required
                    />
                    <Button primary type='submit' disabled={isLoading || !title || !selectedFile}>
                        {isLoading ? 'Loading...' : 'Add'}
                    </Button>
                </StyledCol>
            </form>
        );
    }
}

const StyledCol = styled(Col)`
    gap: 30px;
    padding: 30px;
    box-shadow: 1px 1px 5px 2px rgba(245, 245, 245, 1);
    border-radius: 8px;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
    margin: 0;
    border-radius: 3px;
    border: 2px solid ${(props) => props.theme.colors.secondary};

    &:hover,
    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        outline-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.lightGray};
    }
`;
