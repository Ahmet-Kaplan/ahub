import React from 'react';
import {
    Box, 
    Button, 
    Heading, 
    Paragraph,
    Text,
    TextArea,
} from 'grommet';
import {get} from '../modules/fetch';

const API_ENDPOINT = 'http://ahub.westeurope.cloudapp.azure.com:8000/';
//const API_ENDPOINT = 'http://127.0.0.1:8000/';

export default class NodeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: "INIT",
            endpoints: [],
        };

        this.getEndpoints = this.getEndpoints.bind(this);
        this.getEndpointResponse = this.getEndpointResponse.bind(this);
    }

    componentDidMount () {
        this.getEndpoints();
    }

    getEndpoints() {
        /* get(`${API_ENDPOINT}${this.props.name}/endpoints`).then(endpoints => this.setState({
            endpoints,
        })).catch(err => console.warn(err)); */
        this.setState({
            endpoints: [
                {
                    name: 'batch',
                    response: {},
                }
            ]
        });
    }

    getEndpointResponse(endpointName) {
        get(`${API_ENDPOINT}${this.props.name}/${endpointName}`)
        //  get(`${API_ENDPOINT}${endpointName}`)
            .then(response => {
                const newEndpointState = [
                    ...this.state.endpoints,
                    {
                        name: endpointName,
                        response,
                    }
                ];

                this.setState({
                    endpoints: newEndpointState,
                });
            })
            .catch(err => console.warn(err));
    }

    render(){
        return(
            <Box        
                margin={{
                    horizontal: 'medium'
                }}
                pad='medium'
            >
                <Heading level='2'>
                    Overview for: <Text color='accent-1' size='xxlarge'>{this.props.name}</Text>
                </Heading>
                {
                    this.state.endpoints
                    ? this.state.endpoints.map(endpoint => (
                        <EndpointBox
                            key={`${this.props.name}-endpoint-${endpoint.name}`}
                            name={endpoint.name}
                            response={endpoint.response}
                            getEndpointResponse={this.getEndpointResponse}
                        />
                    ))
                    : <Paragraph>Loading endpoint functions...</Paragraph>
                }
            </Box>
        )
    }
}

const EndpointBox = props => {
    return (
        <Box
            basis='200px'
            border='all'
            margin={{
                vertical: 'medium'
            }}
            pad='medium'            
            background='neutral-1'
            fill={false}
        >
            <Button
                className="endpointbutton"
                onClick={() => props.getEndpointResponse(props.name)} 
                label={props.name.toUpperCase()}
            />
            <TextArea
                readOnly
                plain={true}
                value={JSON.stringify(props.response)}
            />
        </Box>
    )
};
