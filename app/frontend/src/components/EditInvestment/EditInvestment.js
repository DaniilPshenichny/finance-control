import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    InputGroup,
    Button,
} from 'reactstrap'; 
import UserService from '../UserService';

class EditInvestment extends Component {

    constructor() {
        super();
        this.UserService = new UserService();
    }

    state = {
        investmentName: '',
        investedAmount: '',
        investmentDescription: '',
        investmentLink: '',
        investmentId: ''
    }

    componentDidMount() {
        const { match } = this.props;
        const investmentId = match.params.id;
        this.getInvestment(investmentId);
    }

    getInvestment = async (investmentId) => {
        const value = await this.UserService.getInvestment(investmentId);
        this.setState({
            investmentName: value.investment[0].investmentName,
            investedAmount: value.investment[0].investedAmount,
            investmentDescription: value.investment[0].investmentDescription,
            investmentLink: value.investment[0].investmentLink,
            investmentId: value.investment[0]._id,
        });
    }

    updateInvestment = async () => {
        const { investmentId, investmentName, investedAmount, investmentLink, investmentDescription } = this.state;
        await this.UserService.updateInvestment(investmentId, investmentName, investedAmount, investmentLink, investmentDescription);
        const { history } = this.props;
        history.goBack();
    }

    handleChangeName = (event) => {
        this.setState({ investmentName: event.target.value });
    }

    handleChangeAmount = (event) => {
        this.setState({ investedAmount: event.target.value });
    }

    handleChangeLink = (event) => {
        this.setState({ investmentLink: event.target.value });
    }

    handleChangeDescription = (event) => {
        this.setState({ investmentDescription: event.target.value });
    }

    render() {
        return (
            <div>
                
                <Row>
                    <Col
                        xs={{ size: 8, offset: 2 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 2, offset: 5 }}
                        xl={{ size: 2, offset: 5 }}
                    >
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Investment name" value={this.state.investmentName} onChange={this.handleChangeName} />
                            </InputGroup> 
                        </FormGroup>
                    </Col>
                    <Col
                        xs={{ size: 8, offset: 2 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 2, offset: 5 }}
                        xl={{ size: 2, offset: 5 }}
                    >
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Invested amount" value={this.state.investedAmount} onChange={this.handleChangeAmount} />
                            </InputGroup> 
                        </FormGroup>
                    </Col>
                    <Col
                        xs={{ size: 8, offset: 2 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 2, offset: 5 }}
                        xl={{ size: 2, offset: 5 }}
                    >
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Link" value={this.state.investmentLink} onChange={this.handleChangeLink} />
                            </InputGroup> 
                        </FormGroup>
                    </Col>
                    <Col
                        xs={{ size: 8, offset: 2 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 2, offset: 5 }}
                        xl={{ size: 2, offset: 5 }}
                    >
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Description" value={this.state.investmentDescription} onChange={this.handleChangeDescription} />
                            </InputGroup> 
                        </FormGroup>
                    </Col>
                    <Col
                        xs={{ size: 8, offset: 2 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 2, offset: 5 }}
                        xl={{ size: 2, offset: 5 }}
                    >
                        <Button color="secondary" onClick={this.updateInvestment} block>Save</Button>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default withRouter(EditInvestment);
