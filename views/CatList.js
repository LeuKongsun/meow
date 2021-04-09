import React,{useState,useEffect} from 'react';
import { Button, StatusBar,NetInfo } from 'react-native';

export default function CatList() {
    const [cat, setCat] = useState([]);
    const [newList, setNewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [number,setNumber] = useState(0);
    const [button, setButton] = useState(false);
    const [first, setFirst] = useState(true);

    const checkInternetConnection=()=>{
        
    }

    async function list(number){
        await store.dispatch({type: 'DELETE_LIST'});
        await setNumber(number), setCat([]),setNewList([]),setButton(false);
        await checkInternetConnection();
    }

    const btnList=()=>{
        if(button===true){
            return <View>
                <Button onPress={()=>setButton(false)} title='Cancel'/>
                {/* <Button onPress={()=>{let number=30}} */}
            </View>
        }
    }
    

    return (
        <View>
            <StatusBar>
                {button()}
            </StatusBar>
        </View>
    )
}
