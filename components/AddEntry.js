import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import UdacitySlider from './UdacitySlider';
import UdacitySteppers from './UdacitySteppers';
import DateHeader from './DateHeader';

export default class AddEntry extends Component {
    /* you can describe state here directly or use a construct to define this.state? */
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }
    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);
        /* why use this.setState instead of just directly changing state?
            So react knows that you are trying to change state !
        */
        this.setState((state)=>{
            const count = state[metric] + step;

            return {
                /*
                    ...state -> keep all state inside state object
                    [metric]: ... -> BUT change this 'metric' to whatever is the condition
                */
                ...state,
                [metric]: count > max ? max : count,
            }
        })
    }
    decrement = (metric) => {
        this.setState((state)=>{
            const count = state[metric] - getMetricMetaInfo(metric).step;

            return {
                /*
                    ...state -> keep all state inside state object
                    [metric]: ... -> BUT change this 'metric' to whatever is the condition
                */
                ...state,
                [metric]: count < 0 ? 0 : count,
            }
        })
    }
    slide = (metric, value) => {
        this.setState(
            () => ({
                [metric]: value,
            })
        )
    }


    render(){
        const metaInfo = getMetricMetaInfo();

        return (
            <View>
                
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key)=>{
                    const {getIcon, type, ...rest} = metaInfo[key]; // get getIcon, type, and the rest of content
                    const value = this.state[key];
                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider' 
                                ? <UdacitySlider
                                    value = {value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                    />
                                : <UdacitySteppers
                                    value = {value}
                                    onIncrement={(value) => this.increment(key)}
                                    onDecrement={(value) => this.decrement(key)}
                                    {...rest}
                                    />
                            }
                        </View>
                    )
                })}               
            </View>
        )
    }
}