import { Storage } from '@capacitor/storage';

async function SetObjects(Objkey, data) {
    await Storage.set({
        key: Objkey,
        value: JSON.stringify(data)
    });
    console.log(data)

}

async function GetObject(Objkey) {
    const ret = await Storage.get({ key: Objkey });
    const data = JSON.parse(ret.value);
    console.log(data)
    return data;
}
const func = {
    SetValue: SetObjects,
    GetValue: GetObject
}



export default func