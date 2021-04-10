import React, { useState, useEffect } from 'react';
import { Button, StatusBar, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

import Names from '../data/catnames.json'
import store from '../store';


export default function CatList({ navigation }) {
    const [cats, setCats] = useState([]);
    const [newList, setNewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [first, setFirst] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);


        NetInfo.fetch().then((state) => {
            if (state.type === "unknown") {
                alert("Couldn't connect to the internet")
            }
        });
        
    }, [])


    const createCatList = () => {
        const maxNum = 16;
        const maxNameNum = 95;

        let pictures = [];
        const temp = [];
        for (let i = 0; i < number; i++) {
            const randomNum = Math.floor(Math.random() * maxNum + 1);
            const randomNameNum = Math.floor(Math.random() * maxNameNum + 1);

            pictures.push(`http://placekitten.com/200/300?image=${randomNum}`);
            newList.push({
                picture: pictures[i],
                name: Names[randomNameNum],
                keyPic: randomNum,
                keyName: randomNameNum
            })
        }

        if (first) {
            setFirst(false);
            AsyncStorage.setItem('catStorage', JSON.stringify(newList));
        }

    }

    const checkInternetConnection = () => {
        NetInfo.fetch().then((state) => {
            if (state.type === "unknown") {
                AsyncStorage.getItem('catStorage').then((value) => {
                    console.log("VALUE::",value)
                    setCats(value);
                })
            } else {
                finishList().catch();
            }

        });
    }

    async function finishList() {
        await store.dispatch({ type: 'NEW_CAT_LIST', data: newList });
        await createCatList();
        console.log("New list:::", newList.length)
        await setCats(newList);
    }


    async function list(number) {
        await store.dispatch({ type: 'DELETE_LIST' });
        await setNumber(number), setCats([]), setNewList([])
        await checkInternetConnection();
    }
    console.log("Cat:::", cats.length)

    const buttonList = () => {
        return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        list(30).catch()
                    }}
                    title='30'
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        // let number = 50;
                        list(50).catch()
                    }}
                    title='50'
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        // let number = 100;
                        list(100).catch()
                    }}
                    title='100'
                />
            </View>
        </View>
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    const renderItems = ({ item }) => {
        return <TouchableOpacity style={{ margin: 5 }} onPress={() => navigation.navigate('CatView', { pic: item.keyPic, name: item.keyName })}>
            <Image style={styles.image} source={{ uri: `${item.picture}` }} />
            <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
        </TouchableOpacity>
    }


    return (
        <View>
            {buttonList()}
            <FlatList
                data={cats}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        height: 300,
        width: Dimensions.get('window').width - 10,
        borderRadius: 10
    },
    list: { color: "#000080", textAlign: 'center', padding: 15, fontSize: 20 },
    view: { borderWidth: 10, borderRadius: 15, borderColor: "#00BFFF", margin: 10 },
    button: { flex: 1, margin: 5 }

})