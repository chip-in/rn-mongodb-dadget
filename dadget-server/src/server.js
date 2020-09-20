import { ResourceNode } from '@chip-in/resource-node';
import Dadget from '@chip-in/dadget';

if(!process.env.CORE_SERVER){
  console.error("CORE_SERVER required");
  process.exit();
}
if(!process.env.RN_NAME){
  console.error("RN_NAME required");
  process.exit();
}

let rnode = new ResourceNode(process.env.CORE_SERVER, process.env.RN_NAME);
Dadget.getLogger().setLogLevel('info');
Dadget.registerServiceClasses(rnode);

let jwtToken = process.env.ACCESS_TOKEN;
let jwtRefreshPath = process.env.TOKEN_UPDATE_PATH;
if (jwtToken) {
  rnode.setJWTAuthorization(jwtToken, jwtRefreshPath);
}

rnode.start().then(() => {
  function sigHandle() {
    rnode.stop().then(()=>{
      process.exit()
    })
  }
  process.on('SIGINT', sigHandle);
  process.on('SIGTERM', sigHandle);
})
