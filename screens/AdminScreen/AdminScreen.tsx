import React from 'react';
import CommonScrollableLayout from "../../components/Layouts/CommonScrollableLayout";
import instance from "../../shared/axios";
import {getToken} from "../../shared/storage";
import {ActivityIndicator, Text, View} from "react-native";
import CurrentCurrencyIcon from "../../components/CurrentCurrencyIcon";

const AdminScreen = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [list, setList] = React.useState<any>([]);

    React.useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const token = await getToken();
                const response = await instance.get("api/v1/admin/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setList(response.data);
            } catch (e) {

            } finally {
                setIsLoading(false);
            }
        })()
    }, []);


    return (
        <CommonScrollableLayout>
            {
                isLoading ?
                    <View
                        style={{flex:1,alignItems: "center", justifyContent: "center"}}
                    >
                        <ActivityIndicator />
                    </View>
                        :
                    <View style={{flex:1}}>
                        {
                            list?.length ?
                                list.map((item:any) => (
                                    <View style={{height: 100, flexDirection: "row", alignItems: "center",justifyContent: "space-between"}}>
                                        <Text style={{color:"#fff"}}>
                                            {`#${item?.id}`}
                                        </Text>
                                        <Text style={{color:"#fff"}}>
                                            {`${item?.firstName} ${item?.lastName}`}
                                        </Text>
                                        <Text style={{color:"#fff"}}>
                                            {item?.role?.roleName}
                                        </Text>
                                        <Text
                                            style={{color:"#fff"}}
                                        >
                                            {`${item?.balance} `}
                                            <CurrentCurrencyIcon size={12} />
                                        </Text>
                                    </View>
                                ))
                                    :
                                <View
                                    style={{flex:1,alignItems: "center", justifyContent: "center"}}
                                >
                                    <Text style={{color:"#fff", fontFamily: "PressStart2P-Regular",}}>
                                        No Data
                                    </Text>
                                </View>
                        }
                    </View>
            }
        </CommonScrollableLayout>
    );
};

export default AdminScreen;