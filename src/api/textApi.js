import Axios from 'axios';

class TextApi {
  getText = () => {
    const url = 'https://hipsum.co/api/?type=vocabulary&sentences=3';
    return Axios.get(url);
  };
}
const textApi = new TextApi();
export default textApi;
