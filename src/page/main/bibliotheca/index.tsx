import React,{useContext, useState,
    useLayoutEffect,
    useImperativeHandle,
    useCallback,
    forwardRef,
    useEffect,
    useRef, } from 'react';
import { View, Text, ScrollView,
    SafeAreaView, FlatList, Image,
    ToastAndroid,
    StatusBarIOS,
    TextInput,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity,
    GestureResponderEvent,
    TouchableWithoutFeedback,
    ImageBackground,
    useWindowDimensions,
} from 'react-native';
import { useRoute ,useNavigation,RouteProp, } from '@react-navigation/native';
import useSWR from 'swr';

import ShuYuanSdk,{
    DirectoryListType,
    ArticleType,
    AllShuYuanIdsKey,
    SearchListType,
    SearchConditionType,
    BibliothecaFictionListType,
} from '@/common/shuYuanSdk';
import Icon from '@/components/icon';
import LazyLoading from '@/components/lazyLoading';
import LabelList from '@/components/labelList';

import styles from './css';

type TypeLabel = {
    label: string,
    name: string,
};
function Index(props:any) {
    let source: AllShuYuanIdsKey = props.route.name;
    const navigation = useNavigation();
    const [actionType, setActionType] = useState<string>('');
    const [dataListError, setDataListError] = useState(false);
    const [dataListLoad, setDataListLoad] = useState(false);
    const [dataList, setDataList] = useState<BibliothecaFictionListType>([]);

    const { data, error, } = useSWR(ShuYuanSdk.getBibliothecaListUrl(source), async() => {
        return ShuYuanSdk.getBibliothecaLabelList(source as AllShuYuanIdsKey);
    });
    useEffect(() => {
        if (data && data.length) {
            setActionType(data[0].name);
            getFictionList(data[0].name); 
        }
    }, [data]);
    const clickAction = function(data: TypeLabel) {
        setActionType(data.name);
        getFictionList(data.name); 
    };
    const getFictionList = async function(urlHref: string | null) {
        let url = urlHref || actionType;
        setDataListError(false);
        setDataListLoad(true);
        try {
            const data = await ShuYuanSdk.getBibliothecaFictionList({
                source,
                url,
            });
            setDataList(data);
            setDataListLoad(false);
        } catch(e) {
            setDataListError(true);
            setDataListLoad(false);
        }
   
    };
    const goToPage = function(item: any) {
        navigation.navigate('Other', { 
            screen: 'BookDirectory', 
            params: {
                id: item.id,
                source: item.source,
                title: item.title,
            },
        });
    };

    return (<View style={styles.IndexWrap}>
        <LabelList
            list={data || []}
            clickAction={clickAction}
            actionType={actionType}
        />
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.fictionScroll}>
                <LazyLoading error={dataListError} 
                    loading={dataListLoad}
                    dataLeng={dataList.length}
                    reloadCall={getFictionList}
                    parentScreen={Index.parentScreen}>
                        <View>
                        {dataList.map((item:BibliothecaFictionListType[0], index:number) => {
                            return <TouchableOpacity 
                                    key={index} style={styles.fictionList}
                                    onPress={() => goToPage(item)} >
                                    <ImageBackground  
                                        source={{uri: item.logo}}
                                        resizeMode='cover'
                                        style={styles.bananaCameraImg}/>
                                    <View style={styles.fictionListInfo}>
                                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.content} numberOfLines={2}>{item.introduce}</Text>
                                        <View style={styles.label}>
                                            <View style={styles.user}>
                                                <Icon fontFileName='AntDesign'
                                                    color='#969ba3'
                                                    size={13}
                                                    style={styles.userIcon}
                                                    name='user'/>
                                                <Text style={styles.author}>{item.author}</Text>
                                            </View>
                    
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        })}
                        </View>
                        
                </LazyLoading>
            </ScrollView>
        </SafeAreaView>
    </View>)
}
Index.parentScreen = 'bibliotheca';

export default Index;