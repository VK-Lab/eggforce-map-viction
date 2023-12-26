import { makeUseAxios } from 'axios-hooks';
import axios from 'axios';
import { rootAPI } from '@/constants/api';

const customAxios = axios.create({ baseURL: rootAPI });
const fetcher = (url: string) => {
  return customAxios.get(url).then((res) => res.data);
};
const fetcherWithArray = ([url, query]: [string, string]) => {
  return customAxios.get(`${url}?${query}`).then((res) => res.data);
};
const useAxios = makeUseAxios({
  axios: customAxios,
});

const controller = new AbortController();
const signal = controller.signal;

/**
 * 
 * POST
 *  
  
  const [, post] = useAxios({
    url: "/mintWhitelistNFT",
    method: "POST"
  }, {
    manual: true
  }) 

  const result = await post({
    data: {
      signedMessage: signedMessage,
      publicKey: user.activeKey
    }
  })
 */

export { signal, fetcherWithArray, fetcher, controller, customAxios as axios };

export default useAxios;
