import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../store/actions/posts'
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback as TWF,
    Alert,
}from 'react-native';
import Icon from 'react-native-vector-icons/';

