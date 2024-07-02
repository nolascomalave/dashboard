/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const networkInterfaces=os.networkInterfaces();

let ip='127.0.0.1', newIp=ip;

for(let i in networkInterfaces){
  for(let eth of networkInterfaces[i]){
    if(/^(\d{1,3}(\.)?){4}$/.test(eth.address) && eth.address!==ip){
      newIp=eth.address;
      break;
    }
  }
  if(newIp!==ip){
    ip=newIp;
    break;
  }
}

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        API:'http://'+ip+':3000'
    }
};

export default nextConfig;
