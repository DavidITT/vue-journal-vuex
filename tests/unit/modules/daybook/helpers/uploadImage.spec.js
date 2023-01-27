import axios from "axios";
import 'setimmediate'
import cloudinary from 'cloudinary';
import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
    cloud_name: 'dhrbaevpa',
    api_key: '821416517533468',
    api_secret: 'NwUw1LWuQTfT_SWWoWN-FrOvGyM'
})


describe('Pruebas en el uplaod image', () => {

    test('Debe de cargar un archivo y retornal la url',async() => {
        const {data} = await axios.get('https://res.cloudinary.com/dhrbaevpa/image/upload/v1671645801/samples/ecommerce/leather-bag-gray.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.png')

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        // Tomar el id
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg','')
        await cloudinary.v2.api.delete_resources(imageId, {}, () => {

        })
    })
})