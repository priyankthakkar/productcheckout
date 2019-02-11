import axios from 'axios';

const fetchProducts = async () => {
    const response = await axios
        .get('https://my-json-server.typicode.com/priyankthakkar/productcheckout/products');
    const data = await response.data;

    if(response.status >= 400) {
        throw new Error(data.error);
    }

    return data;
};

export { fetchProducts };