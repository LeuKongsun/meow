import React, { useState, useEffect } from 'react';
import {
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    View,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import Names from '../data/catnames.json';
import store from '../store';

export default function CatList({ navigation }) {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [first, setFirst] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        NetInfo.fetch().then(state => {
            if (state.type === 'unknown') {
                alert("Couldn't connect to the internet");
            }
        });
        setNumber(30)
    }, []);

    useEffect(() => {
        if (number > 0) {
            list();
        }
    }, [number]);

    const createCatList = () => {
        const maxNum = 16;
        const maxNameNum = 95;
        let pictures = [];
        const temp = [];
        for (let i = 0; i < number; i++) {
            const randomNum = Math.floor(Math.random() * maxNum + 1);
            const randomNameNum = Math.floor(Math.random() * maxNameNum + 1);
            pictures.push(`https://placekitten.com/200/300?image=${randomNum}`);
            temp.push({
                picture: pictures[i],
                name: Names[randomNameNum],
                keyPic: randomNum,
                keyName: randomNameNum,
            });
        }
        setCats(temp);
        if (first) {
            setFirst(false);
            AsyncStorage.setItem('catStorage', JSON.stringify(temp));
        }
    };

    const checkInternetConnection = () => {
        NetInfo.fetch().then(state => {
            if (state.type === 'unknown') {
                AsyncStorage.getItem('catStorage').then(value => {
                    setCats(value);
                });
            } else finishList()
        });
    };

    function finishList() {
        store.dispatch({ type: 'NEW_CAT_LIST', data: cats });
        createCatList();
    }

    function list() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
        store.dispatch({ type: 'DELETE_LIST' });
        setCats([]);
        checkInternetConnection();
    }

    const buttonList = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            setNumber(30);
                        }}
                        title="30"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            setNumber(50);
                        }}
                        title="50"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            setNumber(100);
                        }}
                        title="100"
                    />
                </View>
            </View>
        );
    };

    if (loading) {
        return <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    }

    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() =>
                    navigation.navigate('CatView', { pic: item.keyPic, name: item.keyName })
                }>
                <Image style={styles.image} source={{ uri: `${item.picture}` }} />
                <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            {buttonList()}
            <FlatList
                data={cats}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        height: 300,
        width: Dimensions.get('window').width - 10,
        borderRadius: 10,
    },
    list: {
        color: '#000080',
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    },
    view: {
        borderWidth: 10,
        borderRadius: 15,
        borderColor: '#00BFFF',
        margin: 10
    },
    button: {
        flex: 1,
        margin: 5
    },
    indicator: {
        flex: 1,
        justifyContent: 'center'
    }
});