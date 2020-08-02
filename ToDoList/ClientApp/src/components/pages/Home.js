import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Api from '../../api';
import CardList from '../CardList';
import { AddMissionForm } from '../Forms';
import { Col, Row } from '../Layout';
import { Spinner, Button } from '../Base';

export class Home extends Component {
    static displayName = Home.name;
    constructor() {
        super();
        this.state = {
            missions: [],
            isAllData: false,
            isLoadingGet: false,
            isLoadingCreate: false,
            error: null,
        };
    }

    componentDidMount() {
        this.handleClickLoad();
    }

    handleSubmitForm = async (oData) => {
        const { missions } = this.state;
        this.setState({ isLoadingCreate: true, error: null });
        Api.createMission(oData)
            .then((result) => {
                missions.push(result);
                this.setState({ missions: missions, isLoadingCreate: false });
            })
            .catch((err) => {
                this.setState({ isLoadingCreate: false, error: err.message });
            });
    };

    handleClickLoadAll = async () => {
        this.setState({ isLoadingGet: true, error: null });
        Api.getPublicMissions()
            .then((results) => {
                this.setState({
                    missions: results.data,
                    isLoadingGet: false,
                    isAllData: true,
                });
            })
            .catch((err) => {
                this.setState({ isLoadingGet: false, error: err.message });
            });
    };

    handleClickLoad = async () => {
        this.setState({ isLoadingGet: true, error: null });
        Api.getMissions()
            .then((results) => {
                this.setState({
                    missions: results.data,
                    isLoadingGet: false,
                    isAllData: false,
                });
            })
            .catch((err) => {
                this.setState({ isLoadingGet: false, error: err.message });
            });
    };

    render() {
        const { missions, isLoadingGet, isLoadingCreate, isAllData, error } = this.state;
        let mainContent;
        if (missions.length === 0 && !isLoadingGet) {
            mainContent = <h2>No missions yet, You can add new missions by form on left</h2>;
        } else if (isLoadingGet) {
            mainContent = (
                <React.Fragment>
                    <Spinner /> Loading...
                </React.Fragment>
            );
        } else {
            mainContent = <CardList isLoadingCreate={isLoadingCreate} missions={missions}></CardList>;
        }
        return (
            <React.Fragment>
                <StyledHeader>
                    <Row alignItems='center' justifyContent='center'>
                        <Col>
                            <StyledH1>
                                <StyledImgLogo src='/images/todolist-logo.png' alt='logo to-do-list' />
                            </StyledH1>
                        </Col>
                    </Row>
                </StyledHeader>
                <StyledMain>
                    <Row collapse='xs'>
                        <StyledCol sideBar size={1} gap='30px' collapse='lg' alignItems='center'>
                            <StyledSubTitle>Add Mission</StyledSubTitle>
                            <StyledRow justifyContent='center' gap='30px'>
                                <AddMissionForm
                                    isLoading={isLoadingCreate}
                                    onSubmitHandler={this.handleSubmitForm}
                                ></AddMissionForm>
                            </StyledRow>
                            {error && (
                                <StyledRow justifyContent='center' gap='30px'>
                                    <StyledP>Error: {error}</StyledP>
                                </StyledRow>
                            )}
                        </StyledCol>
                        <StyledCol main size={3} gap='30px' justifyContent='space-between'>
                            <StyledRow justifyContent='space-between' alignItems='center'>
                                <StyledSubTitle>{isAllData ? 'Public' : 'Your'} missions</StyledSubTitle>
                                <Row justifyContent='center' collapse='xs' gap='30px'>
                                    <Button primary onClick={this.handleClickLoad}>
                                        Load my missions
                                    </Button>
                                    <Button secondary onClick={this.handleClickLoadAll}>
                                        Load all missions
                                    </Button>
                                </Row>
                            </StyledRow>
                            <StyledMainLoadingDiv>{mainContent}</StyledMainLoadingDiv>
                        </StyledCol>
                    </Row>
                </StyledMain>
            </React.Fragment>
        );
    }
}

// styled components
const StyledCol = styled(Col)`
    margin: 0 15px;
    padding: 0 15px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(245, 245, 245, 1);
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    border-radius: 0;
    background-color: white;

    @media only screen and (max-width: 600px) {
        margin-bottom: 20px;
    }

    ${(props) =>
        props.sideBar &&
        css`
            border-top: 5px solid ${props.theme.colors.secondary};
        `}

    ${(props) =>
        props.main &&
        css`
            border-left: 5px solid ${props.theme.colors.primary};
        `}
`;

const StyledSubTitle = styled.h2`
    margin: 20px auto;
`;

const StyledMainLoadingDiv = styled.div`
    align-self: center;
    margin: auto;
`;

const StyledRow = styled(Row)`
    @media only screen and (max-width: 600px) {
        display: block;
    }
`;

const StyledImgLogo = styled.img`
    margin: 15px 0;
`;

const StyledP = styled.p`
    color: ${(props) => props.theme.colors.danger};
`;

const StyledH1 = styled.h1`
    margin: 0;
`;

const headerGap = '100px';
const StyledHeader = styled.header`
    padding-bottom: ${headerGap};
    background-color: ${(props) => props.theme.colors.backgruondColorHeader};
    position: sticky;
    top: 0;
    z-index: auto;
`;

const StyledMain = styled.main`
    position: relative;
    max-width: 1520px;
    padding-bottom: 40px;
    margin: -${headerGap} auto 0;
    z-index: 1;
`;
